import React from "react"; 
import "../styles/Spinner.css";

const Spinner: React.FC = () => {
  return (
    <div className="spinner">
      <div className="spinner-inner"></div>
    </div>
  );
};

export default Spinner;
