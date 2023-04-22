import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

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
      <div>
        <LoginButton />
      </div>
      <div className="footer">
        <Profile />
        <LogoutButton />
      </div>
    </div>
  );
};

export default LoginPage;
