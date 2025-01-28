import React, { useState, useRef } from "react";
import "./Jobdescription.css";

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
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState<string>("");
  const [matchedData, setMatchedData] = useState<MatchedData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const jdFileInputRef = useRef<HTMLInputElement | null>(null);

  // Helper function to get CSRF token from cookies
  const getCSRFToken = () => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrf_token"))
      ?.split("=")[1];
    return csrfToken || "";
  };

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

    try {
      // Fetch CSRF token and add it to the headers
      const csrfToken = getCSRFToken();
      console.log("csrfToken:", csrfToken); // Ensure the token is being logged

      const response = await fetch(
        "http://demo.localhost:8000/api/method/resume_refining.api.process_resumes",
        {
          method: "POST",
          credentials: "include", // Ensures cookies are sent with the request
          headers: {
            "X-Frappe-CSRF-Token": csrfToken, // Add CSRF token to headers
          },
          body: formData, // Send form data
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setMatchedData(data.Matched_Resumes);
    } catch (error) {
      console.error("Error fetching the data:", error);
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
          <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
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
              <button
                type="button"
                className="btn btn-danger"
                onClick={clearJobDescriptionFile}
              >
                Clear
              </button>
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
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={clearAllFiles}
                >
                  Clear All
                </button>
              )}
            </div>

            <button type="submit" className="btn btn-dark">
              Match Resume
            </button>
          </form>

          {loading && <p>Loading...</p>}

          {matchedData && (
            <div className="matched-results mt-4">
              <h4>Matched Results</h4>
              {/* Display matched data */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadjobDescription;
