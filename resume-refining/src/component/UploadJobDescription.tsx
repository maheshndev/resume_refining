import React, { useState, useRef } from "react";
// import axios from 'axios';

import "./uploadescription.css";

type MatchedData = {
  PerfectMatched?: {
    resume_name: string;
    Score: number;
    experience_years: number;
    matched_count: number;
    matched_skills: string[];
  }[];
  TopMatched?: {
    resume_name: string;
    Score: number;
    experience_years: number;
    matched_count: number;
    matched_skills: string[];
  }[];
  GoodMatched?: {
    resume_name: string;
    Score: number;
    experience_years: number;
    matched_count: number;
    matched_skills: string[];
  }[];
};

const UploadjobDescription: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // console.log(selectedFiles[0]?.name,'selectedFiles')
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState<string>("");
  const [matchedData, setMatchedData] = useState<MatchedData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const jdFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleResumesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleJobDescFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobDescFile(e.target.files?.[0] || null);
    if (e.target.files?.[0]) {
      setJdText("");
    }
  };

  const handleJdTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJdText(e.target.value);
    if (e.target.value) {
      setJobDescFile(null);
    }
  };

  const removeFile = (indexToRemove: number) => {
    const filteredFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(filteredFiles);
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  };

  const clearJobDescriptionFile = () => {
    setJobDescFile(null);
    if (jdFileInputRef.current) jdFileInputRef.current.value = "";
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  

    const formData = new FormData();
    formData.append("jd_text", jdText);

    if (jobDescFile) {
      formData.append("jd_file", jobDescFile);
    }

    selectedFiles.forEach((file) => {
      formData.append("resumes_files", file);
    });
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
  }

     // Read the CSRF token from cookies
  let csrfToken = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");
  if (!csrfToken) {
    csrfToken = document.cookie.split("; ").find(row => row.startsWith("csrf_token="))?.split("=")[1];
  }
  console.log("Retrieved CSRF Token:", csrfToken);


  if (!csrfToken) {
    console.error("CSRF token not found...");
    return;
  }
    // console.log("Submitting form data:", {
    //   jd_text: jdText,
    //   jobDescFile,
    //   selectedFiles,
    // });  
    try {
       const response = await fetch("http://demo.localhost:8000/api/method/resume_refining.api.process_resumes", {
        method: "POST",
        credentials: 'include', // Important for session cookies
         headers: {
          'Authorization': 'token 23bc2430faf8123:c2e00c5c5db56bb',
          // "Content-Type": "application/json",
          'X-Frappe-CSRF-Token':csrfToken || '',
        },
        body: formData, // Use FormData for file uploads
      
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Response data:", data);
      setMatchedData(data.message?.Matched_Resumes || null);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Job Description and Resume Matcher</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="jd_text"><strong>Job Description</strong></label>
              <textarea
                name="jd_text"
                id="jd_text"
                className="form-control"
                rows={6}
                value={jdText}
                onChange={handleJdTextChange}
                disabled={!!jobDescFile}
                required={!jobDescFile}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="jd_file"><strong>Upload Job Description File (PDF/DOCX)</strong></label>
              <input
                type="file"
                className="form-control"
                name="jd_file"
                id="jd_file"
                accept=".pdf, .docx"
                onChange={handleJobDescFileChange}
                ref={jdFileInputRef}
                disabled={jdText.length > 0}
              />
            </div>

            {jobDescFile && (
              <div className="clear-jd-btn-container">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={clearJobDescriptionFile}
                >
                  Clear
                </button>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="resumes_files"><strong>Upload Resumes</strong></label>
              <input
                type="file"
                multiple
                className="form-control"
                name="resumes_files"
                id="resumes_files"
                required
                accept=".pdf, .docx, .txt"
                onChange={handleResumesChange}
                ref={resumeInputRef}
              />

              <div className="custom-file-display">
                {selectedFiles.length === 0 ? (
                  <span>No files chosen</span>
                ) : (
                  selectedFiles.map((file, index) => (
                    <span key={index} className="file-chip">
                      {file.name}
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeFile(index)}
                      >
                        &times;
                      </button>
                    </span>
                  ))
                )}
              </div>

              {selectedFiles.length > 0 && (
                <div className="clear-all-btn-container">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={clearAllFiles}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-dark">
                Match Resume
              </button>
            </div>
          </form>

          {loading && (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Loading...</p>
            </div>
          )}

          {matchedData && (
            <div className="matched-results mt-4">
              <h2><strong>Filter Resumes:</strong></h2>

              {matchedData?.PerfectMatched && matchedData.PerfectMatched.length > 0 && (
                <div className="result-card mt-3">
                  <h4>Perfectly Matched Resumes:</h4>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="resume-col" style={{ width: "40%" }}>Resume Name</th>
                        <th className="score-col" style={{ width: "10%" }}>Score (above 80%)</th>
                        <th className="experience-col" style={{ width: "10%" }}>Experience (years)</th>
                        <th className="matched_skills-col" style={{ width: "10%" }}>Skills Count</th>
                        <th className="matched_skills-col" style={{ width: "20%" }}>Matched Skills</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchedData.PerfectMatched.map((match, index) => (
                        <tr key={index}>
                          <td className="resume-col">{match.resume_name}</td>
                          <td className="score-col">{match.Score}</td>
                          <td className="experience-col">{match.experience_years}</td>
                          <td className="matched_skills-col">{match.matched_count}</td>
                          <td className="matched_skills-col">{match.matched_skills.join(", ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {matchedData?.TopMatched && matchedData.TopMatched.length > 0 && (
                <div className="result-card mt-3">
                  <h4>Top Matched Resumes:</h4>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="resume-col" style={{ width: "40%" }}>Resume Name</th>
                        <th className="score-col" style={{ width: "10%" }}>Score (above 70%)</th>
                        <th className="experience-col" style={{ width: "10%" }}>Experience (years)</th>
                        <th className="matched_skills-col" style={{ width: "10%" }}>Skills Count</th>
                        <th className="matched_skills-col" style={{ width: "20%" }}>Matched Skills</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchedData.TopMatched.map((match, index) => (
                        <tr key={index}>
                          <td className="resume-col">{match.resume_name}</td>
                          <td className="score-col">{match.Score}</td>
                          <td className="experience-col">{match.experience_years}</td>
                          <td className="matched_skills-col">{match.matched_count}</td>
                          <td className="matched_skills-col">{match.matched_skills.join(", ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {matchedData?.GoodMatched && matchedData.GoodMatched.length > 0 && (
                <div className="result-card mt-3">
                  <h4>Good Matched Resumes:</h4>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="resume-col" style={{ width: "40%" }}>Resume Name</th>
                        <th className="score-col" style={{ width: "10%" }}>Score (below 70%)</th>
                        <th className="experience-col" style={{ width: "10%" }}>Experience (years)</th>
                        <th className="matched_skills-col" style={{ width: "10%" }}>Skills Count</th>
                        <th className="matched_skills-col" style={{ width: "20%" }}>Matched Skills</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchedData.GoodMatched.map((match, index) => (
                        <tr key={index}>
                          <td className="resume-col">{match.resume_name}</td>
                          <td className="score-col">{match.Score}</td>
                          <td className="experience-col">{match.experience_years}</td>
                          <td className="matched_skills-col">{match.matched_count}</td>
                          <td className="matched_skills-col">{match.matched_skills.join(", ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UploadjobDescription;
