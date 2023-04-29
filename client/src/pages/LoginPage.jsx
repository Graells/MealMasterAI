import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import aiarm from "../assets/airobotarm.svg";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="full-login-page">
      <div className="login-container">
        
        <h1 className="headingName">  MEALMASTER AI</h1>
        <img src={aiarm} alt="App Logo"  />


        <div className="login-hero">
          {/* <p>To create a diet using AI:</p> */}
          <LoginButton /><div className="space"></div>
       
          {/* <p>To view pre-existing diets created by other users:</p> */}
          <Link to="/dashboard">
            <button className="loginbtn" >Dashboard</button>
          </Link>
        </div>


      </div>
    </div>
  );
};

export default LoginPage;
