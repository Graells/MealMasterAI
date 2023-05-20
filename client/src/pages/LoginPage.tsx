import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import aiarm from "../assets/airobotarm.svg";
import "../styles/LoginPage.css";
import "../styles/index.css"
import DashboardIcon from "@mui/icons-material/Dashboard";
import Footer from "../components/Footer";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <h1 className="headingName"> MEALMASTER AI</h1>
      <img src={aiarm} alt="App Logo" />

      <div className="login-hero">
        <LoginButton />
        <div className="space"></div>

        <Link to="/dashboard">
          <button className="settings-buttons">
            Dashboard
          </button>
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LoginPage;
