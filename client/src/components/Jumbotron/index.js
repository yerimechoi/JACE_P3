import React from "react";
import "./style.css";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 260, clear: "both", textAlign: "center" }}
    >
      {children}
    </div>
  );
}

export default Jumbotron;
