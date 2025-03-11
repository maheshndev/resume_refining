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

// frontend code
import React, { useState, useRef, useEffect } from "react";
import "./uploadescription.css";

type MatchedData = {
    PerfectMatched?: {
        resume_name: string;
        Score: string;
        experience_years: number;
        matched_count: string;
        matched_skills: string[];
        file_url: string;
        view_url: string;
    }[];
    TopMatched?: {
        resume_name: string;
        Score: string;
        experience_years: number;
        matched_count: string;
        matched_skills: string[];
        file_url: string;
        view_url: string;
    }[];
    GoodMatched?: {
        resume_name: string;
        Score: string;
        experience_years: number;
        matched_count: string;
        matched_skills: string[];
    }[];
    PoorMatched?: {
        resume_name: string;
        Score: string;
        experience_years: number;
        matched_count: string;
        matched_skills: string[];
    }[];
    NotGood?: {
        resume_name: string;
        Score: string;
        experience_years: number;
        matched_count: string;
        matched_skills: string[];
    }[];
};

type JobOption = {
    job_title: string;
    description: string;
};

const UploadjobDescription: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [jobDescFile, setJobDescFile] = useState<File | null>(null);
    const [jdText, setJdText] = useState<string>("");
    const [matchedData, setMatchedData] = useState<MatchedData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [jdSkills, setJdSkills] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewFileContent, setViewFileContent] = useState<any | null>(null);
    const [viewFileName, setViewFileName] = useState<string | null>(null);
    const [viewFileContentType, setViewFileContentType] = useState<string | null>(null);
    // drop-down data 
    const [jobOptions, setJobOptions] = useState<JobOption[]>([]);
    const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");

    const resumeInputRef = useRef<HTMLInputElement | null>(null);
    const jdFileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchJobOptions = async () => {
            try {
                setLoading(true);
                // const csrfToken = (window as any).csrf_token;
                
                const response = await fetch(
                    "/api/method/resume_refining.api.get_all_records", // Adjust API endpoint as needed
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            // "X-Frappe-CSRF-Token": csrfToken,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch job options");
                }

                const data = await response.json();
                // Set the job options directly from the message array
                setJobOptions(data.message || []);
                console.log("Fetched job options:", data.message);
            } catch (error: any) {
                console.error("Error fetching job options:", error);
                setErrorMessage("Failed to load job options");
            } finally {
                setLoading(false);
            }
        };

        fetchJobOptions();
    }, []);

    const handleJobTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedJobTitle(e.target.value);
        // If you want to automatically populate the job description textarea
        const selectedJob = jobOptions.find(job => job.job_title === e.target.value);
        if (selectedJob) {
            setJdText(selectedJob.description);
            setJobDescFile(null); // Clear any uploaded file if selecting from dropdown
        }
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMatchedData(null);
        setErrorMessage(null);
        setJdSkills([]);

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
            setErrorMessage("CSRF token is missing. Please refresh the page.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                "/api/method/resume_refining.api.process_resumes",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "X-Frappe-CSRF-Token": csrfToken,
                    },
                    body: formData,
                }
            );


            if (!response.ok) {
                const errorData = await response.json();
                let message = "An error occurred while processing resumes.";
                if (errorData && errorData.exception) {
                    message = `${"Backend Error"}: ${errorData.exception}`;
                } else if (errorData && errorData.message) {
                    message = errorData.message;
                }
                throw new Error(message);
            }

            const data = await response.json();
            console.log("Response data:", data);


            if (
                !data.message?.Matched_Resumes ||
                (data.message?.Matched_Resumes.PerfectMatched?.length === 0 &&
                    data.message?.Matched_Resumes.TopMatched?.length === 0 &&
                    data.message?.Matched_Resumes.GoodMatched?.length === 0 &&
                    data.message?.Matched_Resumes.PoorMatched?.length === 0 &&
                    data.message?.Matched_Resumes.NotGood?.length === 0)
            ) {
                setMatchedData(null);
                setErrorMessage("No resumes matched your job description.");
            } else {
                setMatchedData(data.message.Matched_Resumes);
                setErrorMessage(null);
            }
            if (data.message?.jd_required_skills) { // **EXTRACT JD SKILLS FROM RESPONSE**
                setJdSkills(data.message.jd_required_skills);
                console.log("JD Skills extracted:", data.message.jd_required_skills); // Log extracted skills for verification
            } else {
                setJdSkills([]); // Ensure jdSkills is empty if not in response
                console.warn("JD Skills not found in API response."); // Optional: Warn if not found
            }
        } catch (error: any) {
            console.error("Error:", error);
            setErrorMessage(
                error.message || "An unexpected error occurred. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleViewResume = async (viewUrl: string, fileName: string) => {
        console.log("handleViewResume START for:", fileName, "URL:", viewUrl);
        setLoading(true);
        setViewFileContent(null);
        setViewFileName(fileName);
        setViewFileContentType(null);
        setErrorMessage(null);
        setIsModalOpen(true);
        try {
            const response = await fetch(viewUrl, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch resume content: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("API Response Data:", data);
            console.log("File Content Type:", typeof data.message.file_content, data.message.file_content);
            console.log("Content Type String:", typeof data.message.content_type, data.message.content_type);

            setViewFileContent(data.message.file_content);
            setViewFileContentType(data.message.content_type);

        } catch (error: any) {
            console.error("Error viewing resume:", error);
            setErrorMessage(error.message || "Failed to view resume.");
            setViewFileContent(null);
            setViewFileContentType(null);
        } finally {
            setLoading(false);
            console.log("handleViewResume FINISHED for:", fileName);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setViewFileContent(null);
        setViewFileName(null);
        setViewFileContentType(null);
        setErrorMessage(null);
    };

    // Function to chunk base64 encoding to avoid stack overflow
    const base64EncodeChunked = (arrayBuffer: ArrayBuffer) => { // ADDED: Type annotation for arrayBuffer
        let base64String = '';
        const byteArray = new Uint8Array(arrayBuffer);
        const chunkSize = 4096; // Adjust chunk size if needed
        for (let i = 0; i < byteArray.length; i += chunkSize) {
            const chunk = byteArray.subarray(i, i + chunkSize);
            base64String += String.fromCharCode.apply(null, Array.from(chunk));
        }
        return btoa(base64String);
    };


    const renderFileContent = () => {
        if (!viewFileContent) {
            return <p>Loading resume content...</p>;
        }

        if (viewFileContentType === 'application/pdf') {
            try {
                let base64PDF;
                if (typeof viewFileContent === 'string') {
                    base64PDF = viewFileContent;
                } else if (viewFileContent instanceof ArrayBuffer) {
                    base64PDF = base64EncodeChunked(viewFileContent); // Use chunked encoding for ArrayBuffer
                }
                else {
                    // Attempt to process as Uint8Array if it's something else array-like
                    base64PDF = base64EncodeChunked(new Uint8Array(viewFileContent));
                }


                const pdfSrc = `data:application/pdf;base64,${base64PDF}`;
                return <iframe src={pdfSrc} width="100%" height="600px" title="Resume Preview" className="resume-preview-iframe" />;
            } catch (error) {
                console.error("Error rendering PDF:", error);
                return <p className="error-message">Error rendering PDF resume.</p>;
            }
        } else if (viewFileContentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || viewFileContentType === 'application/msword') {
            return <p>Word documents cannot be rendered directly. Please download to view.</p>;
        }
        else {
            try {
                return <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{String(viewFileContent)}</pre>;
            } catch (error) {
                console.error("Error rendering Text Content:", error);
                return <p className="error-message">Error rendering text-based resume.</p>;
            }
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h1>{"Job Description and Resume Matcher"}</h1>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                            <label htmlFor="job_title_select">
                                <strong>{"Select Job Title"}</strong>
                            </label>
                            <select
                                id="job_title_select"
                                className="form-control"
                                value={selectedJobTitle}
                                onChange={handleJobTitleChange}
                                required
                            >
                                <option value="">Select a job title</option>
                                {jobOptions.map((option, index) => (
                                    <option key={index} value={option.job_title}>
                                        {option.job_title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="jd_text">
                                <strong>{"Job Description"}</strong>
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
                                placeholder={"Enter job description text here..."}
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="jd_file">
                                <strong>{"Upload Job Description File (PDF/DOCX)"}</strong>
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
                            {jobDescFile && (
                                <div className="clear-jd-btn-container">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={clearJobDescriptionFile}
                                    >
                                        {"Clear"}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="resumes_files">
                                <strong>{"Upload Resumes"}</strong>
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
                                    <span>{"No files chosen"}</span>
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
                                        {"Clear All"}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-dark" disabled={loading}>
                                {" "}
                                {"Match Resume"}
                            </button>
                        </div>
                    </form>

                    {loading && (
                        <div className="loader-container">
                            <div className="loader"></div>
                            <p>{"Loading..."}</p>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="alert alert-danger mt-3">{errorMessage}</div>
                    )}

                    {jdSkills.length > 0 && (
                        <div className="jd-skills-section mt-4">
                            <h2><strong>Job Description Skills:</strong></h2>
                            <div className="jd-skills-display">
                                {jdSkills.map((skill, index) => (
                                    <span key={index} className="skill-chip jd-skill-chip">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}


                    {matchedData && (
                        <div className="matched-results mt-4">
                            <h2>
                                <strong>{"Filter Resumes:"}</strong>
                            </h2>
                            {matchedData?.PerfectMatched &&
                                matchedData.PerfectMatched.length > 0 && (
                                    <div className="result-card mt-3">
                                        <h4>{"Perfectly Matched Resumes:"}</h4>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="resume-col" style={{ width: "40%" }}>
                                                        {"Resume Name"}
                                                    </th>
                                                    <th className="score-col" style={{ width: "10%" }}>
                                                        {"Score (above 80%)"}
                                                    </th>
                                                    <th
                                                        className="experience-col"
                                                        style={{ width: "10%" }}
                                                    >
                                                        {"Experience (years)"}
                                                    </th>
                                                    <th
                                                        className="matched_skills-col"
                                                        style={{ width: "10%" }}
                                                    >
                                                        {"Skills Count"}
                                                    </th>
                                                    <th
                                                        className="matched_skills-col"
                                                        style={{ width: "20%" }}
                                                    >
                                                        {"Matched Skills"}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {matchedData.PerfectMatched.map((match, index) => (
                                                    <tr key={index}>
                                                        <td className="resume-col">
                                                            <a
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleViewResume(match.view_url, match.resume_name);
                                                                }}
                                                            >
                                                                {match.resume_name}
                                                            </a>
                                                        </td>
                                                        <td className="score-col">{match.Score}</td>
                                                        <td className="experience-col">
                                                            {match.experience_years}
                                                        </td>
                                                        <td className="matched_skills-col">
                                                            {match.matched_count}
                                                        </td>
                                                        <td className="matched_skills-col">
                                                            {match.matched_skills.join(", ")}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            {matchedData?.TopMatched && matchedData.TopMatched.length > 0 && (
                                <div className="result-card mt-3">
                                    <h4>{"Top Matched Resumes:"}</h4>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="resume-col" style={{ width: "40%" }}>
                                                    {"Resume Name"}
                                                </th>
                                                <th className="score-col" style={{ width: "10%" }}>
                                                    {"Score (above 70%)"}
                                                </th>
                                                <th className="experience-col" style={{ width: "10%" }}>
                                                    {"Experience (years)"}
                                                </th>
                                                <th
                                                    className="matched_skills-col"
                                                    style={{ width: "10%" }}
                                                >
                                                    {"Skills Count"}
                                                </th>
                                                <th
                                                    className="matched_skills-col"
                                                    style={{ width: "20%" }}
                                                >
                                                    {"Matched Skills"}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {matchedData.TopMatched.map((match, index) => (
                                                <tr key={index}>
                                                    <td className="resume-col">
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                console.log(`Clicked TopMatched resume ${index + 1}:`, match.resume_name, "viewUrl:", match.view_url);
                                                                handleViewResume(match.view_url, match.resume_name);
                                                            }}
                                                        >
                                                            {match.resume_name}
                                                        </a>
                                                    </td>
                                                    <td className="score-col">{match.Score}</td>
                                                    <td className="experience-col">
                                                        {match.experience_years}
                                                    </td>
                                                    <td className="matched_skills-col">
                                                        {match.matched_count}
                                                    </td>
                                                    <td className="matched_skills-col">
                                                        {match.matched_skills.join(", ")}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {matchedData === null &&
                                !loading &&
                                !errorMessage && (
                                    <div className="alert alert-warning mt-3">
                                        {"No resumes matched your job description."}
                                    </div>
                                )}
                            {matchedData?.GoodMatched &&
                                matchedData.GoodMatched.length > 0 && (
                                    <div className="result-card mt-3">
                                        <h4>{"Good Matched Resumes:"}</h4>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="resume-col" style={{ width: "40%" }}>
                                                        {"Resume Name"}
                                                    </th>
                                                    <th className="score-col" style={{ width: "10%" }}>
                                                        {"Score (above 60%)"}
                                                    </th>
                                                    <th
                                                        className="experience-col"
                                                        style={{ width: "10%" }}
                                                    >
                                                        {"Experience (years)"}
                                                    </th>
                                                    <th
                                                        className="matched_skills-col"
                                                        style={{ width: "10%" }}
                                                    >
                                                        {"Skills Count"}
                                                    </th>
                                                    <th
                                                        className="matched_skills-col"
                                                        style={{ width: "20%" }}
                                                    >
                                                        {"Matched Skills"}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {matchedData.GoodMatched.map((match, index) => (
                                                    <tr key={index}>
                                                        <td className="resume-col">{match.resume_name}</td>
                                                        <td className="score-col">{match.Score}</td>
                                                        <td className="experience-col">
                                                            {match.experience_years}
                                                        </td>
                                                        <td className="matched_skills-col">
                                                            {match.matched_count}
                                                        </td>
                                                        <td className="matched_skills-col">
                                                            {match.matched_skills.join(", ")}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            {matchedData?.PoorMatched &&
                                matchedData.PoorMatched.length > 0 && (
                                    <div className="result-card mt-3">
                                        <h4>{"Poor Matched Resumes:"}</h4>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="resume-col" style={{ width: "40%" }}>
                                                        {"Resume Name"}
                                                    </th>
                                                    <th className="score-col" style={{ width: "10%" }}>
                                                        {"Score (above 50%)"}
                                                    </th>
                                                    <th
                                                        className="experience-col"
                                                        style={{ width: "10%" }}
                                                    >
                                                        {"Experience (years)"}
                                                    </th>
                                                    <th
                                                        className="matched_skills-col"
                                                        style={{ width: "10%" }}
                                                    >
                                                        {"Skills Count"}
                                                    </th>
                                                    <th
                                                        className="matched_skills-col"
                                                        style={{ width: "20%" }}
                                                    >
                                                        {"Matched Skills"}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {matchedData.PoorMatched.map((match, index) => (
                                                    <tr key={index}>
                                                        <td className="resume-col">{match.resume_name}</td>
                                                        <td className="score-col">{match.Score}</td>
                                                        <td className="experience-col">
                                                            {match.experience_years}
                                                        </td>
                                                        <td className="matched_skills-col">
                                                            {match.matched_count}
                                                        </td>
                                                        <td className="matched_skills-col">
                                                            {match.matched_skills.join(", ")}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            {matchedData?.NotGood &&
                                matchedData.NotGood.length > 0 && (
                                    <div className="result-card mt-3">
                                        <h4>{"Not Good Matched Resumes:"}</h4>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="resume-col" style={{ width: "40%" }}>
                                                        {"Resume Name"}
                                                    </th>
                                                    <th className="score-col" style={{ width: "10%" }}>
                                                        {"Score (below 50%)"}
                                                    </th>
                                                    <th className="experience-col" style={{ width: "10%" }}>
                                                        {"Experience (years)"}
                                                    </th>
                                                    <th
                                                        className="matched_skills-col"
                                                        style={{ width: "10%" }}
                                                    >
                                                        {"Skills Count"}
                                                    </th>
                                                    <th
                                                        className="matched_skills-col"
                                                        style={{ width: "20%" }}
                                                    >
                                                        {"Matched Skills"}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {matchedData.NotGood.map((match, index) => (
                                                    <tr key={index}>
                                                        <td className="resume-col">{match.resume_name}</td>
                                                        <td className="score-col">{match.Score}</td>
                                                        <td className="experience-col">
                                                            {match.experience_years}
                                                        </td>
                                                        <td className="matched_skills-col">
                                                            {match.matched_count}
                                                        </td>
                                                        <td className="matched_skills-col">
                                                            {match.matched_skills.join(", ")}
                                                        </td>
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

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">View Resume: {viewFileName}</h4>
                            <button type="button" className="close-button" onClick={handleCloseModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            {renderFileContent()}
                            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                        </div>
                        <div className="modal-footer">
                            <a
                                href={matchedData?.PerfectMatched?.find(match => match.resume_name === viewFileName)?.file_url || matchedData?.TopMatched?.find(match => match.resume_name === viewFileName)?.file_url || '#'}
                                download={viewFileName || 'resume'}
                                className="btn btn-dark download-button"
                                style={{ position: 'absolute', left: '20px', bottom: '20px' }}
                            >
                                Download
                            </a>
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default UploadjobDescription;