import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import './Signup.css';
var tableId = localStorage.getItem("tableId");

function Login(props) {
console.log("tableId is already set = " + tableId);

  var tempTableId = useParams().tablesId;
  if (tempTableId > 0) {
    tableId = tempTableId;
    localStorage.setItem("tableId", tableId);
  }

  if (tableId === null || tableId === undefined || tableId === "") {
    tableId = "";
  }
  
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      
      const token = mutationResponse.data.login.token;
      console.log(mutationResponse.data.login.user.employee);
      localStorage.setItem("employee", mutationResponse.data.login.user.employee);
      //debugger;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/signup" className="links-to-go">← Go to Signup</Link>
      <div className="signup">
        <h2>Welcome Back!</h2>

        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
        <label htmlFor="email" className="label">Email:</label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit" className="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
