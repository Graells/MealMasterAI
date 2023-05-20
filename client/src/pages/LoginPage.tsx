import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
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
    <div>
      <div className="login-container">
        <img src="MealMasterAILogo.png" alt="App Logo" className="app-logo" />
        <h1>MealMasterAI</h1>
        <div className="login-hero">
          <p>To create a diet using AI:</p>
          <LoginButton />
        </div>
        <div className="login-dashboard">
          <p>To view pre-existing diets created by other users:</p>
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
