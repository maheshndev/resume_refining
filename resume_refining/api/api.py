import os
import re
import shutil
# import spacy 
import docx2txt
import PyPDF2
from frappe import _
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

# Keep helper methods: allowed_file, parse_jd, parse_resume, etc.
