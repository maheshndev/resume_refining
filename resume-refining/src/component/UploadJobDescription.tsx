// import React, { useState, useRef } from "react";
// import "./uploadescription.css";

// type MatchedData = {
//   PerfectMatched?: {
//     resume_name: string;
//     Score: number;
//     experience_years: number;
//     matched_count: number;
//     matched_skills: string[];
//   }[];
//   TopMatched?: {
//     resume_name: string;
//     Score: number;
//     experience_years: number;
//     matched_count: number;
//     matched_skills: string[];
//   }[];
//   GoodMatched?: {
//     resume_name: string;
//     Score: number;
//     experience_years: number;
//     matched_count: number;
//     matched_skills: string[];
//   }[];
// };

// const UploadjobDescription: React.FC = () => {
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [jobDescFile, setJobDescFile] = useState<File | null>(null);
//   const [jdText, setJdText] = useState<string>("");
//   const [matchedData, setMatchedData] = useState<MatchedData | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   // const [username, setUsername] = useState<string>("admin@demo.localhost");
//   // const [password, setPassword] = useState<string>("Deepu26");

//   const resumeInputRef = useRef<HTMLInputElement | null>(null);
//   const jdFileInputRef = useRef<HTMLInputElement | null>(null);

//   // user details
//   // const { currentUser, login } = useFrappeAuth()
//   // const [email, setEmaill = useState("")
//   // const [password, setPassword] = useState("")

//   const handleResumesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     setSelectedFiles([...selectedFiles, ...files]);
//   };

//   const handleJobDescFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setJobDescFile(e.target.files?.[0] || null);
//     if (e.target.files?.[0]) {
//       setJdText("");
//     }
//   };

//   const handleJdTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setJdText(e.target.value);
//     if (e.target.value) {
//       setJobDescFile(null);
//     }
//   };

//   const removeFile = (indexToRemove: number) => {
//     const filteredFiles = selectedFiles.filter(
//       (_, index) => index !== indexToRemove
//     );
//     setSelectedFiles(filteredFiles);
//   };

//   const clearAllFiles = () => {
//     setSelectedFiles([]);
//     if (resumeInputRef.current) resumeInputRef.current.value = "";
//   };

//   const clearJobDescriptionFile = () => {
//     setJobDescFile(null);
//     if (jdFileInputRef.current) jdFileInputRef.current.value = "";
//   };

//   // function getCsrfTokenFromCookies() {
//   //   const cookies = document.cookie.split("; ");
//   //   for (let i = 0; i < cookies.length; i++) {
//   //     const cookie = cookies[i].split("=");
//   //     if (cookie[0] === "csrf_token") {
//   //       return cookie[1];
//   //     }
//   //   }
//   //   return null;
//   // }

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("jd_text", jdText);

//     if (jobDescFile) {
//       formData.append("jd_file", jobDescFile);
//     }

//     selectedFiles.forEach((file) => {
//       formData.append("resumes_files", file);
//     });

//     console.log("Submitting form data:", {
//       jd_text: jdText,
//       jobDescFile,
//       selectedFiles,
//     });

//     const csrfToken = window.csrf_token;
//     // console.log("CSRF Token:", csrfToken);

//     // if (!csrfToken) {
//     //   console.error("CSRF token not found");
//     // } else {
//     //   console.log("The CSRF Token:", csrfToken);
//     // }
//     // const credentials = btoa(`${username}:${password}`);
//     try {
//       await fetch(
//         "http://demo.localhost:8000/api/method/resume_refining.api.process_resumes",
//         {
//           method: "POST",
//           headers: {
//             // Authorization: `Basic ${credentials}`,
//             'Authorization': 'token aff66b7be1f9d81:f186a7be0ec9fc2',
//             "X-Frappe-CSRF-Token": csrfToken || '',
//           },
//           body: formData,
//           credentials: "include"
//         }
//       )
//         .then(response => response.json())
//         .then(data => {
//           console.log("Success:", data);
//           setMatchedData(data.Matched_Resumes);
//           setLoading(false);
//           console.log(data.Matched_Resumes,"----------------response");
//           // console.log(data.Matched_Resumes.GoodMatched,"----------------GoodMatched,");
//           // console.log(data.Matched_Resumes.GoodMatched[0],"----------------GoodMatched[0]");

