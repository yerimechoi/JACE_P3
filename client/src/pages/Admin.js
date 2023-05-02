import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_USERS, QUERY_CATEGORIES, QUERY_ALL_PRODUCTS, QUERY_USER, QUERY_CHECKOUT } from '../utils/queries';
import "./Admin.css";
import { ADD_USER, UPDATE_EMPLOYEE } from '../utils/mutations';

function Admin(props) {
  
  const valid = localStorage.getItem('employee');
  if (valid !== 'true') {
    window.location.assign('/login');
  }
  function stopFunction() {
    clearTimeout(setTimeout);
    

  };
  stopFunction = setTimeout(stopFunction, 0);
  const { employees } = useQuery(QUERY_USER);

  const worker = employees?.employee;
  console.log(worker);

  const { loading, data } = useQuery(QUERY_ALL_USERS);

  const profiles = data?.users || [];
  
  console.log(profiles);
   

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

  const handleUpdateEmployee = async (event) => {
    event.preventDefault();
   
    let id = event.target.name;
    console.log(id);
    const mutationResponse = await updateEmployee({
      variables: {
        id: id,
      },
      return: window.location.reload(),
    });
    console.log("UPDATED EMPLOYEE*******");

  };

  
  return (
    <div className="container my-1">
      <Link to="/" className="links-to-go">← Go Home</Link>
      <Link to="/pendingorders" className="links-to-go">← Pending Orders</Link>
      <Link to="/closing" className="links-to-go">← Closing</Link>

      <h2>Admin</h2>
     
      <div className="">
        {profiles.map((profile) =>
          <div key={profile.lastName} className="">
            <div className="">
              <h4 className="">{profile._id} {profile.firstName} {profile.lastName} {profile.employee}</h4>
              <a name={profile._id} id={profile._id} className="update" onClick={handleUpdateEmployee}>{profile.employee}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;