import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [login_id, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        login_id,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }
    } catch (err) {
      alert("Login failed! Check credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111] text-white">
      <div className="bg-[#17181C] p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

        <input
          type="text"
          placeholder="Login ID"
          value={login_id}
          onChange={(e) => setLoginId(e.target.value)}
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
          onClick={handleLogin}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
