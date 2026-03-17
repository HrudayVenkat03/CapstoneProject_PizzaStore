import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginUser from "../Services/AuthService";
import "../styles/login.css";

function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e){

    e.preventDefault();

    try{

      const response = await loginUser(email,password);
    if(response.role === "ADMIN"){             // prevent admin login from customer page
    alert("Please login from Admin Login");
        return;
      }

  localStorage.setItem("token", response.token);   // save JWT token
  localStorage.setItem("role", response.role);   // save role
  
  localStorage.setItem("email", email);      // save user info
  localStorage.setItem("name", email.split("@")[0]);   

      // redirect to menu
      navigate("/menu");

    }catch(error){

      alert("Invalid Email or Password");

    }

  }

  return(

    <div className="login-container">

      <div className="login-card">

        <h2>🍕 Pizza Store Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <div className="links">

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>

          <p>
            Admin? <Link to="/admin-login">Admin Login</Link>
          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;