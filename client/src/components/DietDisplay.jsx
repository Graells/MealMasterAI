import React from "react";

const DietDisplay = ({ diet }) => {

  return (
    <div className="dietDisplay">
      <h2>Generated Diet Plan</h2>
      <pre>{diet.description}</pre>
    </div>
  );
};

export default DietDisplay;
