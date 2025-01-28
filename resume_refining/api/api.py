import os
import re
import shutil
import spacy 
import docx2txt
import PyPDF2
import frappe
from frappe.utils.response import jsonify
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

nlp = spacy.load("en_core_web_sm")
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

TEMP_DIR = '/tmp/temp'
TEMP_RESUME_DIR = '/tmp/temp_resume'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}

@frappe.whitelist(allow_guest=True)
def process_resumes(jd_file=None, jd_text=None, resumes_files=None):
    """
    Frappe version of the process_resumes API
    """
    os.makedirs(TEMP_DIR, exist_ok=True)
    os.makedirs(TEMP_RESUME_DIR, exist_ok=True)

    if not jd_text and not jd_file:
        return jsonify({'Error': '"Job description text or file is required"'}), 400
    if jd_text and jd_file:
        return jsonify({'Error': "Cannot send both Job Description text and file. Choose only one."}), 400
    if not resumes_files:
        return jsonify({'Error': '"Resume files are required"'}), 400

    try:
        jd_parsed = parse_jd(jd_text=jd_text) if jd_text else parse_jd(jd_file=jd_file)
    except Exception as e:
        return jsonify({'Error': f"Failed to parse job description: {str(e)}"}), 500

    resume_scores = []
    for resume_file in resumes_files:
        if not allowed_file(resume_file.filename):
            continue

        resume_path = os.path.join(TEMP_RESUME_DIR, resume_file.filename)
        resume_file.save(resume_path)

        try:
            resume_parsed = parse_resume(resume_path)
            score = score_resume(jd_parsed, resume_parsed)
            percentage_score = score * 100
            experience_years = resume_parsed.get('total_experience', 0)

            resume_scores.append({
                'Resume_Name': resume_file.filename,
                'Score': f"{percentage_score:.2f}%",
                'experience_years': experience_years,
                'resume_skills': resume_parsed.get('resume_skills', [])
            })
        except Exception as e:
            continue

    experience_range = jd_parsed.get('experience', [])
    if experience_range:
        min_experience = min(exp[0] for exp in experience_range)
        max_experience = max(exp[1] for exp in experience_range)
    else:
        return jsonify({'Error': 'Experience range not found in job description'}), 400

    filtered_resumes = filter_resumes_by_experience(resume_scores, min_experience, max_experience, jd_parsed['jd_required_skills'])

    matched_resumes = {
        "PerfectMatched": [],
        "TopMatched": [],
        "GoodMatched": []
    }

    for resume in filtered_resumes:
        score = float(resume['Score'].strip('%'))
        if score >= 80:
            matched_resumes["PerfectMatched"].append(resume)
        elif 70 <= score < 80:
            matched_resumes["TopMatched"].append(resume)
        elif 60 <= score < 70:
            matched_resumes["GoodMatched"].append(resume)

    try:
        shutil.rmtree(TEMP_DIR, ignore_errors=True)
        shutil.rmtree(TEMP_RESUME_DIR, ignore_errors=True)
    except Exception as e:
        return jsonify({'Error': f"Failed to clear temporary files: {str(e)}"}), 500

    jd_required_skills = jd_parsed['jd_required_skills']
    return jsonify({
        'Matched_Resumes': matched_resumes,
        'jd_required_skills': jd_required_skills
    })

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_experience(text):
    experience_patterns = [
        r'(?i)(?:Work Experience|Professional Experience|Experience|Experience range|Min Experience|Max Experience)\s*[:\-]?\s*(\d+(\.\d+)?)\s*(?:to|-|–)\s*(\d+(\.\d+)?)\s*(?:years|Years)|\b(\d+(\.\d+)?)\+\s*(?:years|Years)|\b(\d+(\.\d+)?)\s*(?:\+)?\s*(?:years|Years)|\b(\d+(\.\d+)?)\s*-\s*(\d+(\.\d+)?)\s*(?:yrs|Years)'
    ]

    extracted_experience = []
    for pattern in experience_patterns:
        matches = re.findall(pattern, text)
        for match in matches:
            if match[0] and match[2]:
                start = float(match[0])
                end = float(match[2])
                extracted_experience.append((start, end))
            elif match[4]:
                extracted_experience.append((float(match[4]), float(match[4]) + 5))
            elif match[6]:
                extracted_experience.append((float(match[6]), float(match[6]) + 5))
            elif match[8] and match[10]:
                start = float(match[8])
                end = float(match[10])
                extracted_experience.append((start, end))

    return extracted_experience

def extract_text_from_pdf(file_path):
    text = ""
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
    return text

def extract_text_from_docx(file_path):
    return docx2txt.process(file_path)

