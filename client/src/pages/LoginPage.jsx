import React, { useState } from "react";
import "../styles/Login.css"
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
  
      // Check if the response status is OK
      if (response.ok) {
        const loggedIn = await response.json();
  
        if (loggedIn.user && loggedIn.token) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token
            })
          );
          toast.success("Login successful");
          navigate("/");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        // If response is not ok, handle error
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.log("Login failed", err.message);
      toast.error("Login failed. Please try again.");
    }
  };
  

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="buttonStyle">LOG IN</button>
        </form>
        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