//         })
//         .catch(error => {
//           console.error("Error fetching the data:", error);
//           setLoading(false);
//         });

//     } catch (error) {
//       console.error("Error fetching the data:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//     <div className="card">
//       <div className="card-header">
//         <h2>Job Description and Resume Matcher</h2>
//       </div>

//       <div className="card-body">
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div className="form-group">
//             <label htmlFor="jd_text"><strong>Job Description</strong></label>
//             <textarea
//               name="jd_text"
//               id="jd_text"
//               className="form-control"
//               rows={6}
//               value={jdText}
//               onChange={handleJdTextChange}
//               disabled={!!jobDescFile}
//               required={!jobDescFile}
//             ></textarea>
//           </div>

//           <div className="form-group">
//             <label htmlFor="jd_file"><strong>Upload Job Description File (PDF/DOCX)</strong></label>
//             <input
//               type="file"
//               className="form-control"
//               name="jd_file"
//               id="jd_file"
//               accept=".pdf, .docx"
//               onChange={handleJobDescFileChange}
//               ref={jdFileInputRef}
//               disabled={jdText.length > 0}
//             />
//           </div>

//           {jobDescFile && (
//             <div className="clear-jd-btn-container">
//               <button type="button" className="btn btn-danger" onClick={clearJobDescriptionFile}>
//                 Clear
//               </button>
//             </div>
//           )}

//           <div className="form-group">
//             <label htmlFor="resumes_files"><strong>Upload Resumes</strong></label>
//             <input
//               type="file"
//               multiple
//               className="form-control"
//               name="resumes_files"
//               id="resumes_files"
//               required
//               accept=".pdf, .docx, .txt"
//               onChange={handleResumesChange}
//               ref={resumeInputRef}
//             />

//             <div className="custom-file-display">
//               {selectedFiles.length === 0 ? (
//                 <span>No files chosen</span>
//               ) : (
//                 selectedFiles.map((file, index) => (
//                   <span key={index} className="file-chip">
//                     {file.name}
//                     <button type="button" className="remove-btn" onClick={() => removeFile(index)}>
//                       &times;
//                     </button>
//                   </span>
//                 ))
//               )}
//             </div>

//             {selectedFiles.length > 0 && (
//               <div className="clear-all-btn-container">
//                 <button type="button" className="btn btn-danger" onClick={clearAllFiles}>
//                   Clear All
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="text-center">
//             <button type="submit" className="btn btn-dark">
//               Match Resume
//             </button>
//           </div>
//         </form>

//         {loading && (
//           <div className="loader-container">
//             <div className="loader"></div>
//             <p>Loading...</p>
//           </div>
//         )}

