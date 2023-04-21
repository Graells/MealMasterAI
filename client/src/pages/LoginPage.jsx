import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        navigate('/home');
        return null;
      }
    
    
  return (
    <div>
    <LoginButton />
    <LogoutButton />
    <Profile />
    </div>

  );
};

export default LoginPage;
