import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { validateEmail, validateInput } from '../utils/helpers';
import './Contact.css';

function Contact() {
  var newName = newName;
  var newEmail = newEmail;
  var newMessage = newMessage;
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [errorMessage, setErrorMessage] = useState('');
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();


    if (!newName) {
      setErrorMessage('Name is missing, please provide your name!');

      return e.target.reset();

    }
    if (!validateEmail(newEmail)) {
      setErrorMessage('Email is invalid');

      return e.target.reset();

    }
    if (!newMessage) {
      setErrorMessage('Message is missing, please provide a message!');

      return e.target.reset();

    }

    emailjs.sendForm(
      'service_93p5os3',
      'template_x3tk4je',
      form.current,
      '5vCxrVoi6nK138Vam'
    )
      .then(async (result) => {
        console.log(result.text);
        console.log(form);         // <form ref={form} onSubmit={sendEmail}>
        setErrorMessage("Message sent, We will get back to you shortly!");
        await delay(4000);
        clearForm();
        return setErrorMessage('');


      }, (error) => {
        console.log(error.text);
      });
  };

  const handleFocus = (e) => {
    e.preventDefault();
    setErrorMessage('')
    console.log(e.target.value);

  };

  const handleBlur = (e) => {
    e.preventDefault();
console.log(form.current);
    console.log(newName);
    if (!validateInput(e.target.value)) {
      setErrorMessage('Please enter a valid input!')

      return;
    };

    console.log(e.target.value);
  };

  const handleName = (e) => {
    e.preventDefault();

    return newName = e.target.value;

  };

  const handleEmail = (e) => {
    e.preventDefault();

    return newEmail = e.target.value;

  };

  const handleMessage = (e) => {
    e.preventDefault();

    return newMessage = e.target.value;

  };

  const clearForm = () => {
    form.current.reset();
  };

  return (
    <section>
      <h2 className="contact-us">Contact Us</h2>

      <div className="contact">
        <div className="contact-left-container">
          <img className="map" src='/images/map.png' alt="map" />
        </div>

        <div className="contact-right-container">
          <h1>JACE</h1>
          <p>Phone: 123-456-7890</p>
          <p>Email: <a href="mailto:jace1971@yahoo.com">jace1971@yahoo.com</a></p>
          <p>Address: 130 St George St, Toronto</p>

          <form className="contact-form" ref={form} onSubmit={sendEmail}>
            <label className="label">Name</label>
            <input type="text" name="user_name" className="input" onChange={handleName} onFocus={handleFocus} onBlur={handleBlur} />
            <label className="label">Email</label>
            <input type="email" name="user_email" className="input" onChange={handleEmail} onFocus={handleFocus} onBlur={handleBlur} />
            <label className="label">Message</label>
            <textarea placeholder="Enter message" name="message" className="input message-box" onChange={handleMessage} onFocus={handleFocus} onBlur={handleBlur} />
            <input className="contact-submit" type="submit" value="Send"/>
          </form>
          {errorMessage && (
            <div>
              <p className="error-message">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}

export default Contact;
