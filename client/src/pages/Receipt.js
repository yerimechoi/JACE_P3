import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { validateEmail, validateInput } from '../utils/helpers';
import './Contact.css';
import { Link } from "react-router-dom";
import "./Receipt.css"

function Receipt() {
    var newName = newName;
    var newEmail = newEmail;
    var newMessage = newMessage;
    var newCart = newCart //added this
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log("cart");
    console.log(cart);

    const tableNumber = localStorage.getItem("tableId");
    console.log("tableNumber");
    console.log(tableNumber);

    console.log("userName");
    const userName = (localStorage.getItem("userName"));
    const userCurrent = JSON.parse(userName);
    console.log(userCurrent.firstName);
    console.log(userCurrent.lastName);
    console.log(userCurrent.email);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const [errorMessage, setErrorMessage] = useState('');

    function formatCart(cart) {
        let total = 0;
        let items = cart.map(item => {
            total += item.price;
            return `${item.name} - $${item.price.toFixed(2)}\n\n`
        }).join('');
        return `\n ${items}Total: $${total.toFixed(2)}`
    }
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_93p5os3',
            'template_3mqjcha',
            form.current,
            '5vCxrVoi6nK138Vam'
        )
            .then(async (result) => {
                console.log(result.text);
                console.log(form);         // <form ref={form} onSubmit={sendEmail}>
                setErrorMessage("Message sent, We will get back to you shortly!");
                await delay(2000);
                clearForm();
                setErrorMessage("");
                localStorage.setItem("tableId", "");
                console.log(localStorage.getItem("tableId"));
                return window.location.assign('/tableOrder');;


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
    const handleCart = (e) => {
        e.preventDefault();

        return newCart = e.target.value
    }


    return (

        <section>
            <div className="receiptHeader">
                <h2>💸👍Thanks {userCurrent.firstName}</h2>
                <h2>Your server will bring your order when ready!</h2>
                <h4>Feel free to save this receipt or send an e-mail copy of your receipt.</h4>
            </div>
            <div className="contact">



                <div className="receipt">
                    <h1>
                        <Link to="/tableOrder" className="links-to-go">← Back Home</Link>
                    </h1>

                    <form className="contact-form" ref={form} onSubmit={sendEmail}>
                        <label className="label hidden">Name</label>
                        <input type="text" name="user_name" className="hidden" defaultValue={userCurrent.firstName} onChange={handleName} />
                        <label className="label hidden">Email</label>
                        <input type="email" name="user_email" className="hidden" defaultValue="jace1971@yahoo.com" onChange={handleEmail} onFocus={handleFocus} onBlur={handleBlur} />
                        <label className="label hidden">Message</label>
                        <label className="label hidden">Cart</label>
                        <input type="text" name="cart" className="hidden" defaultValue={`\n${formatCart(cart)}`} onChange={handleCart} />
                        <textarea name="message" className="hidden message-box" defaultValue={userCurrent.email} onChange={handleMessage} onFocus={handleFocus} onBlur={handleBlur} />
                        <input className="submit" type="submit" value="Send" />
                    </form>
                </div>
                {errorMessage && (
                    <div>
                        <p className="error-message">{errorMessage}</p>
                    </div>
                )}

            </div>

        </section>
    );
}

export default Receipt;
