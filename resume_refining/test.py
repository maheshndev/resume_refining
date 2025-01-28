import frappe

frappe.form_dict = {
    "jd_text": "Sample Job Description Text",
    "resumes_files": ["/Users/deepanshulakde/Downloads/Deepanshu_Lakde_CV.pdf"]
}

method = frappe.get_attr("resume_refining.api.process_resumes")
result = method()
print(result)