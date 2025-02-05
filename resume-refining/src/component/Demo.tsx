import React, { useState, useEffect} from "react";

const demo_data = () => {
    const [data, setData] = useState(null); // State to store API response
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch( "http://demo.localhost:8000/api/method/resume_refining.api.process_resumes"); // Replace with your API URL
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setData(result); // Store response in state
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []); // Runs only once when component mounts
  
    return (
      <div>
        <h1>API Response</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {data && (
          <div>
            <p><strong>Name:</strong> {data.name}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default demo_data;