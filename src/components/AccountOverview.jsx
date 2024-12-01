// AccountOverview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Assuming userId is stored after login
        const response = await axios.get(`/user-transactions?user_id=${userId}`);
        setTransactions(response.data);
      } catch (err) {
        setError("Failed to load transactions. Please try again.");
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Account Overview</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Transaction Hash</th>
            <th>Blockchain Link</th>
            <th>File Link</th>
            <th>Decryption Key</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.tr_hash}</td>
              <td>
                <a href={tx.bc_hash_link} target="_blank" rel="noopener noreferrer">
                  View on Blockchain
                </a>
              </td>
              <td>
                <a href={tx.bc_file_link} target="_blank" rel="noopener noreferrer">
                  View File
                </a>
              </td>
              <td>{tx.decrypt_key_first_last_5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountOverview;
