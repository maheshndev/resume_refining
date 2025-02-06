import React, { useState } from "react";
import "./uploadescription.css";

const UploadjobDescription = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [matchedData, setMatchedData] = useState(null); // To store the backend response
  const [loading, setLoading] = useState(false); // For showing loading state

  const handleResumesChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeFile = (indexToRemove) => {
    const filteredFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(filteredFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("job_Description", e.target.job_Description.value);
    selectedFiles.forEach((file) => {
      formData.append("resumes", file);
    });

    try {
      const response = await fetch("/xyz", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMatchedData(data); // Store the payload data from backend
      setLoading(false);
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
          {/* Job Description part */}
          <form onSubmit={handleSubmit} encType="multipart/form-data">

          <div className="form-group">
              <label htmlFor="job_Description_file">Upload JD</label>
              <input
                type="file"
                className="form-control"
                name="job_Description_file"
                id="job_Description_file"
                required
                accept=".pdf, .docx, .txt"
              />
            </div>


            <div className="form-group">
              <label htmlFor="job_Description">Job Description</label>
              <textarea
                name="job_Description"
                id="job_Description"
                className="form-control"
                rows={6}
                required
              ></textarea>
            </div>

            {/* Resume Upload */}
            <div className="form-group">
              <label htmlFor="resumes">Upload Resumes</label>
              <input
                type="file"
                multiple
                className="form-control"
                name="resumes"
                id="resumes"
                required
                accept=".pdf, .docx, .txt"
                onChange={handleResumesChange}
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
            </div>

            <button type="submit" className="btn btn-primary">
              Match Resume
            </button>
          </form>
        </div>
      </div>
      
      {loading && <p>Loading...</p>}

      {/* Matched Data Display */}
      {matchedData && (
        <div className="matched-results">
          <h3>Results:</h3>

          {matchedData.PerfectMatched.length > 0 && (
            <>
              <h4>Perfectly Matched:</h4>
              <ul>
                {matchedData.PerfectMatched.map((match, index) => (
                  <li key={index}>
                    {match.Resume} - {match.Score}
                  </li>
                ))}
              </ul>
            </>
          )}

          {matchedData.TopMatched.length > 0 && (
            <>
              <h4>Top Matched:</h4>
              <ul>
                {matchedData.TopMatched.map((match, index) => (
                  <li key={index}>
                    {match.Resume} - {match.Score}
                  </li>
                ))}
              </ul>
            </>
          )}

          {matchedData.GoodMatched.length > 0 && (
            <>
              <h4>Good Matched:</h4>
              <ul>
                {matchedData.GoodMatched.map((match, index) => (
                  <li key={index}>
                    {match.Resume} - {match.Score}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadjobDescription;