def extract_skills(skills_text):
    skills_text = re.sub(r'[•\-–]', '', skills_text)
    skills_text = re.sub(r'\s+', ' ', skills_text)

    doc = nlp(skills_text)
    excluded_tokens = ['NOUN', 'ADJ', 'PRON', 'CONJ', 'SCONJ', 'ADP', 'AUX', 'VERB', 'DET', 'CCONJ']
    excluded_symbols = ['etc','to','to', '(', ')', '-', '_', '.', '/', ',', 'e.g.', '\n', ':', '’s',
                        'to', 'hands','indepth','+', '2', 'complete','master', 'bachelor’s/', 'bachelor', 
                        'engineering/',' ','3','', 'independently', 'ip', 'identity', 'closely', 'http', 
                        'framework', 'one', 'highly', 'pipeline', 'serverless', 'strong', 'compute', 'code', 
                        'experience', 'web', 'storage', 'also', 'lambda', 'access', 'simple', 
                        'quickly', 'especially', 'certification', 'elastic', 'developer', 'information', 
                        'infrastructure', 'iam', 'service', 'effectively','management', 'dependency', 'entity', 
                        '10', 'core', 'parallel', 'async', 'basics', 'security', 'patterns', 'json','good',
                        '!','~','`','@','$','%','^','*',]

    excluded_symbols.extend(str(num) for num in range(1, 100001))
    
    skills = [token.text.lower() for token in doc if token.pos_ not in excluded_tokens and token.text.lower() not in excluded_symbols]
    return list(set(skills))

def parse_jd(jd_file=None, jd_text=None):
    if jd_text:
        text = jd_text
    elif jd_file:
        if jd_file.endswith('.pdf'):
            text = extract_text_from_pdf(jd_file)
        elif jd_file.endswith('.doc'):
            text = extract_text_from_pdf(jd_file)
        elif jd_file.endswith('.docx'):
            text = extract_text_from_docx(jd_file)
        else:
            with open(jd_file, 'r') as f:
                text = f.read()
    else:
        return {'error': 'No input provided'}

    doc = nlp(text)
    experience = extract_experience(text)
    print("Extracted Experience:", experience)

    required_skills = re.search(r"(Requisite Skills:|Required Skills:|Must Have:)([\s\S]*?)(?=Preferred Skills|Education|Soft Skills|Roles and Responsibilities|$)", text, re.IGNORECASE)
    required_skills_text = required_skills.group(2).strip() if required_skills else ''
    
    jd_required_skills = extract_skills(required_skills_text)
    print("Parsed Job Description Skills:", jd_required_skills)

    return {
        'raw_text': text,
        'experience': experience if experience else [(0, 0)],
        "jd_required_skills": jd_required_skills
    }

def extract_experience_from_resume(text):
    experience_years = []
    
    experience_patterns = [
        r'(\d+(?:\.\d+)?\+?)\s*(?:years?|yr|yrs|years of experience|years\' experience)', 
    ]

    for pattern in experience_patterns:
        matches = re.findall(pattern, text, flags=re.IGNORECASE)
        for match in matches:
            years = match.strip('+')
            if years.isdigit() or years.replace('.', '', 1).isdigit():
                experience_years.append(float(years))

    return max(experience_years) if experience_years else 0

def parse_resume(file_path):
    if file_path.endswith('.pdf'):
        text = extract_text_from_pdf(file_path)
    elif file_path.endswith('.doc') or file_path.endswith('.docx'):
        text = extract_text_from_docx(file_path)
    else:
        with open(file_path, 'r') as f:
            text = f.read()

    total_experience = extract_experience_from_resume(text)
    resume_skills = extract_skills(text)
    print("Parsed Resume Skills:", resume_skills)

    return {
        'raw_text': text,
        'total_experience': total_experience,
        'resume_skills': resume_skills
    }

def score_resume(jd_parsed, resume_parsed):
    jd_embedding = model.encode(jd_parsed['raw_text'])
    resume_embedding = model.encode(resume_parsed['raw_text'])
    similarity_score = cosine_similarity([jd_embedding], [resume_embedding])[0][0]
    return similarity_score

def filter_resumes_by_experience(resume_scores, min_exp, max_exp, jd_required_skills):
    filtered_resumes = []
    for resume in resume_scores:
        exp_years = resume['experience_years']
        if min_exp <= exp_years <= max_exp:
            matched_skills = set(jd_required_skills).intersection(set(map(str.lower, resume['resume_skills'])))
            matched_count = len(matched_skills)
            total_jd_skills = len(jd_required_skills)  
            list_matched_skills = list(matched_skills)
            
            print(f"Resume: {resume['Resume_Name']}, Matched Skills: {list_matched_skills}, Matched Count: {matched_count} out of {total_jd_skills}")
            
            filtered_resumes.append({
                'resume_name': resume['Resume_Name'],
                'Score': resume['Score'],
                'experience_years': resume['experience_years'],
                'matched_skills': list_matched_skills,  
                'matched_count': f'{matched_count} out of {total_jd_skills}',   
            })
            
    return filtered_resumes