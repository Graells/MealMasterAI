import React from "react";

const DietDisplay = ({ diet }) => {
  // You can customize the rendering of the diet data according to your needs

  return (
    <div>
      <h2>Generated Diet Plan</h2>
      <pre>{diet.description}</pre>
    </div>
  );
};

export default DietDisplay;
