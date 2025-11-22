import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [login_id, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/signup", {
        login_id,
        email,
        password,
      });

      if (res.data.success) {
        alert("Signup Successful!");
        navigate("/login");
      }
    } catch (err) {
      alert("Signup failed! Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111] text-white">
      <div className="bg-[#17181C] p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-5 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Login ID"
          value={login_id}
          onChange={(e) => setLoginId(e.target.value)}
          className="w-full mb-3 p-2 bg-[#111] rounded border border-gray-700"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 bg-[#111] rounded border border-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 bg-[#111] rounded border border-gray-700"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 py-2 rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