//         {matchedData && (
//           <div className="matched-results mt-4">
//             <h2><strong>Filter Resumes:</strong></h2>
//             {matchedData.PerfectMatched?.length > 0 && (
//               <div className="result-card mt-3">
//                 <h4>Perfectly Matched Resumes:</h4>
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th className="resume-col" style={{ width: "40%" }}>Resume Name</th>
//                       <th className="score-col" style={{ width: "10%" }}>Score (above 80%)</th>
//                       <th className="experience-col" style={{ width: "10%" }}>Experience (years)</th>
//                       <th className="matched_skills-col" style={{ width: "10%" }}>Skills Count</th>
//                       <th className="matched_skills-col" style={{ width: "20%" }}>Matched Skills</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {matchedData.PerfectMatched.map((match, index) => (
//                       <tr key={index}>
//                         <td className="resume-col">{match.resume_name}</td>
//                         <td className="score-col">{match.Score}</td>
//                         <td className="experience-col">{match.experience_years}</td>
//                         <td className="matched_skills-col">{match.matched_count}</td>
//                         <td className="matched_skills-col">{match.matched_skills.join(", ")}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {matchedData.TopMatched?.length > 0 && (
//               <div className="result-card mt-3">
//                 <h4>Top Matched Resumes:</h4>
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th className="resume-col" style={{ width: "40%" }}>Resume Name</th>
//                       <th className="score-col" style={{ width: "10%" }}>Score (above 70%)</th>
//                       <th className="experience-col" style={{ width: "10%" }}>Experience (years)</th>
//                       <th className="matched_skills-col" style={{ width: "10%" }}>Skills Count</th>
//                       <th className="matched_skills-col" style={{ width: "20%" }}>Matched Skills</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {matchedData.TopMatched.map((match, index) => (
//                       <tr key={index}>
//                         <td className="resume-col">{match.resume_name}</td>
//                         <td className="score-col">{match.Score}</td>
//                         <td className="experience-col">{match.experience_years}</td>
//                         <td className="matched_skills-col">{match.matched_count}</td>
//                         <td className="matched_skills-col">{match.matched_skills.join(", ")}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {matchedData.GoodMatched?.length > 0 && (
//               <div className="result-card mt-3">
//                 <h4>Good Matched Resumes:</h4>
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th className="resume-col" style={{ width: "40%" }}>Resume Name</th>
//                       <th className="score-col" style={{ width: "10%" }}>Score (below 70%)</th>
//                       <th className="experience-col" style={{ width: "10%" }}>Experience (years)</th>
//                       <th className="matched_skills-col" style={{ width: "10%" }}>Skills Count</th>
//                       <th className="matched_skills-col" style={{ width: "20%" }}>Matched Skills</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {matchedData.GoodMatched.map((match, index) => (
//                       <tr key={index}>
//                         <td className="resume-col">{match.resume_name}</td>
//                         <td className="score-col">{match.Score}</td>
//                         <td className="experience-col">{match.experience_years}</td>
//                         <td className="matched_skills-col">{match.matched_count}</td>
//                         <td className="matched_skills-col">{match.matched_skills.join(", ")}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// );
// };

// export default UploadjobDescription;

// Frontend v3.0

import React, { useState, useRef } from "react";
// import axios from 'axios';

import "./uploadescription.css";
// import { _ } from 'frappe-react-sdk'; // **CHANGE: Import `_` from `frappe-react-sdk` for translation**

