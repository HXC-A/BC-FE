import React, { useState } from 'react';
import axios from 'axios';

const LandingPage = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ uname: '', pass: '' });
  const [registerData, setRegisterData] = useState({ uname: '', pass: '' });
  const [hash, setHash] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', loginData);
      onLogin(response.data); // Pass login data to parent
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('/register', registerData);
      alert('Registration successful! Please log in.');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  const handleVerifyHash = async () => {
    try {
      const response = await axios.get(`/verify-hash?tx_hash=${hash}`);
      setVerifyResult(response.data);
    } catch (error) {
      console.error('Hash verification failed:', error.response.data);
    }
  };

  return (
    <div>
      <h1>Landing Page</h1>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={loginData.uname}
          onChange={(e) => setLoginData({ ...loginData, uname: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.pass}
          onChange={(e) => setLoginData({ ...loginData, pass: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={registerData.uname}
          onChange={(e) => setRegisterData({ ...registerData, uname: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerData.pass}
          onChange={(e) => setRegisterData({ ...registerData, pass: e.target.value })}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
      <div>
        <h2>Verify Hash</h2>
        <input
          type="text"
          placeholder="Transaction Hash"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
        />
        <button onClick={handleVerifyHash}>Verify</button>
        {verifyResult && <div>Verification Result: {JSON.stringify(verifyResult)}</div>}
      </div>
    </div>
  );
};

export default LandingPage;
