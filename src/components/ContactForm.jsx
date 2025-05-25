import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import Spinner from './Spinner';
import './ContactForm.css';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send('service_yho44bi', 'template_1vmxa7n', form, 'A7T2b-Kz8-aB7w3KJ')
      .then(() => {
        setLoading(false);
        setSent(true);
        setForm({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSent(false), 3000);
      }).catch((err) => {
        setLoading(false);
        alert('Failed to send message, try again later.');
      });
  };

  return (
    <motion.div 
      className="contact-form" 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
    >
      <h2>Contact to Arbab Arshad</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
        <textarea name="message" placeholder="Message Purpose" value={form.message} onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Send Message"}
        </button>
        {sent && <p className="sent-message">Message Sent Successfully!</p>}
      </form>
    </motion.div>
  );
};

export default ContactForm;