type MatchedData = {
  PerfectMatched?: {
    resume_name: string;
    Score: string; // **CHANGE**: Score should be string to match backend response (e.g., "85.50%")
    experience_years: number;
    matched_count: string;
    matched_skills: string[];
    file_url: string; // **CHANGE**: Use `file_url` to match backend response
  }[];
  TopMatched?: {
    resume_name: string;
    Score: string; // **CHANGE**: Score should be string
    experience_years: number;
    matched_count: string;
    matched_skills: string[];
    file_url: string; // **CHANGE**: Use `file_url`
  }[];
  GoodMatched?: {
    resume_name: string;
    Score: string; // **CHANGE**: Score should be string
    experience_years: number;
    matched_count: string;
    matched_skills: string[];
  }[];
  PoorMatched?: {
    resume_name: string;
    Score: string; // **CHANGE**: Score should be string
    experience_years: number;
    matched_count: string;
    matched_skills: string[];
  }[];
  NotGood?: {
    resume_name: string;
    Score: string; // **CHANGE**: Score should be string
    experience_years: number;
    matched_count: string;
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // **CHANGE: Add error message state**


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
    setMatchedData(null); // Reset previous results
    setErrorMessage(null); // **CHANGE: Clear error message on new submit**

    const formData = new FormData();
    formData.append("jd_text", jdText);

    if (jobDescFile) {
      formData.append("jd_file", jobDescFile);
    }

    selectedFiles.forEach((file) => {
      formData.append("resumes_files", file);
    });

    const csrfToken = (window as any).csrf_token;
    console.log("CSRF Token:", csrfToken);

    if (!csrfToken) {
      console.error("CSRF token not found...");
      setErrorMessage(("CSRF token is missing. Please refresh the page.")); // **CHANGE: Use translated error message**
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/method/resume_refining.api.process_resumes", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-Frappe-CSRF-Token": csrfToken,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        let message = ("An error occurred while processing resumes."); // **CHANGE: Use translated default error message**
        if (errorData && errorData.exception) {
            message = `${("Backend Error")}: ${errorData.exception}`; // **CHANGE: Include backend exception in error message**
        } else if (errorData && errorData.message) {
            message = errorData.message;
        }
        throw new Error(message);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (!data.message?.Matched_Resumes ||
          (data.message?.Matched_Resumes.PerfectMatched?.length === 0 &&
           data.message?.Matched_Resumes.TopMatched?.length === 0 &&
           data.message?.Matched_Resumes.GoodMatched?.length === 0 &&
           data.message?.Matched_Resumes.PoorMatched?.length === 0 &&
           data.message?.Matched_Resumes.NotGood?.length === 0)) {
        setMatchedData(null);
        setErrorMessage(("No resumes matched your job description.")); // **CHANGE: Use translated "No matches" message**
      } else {
        setMatchedData(data.message.Matched_Resumes);
        setErrorMessage(null); // **CHANGE: Clear error message on success**
      }
    } catch (error: any) {
      console.error("Error:", error);
      setErrorMessage(error.message || ("An unexpected error occurred. Please try again later.")); // **CHANGE: Use translated generic error message**
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>{("Job Description and Resume Matcher")}</h1> {/* **CHANGE: Use translated header** */}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="jd_text"><strong>{("Job Description")}</strong></label> {/* **CHANGE: Use translated label** */}
              <textarea
                name="jd_text"
                id="jd_text"
                className="form-control"
                rows={6}
                value={jdText}
                onChange={handleJdTextChange}
                disabled={!!jobDescFile}
                required={!jobDescFile}
                placeholder={("Enter job description text here...")} // **CHANGE: Use translated placeholder**
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="jd_file"><strong>{("Upload Job Description File (PDF/DOCX)")}</strong></label> {/* **CHANGE: Use translated label** */}
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
              {jobDescFile && (
              <div className="clear-jd-btn-container">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={clearJobDescriptionFile}
                >
                  {("Clear")} {/* **CHANGE: Use translated button text** */}
                </button>
              </div>
            )}

            </div>


            <div className="form-group">
              <label htmlFor="resumes_files"><strong>{("Upload Resumes")}</strong></label> {/* **CHANGE: Use translated label** */}
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
                  <span>{("No files chosen")}</span> // **CHANGE: Use translated text**
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
                    {("Clear All")} {/* **CHANGE: Use translated button text** */}
                  </button>
                </div>
              )}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-dark" disabled={loading}> {/* **CHANGE: Disable button during loading** */}
                {("Match Resume")} {/* **CHANGE: Use translated button text** */}
              </button>
            </div>
          </form>

          {loading && (
            <div className="loader-container">
              <div className="loader"></div>
              <p>{("Loading...")}</p> {/* **CHANGE: Use translated loading text** */}
            </div>
          )}

          {errorMessage && ( // **CHANGE: Display error message if present**
            <div className="alert alert-danger mt-3">
                {errorMessage}
            </div>
          )}

          {matchedData && (
            <div className="matched-results mt-4">
              <h2><strong>{("Filter Resumes:")}</strong></h2> {/* **CHANGE: Use translated heading** */}

              {matchedData?.PerfectMatched && matchedData.PerfectMatched.length > 0 && (
                <div className="result-card mt-3">
                  <h4>{("Perfectly Matched Resumes:")}</h4> {/* **CHANGE: Use translated heading** */}
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="resume-col" style={{ width: "40%" }}>{("Resume Name")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="score-col" style={{ width: "10%" }}>{("Score (above 80%)")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="experience-col" style={{ width: "10%" }}>{("Experience (years)")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="matched_skills-col" style={{ width: "10%" }}>{("Skills Count")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="matched_skills-col" style={{ width: "20%" }}>{("Matched Skills")}</th> {/* **CHANGE: Use translated column header** */}
                      </tr>
                    </thead>
                    <tbody>
                      {matchedData.PerfectMatched.map((match, index) => (
                        <tr key={index}>
                          <td className="resume-col"><a href={match.file_url} download>{match.resume_name}</a></td> {/* **CHANGE**: Use `match.file_url` and keep `download` attribute */}
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
                  <h4>{("Top Matched Resumes:")}</h4> {/* **CHANGE: Use translated heading** */}
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="resume-col" style={{ width: "40%" }}>{("Resume Name")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="score-col" style={{ width: "10%" }}>{("Score (above 70%)")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="experience-col" style={{ width: "10%" }}>{("Experience (years)")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="matched_skills-col" style={{ width: "10%" }}>{("Skills Count")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="matched_skills-col" style={{ width: "20%" }}>{("Matched Skills")}</th> {/* **CHANGE: Use translated column header** */}
                      </tr>
                    </thead>
                    <tbody>
                      {matchedData.TopMatched.map((match, index) => (
                        <tr key={index}>
                          <td className="resume-col"><a href={match.file_url} download> {/* **CHANGE**: Use `match.file_url` and keep `download` attribute */}
                                  {match.resume_name}
                             </a>
                          </td>
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
              {/* Show "No Matches Found" Message */}
                {matchedData === null && !loading && !errorMessage && ( // **CHANGE: Conditionally render "No matches" message and check for errorMessage**
                  <div className="alert alert-warning mt-3">
                    {("No resumes matched your job description.")} {/* **CHANGE: Use translated message** */}
                  </div>
                )}

              {matchedData?.GoodMatched && matchedData.GoodMatched.length > 0 && (
                <div className="result-card mt-3">
                  <h4>{("Good Matched Resumes:")}</h4> {/* **CHANGE: Use translated heading** */}
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="resume-col" style={{ width: "40%" }}>{("Resume Name")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="score-col" style={{ width: "10%" }}>{("Score (above 60%)")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="experience-col" style={{ width: "10%" }}>{("Experience (years)")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="matched_skills-col" style={{ width: "10%" }}>{("Skills Count")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="matched_skills-col" style={{ width: "20%" }}>{("Matched Skills")}</th> {/* **CHANGE: Use translated column header** */}
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
              {matchedData?.PoorMatched && matchedData.PoorMatched.length > 0 && (
                <div className="result-card mt-3">
                  <h4>{("Poor Matched Resumes:")}</h4> {/* **CHANGE: Use translated heading** */}
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="resume-col" style={{ width: "40%" }}>{("Resume Name")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="score-col" style={{ width: "10%" }}>{("Score (above 50%)")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="experience-col" style={{ width: "10%" }}>{("Experience (years)")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="matched_skills-col" style={{ width: "10%" }}>{("Skills Count")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="matched_skills-col" style={{ width: "20%" }}>{("Matched Skills")}</th> {/* **CHANGE: Use translated column header** */}
                      </tr>
                    </thead>
                    <tbody>
                      {matchedData.PoorMatched.map((match, index) => (
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
               {matchedData?.NotGood && matchedData.NotGood.length > 0 && (
                <div className="result-card mt-3">
                  <h4>{("Not Good Matched Resumes:")}</h4> {/* **CHANGE: Use translated heading** */}
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="resume-col" style={{ width: "40%" }}>{("Resume Name")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="score-col" style={{ width: "10%" }}>{("Score (below 50%)")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="experience-col" style={{ width: "10%" }}>{("Experience (years)")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="matched_skills-col" style={{ width: "10%" }}>{("Skills Count")}</th> {/* **CHANGE: Use translated column header** */}
                        <th className="matched_skills-col" style={{ width: "20%" }}>{("Matched Skills")}</th> {/* **CHANGE: Use translated column header** */}
                      </tr>
                    </thead>
                    <tbody>
                      {matchedData.NotGood.map((match, index) => (
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