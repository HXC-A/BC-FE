// UploadPage.jsx
import React, { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = async () => {
    setStatus("Uploading...");
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const ipfsResponse = await axios.post("/upload-to-ipfs", formData);
      const ipfsHash = ipfsResponse.data.ipfs_hash;

      const hashResponse = await axios.post("/store-hash", { hash_value: ipfsHash });
      setStatus(`Transaction Successful! Hash: ${hashResponse.data.tx_hash}`);
    } catch (err) {
      setError("Upload failed. Please try again.");
    }
  };

  const handleHashVerification = async () => {
    setError("");
    try {
      const response = await axios.get(`/verify-hash?tx_hash=${hash}`);
      setStatus(`Verification Result: ${JSON.stringify(response.data)}`);
    } catch (err) {
      setError("Verification failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Upload Page</h1>
      <div>
        <h2>Upload File</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      <div>
        <h2>Verify Hash</h2>
        <input
          type="text"
          placeholder="Enter Transaction Hash"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
        />
        <button onClick={handleHashVerification}>Verify</button>
      </div>
      {status && <p>{status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadPage;
