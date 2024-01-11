import React from 'react';
import '../assets/css/ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p>If you have any inquiries or need assistance, feel free to reach out to us. We are here to help!</p>
      
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactUs;
