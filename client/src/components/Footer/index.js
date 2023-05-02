import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './Footer.css';

function Footer() {

  var tableNumber = localStorage.getItem("tableId");
  if (tableNumber === null || tableNumber === undefined || tableNumber === "") {
    tableNumber = "";
  } else {
    tableNumber = "Table " + tableNumber;
  }

  if (!Auth.loggedIn()) {
    tableNumber = "";
  }



  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="table-number">{tableNumber}</h2>
        <p>
          Want to learn more? <Link to="/contact">Contact Us Here!</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
