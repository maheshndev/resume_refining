import React, { useState, useRef } from "react";
import { useFrappeAuth } from "frappe-react-sdk";
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
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState<string>("");
  const [matchedData, setMatchedData] = useState<MatchedData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("admin@demo.localhost");
  const [password, setPassword] = useState<string>("Deepu26");

  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const jdFileInputRef = useRef<HTMLInputElement | null>(null);

  // user details
  // const { currentUser, login } = useFrappeAuth()
  // const [email, setEmaill = useState("")
  // const [password, setPassword] = useState("")

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
    const filteredFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
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

  // function getCsrfTokenFromCookies() {
  //   const cookies = document.cookie.split("; ");
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].split("=");
  //     if (cookie[0] === "csrf_token") {
  //       return cookie[1];
  //     }
  //   }
  //   return null;
  // }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

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

    console.log("Submitting form data:", {
      jd_text: jdText,
      jobDescFile,
      selectedFiles,
    });  

    const csrfToken = window.csrf_token;
    // console.log("CSRF Token:", csrfToken);

    // if (!csrfToken) {
    //   console.error("CSRF token not found");
    // } else {
    //   console.log("The CSRF Token:", csrfToken);
    // }
    // const credentials = btoa(`${username}:${password}`);
    try {
      await fetch(
        "http://demo.localhost:8000/api/method/resume_refining.api.process_resumes",
        {
          method: "POST",
          headers: {
            // Authorization: `Basic ${credentials}`,
            'Authorization': 'token aff66b7be1f9d81:f186a7be0ec9fc2',
            "X-Frappe-CSRF-Token": csrfToken || '',
          },
          body: formData,
          credentials: "include"
        }
      )
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
          setMatchedData(data.Matched_Resumes);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching the data:", error);
          setLoading(false);
        });

    } catch (error) {
      console.error("Error fetching the data:", error);
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
              <label htmlFor="jd_text">
                <strong>Job Description</strong>
              </label>
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
              <label htmlFor="jd_file">
                <strong>Upload Job Description File (PDF/DOCX)</strong>
              </label>
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
              <label htmlFor="resumes_files">
                <strong>Upload Resumes</strong>
              </label>
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
              <h2>
                <strong>Filter Resumes:</strong>
              </h2>
              {/* Display matched resumes here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadjobDescription;
