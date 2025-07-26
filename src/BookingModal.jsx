import React, { useState } from 'react';
import { X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, selectedPlan }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [formError, setFormError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formValues.name.trim() || !formValues.email.trim() || !formValues.mobile.trim()) {
      setFormError('Please fill out all required fields.');
      return;
    }
    
    if (!recaptchaValue) {
      setFormError('Please complete the reCAPTCHA.');
      return;
    }

    setIsSending(true);
    setFormError('');
    setFormStatus(null);

    const templateParams = {
      name: formValues.name,
      email: formValues.email,
      mobile: formValues.mobile,
      company: formValues.company,
      inquiryType: selectedPlan,
      message: formValues.message || `Interested in: ${selectedPlan}`,
      'g-recaptcha-response': recaptchaValue
    };

    emailjs.send(
      'service_2wrml6l',
      'template_zk5yxqa',
      templateParams,
      '5AXiVWGDz6vYTCeLK'
    ).then(
      (result) => {
        setFormStatus("success");
        setFormValues({ name: "", email: "", mobile: "", company: "", message: "" });
        setRecaptchaValue(null);
        setIsSending(false);
        setFormError('');
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setFormStatus(null);
        }, 2000);
      },
      (error) => {
        setFormStatus("error");
        setIsSending(false);
        setFormError('Failed to send message. Please try again.');
      }
    );
  };

  const handleClose = () => {
    if (!isSending) {
      setFormValues({ name: "", email: "", mobile: "", company: "", message: "" });
      setFormError('');
      setFormStatus(null);
      setRecaptchaValue(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="booking-modal-overlay" onClick={handleClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2>Book {selectedPlan}</h2>
          {/* <p>Fill out the form below and we'll get back to you within 24 hours.</p> */}
        </div>

        {formStatus === "success" ? (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Thank you!</h3>
            <p>We've received your request and will contact you within 24 hours.</p>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@company.com"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number *</label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="+880 1712 92 53 42"
                value={formValues.mobile}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Your company name"
                value={formValues.company}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Details</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your project requirements..."
                rows="4"
                value={formValues.message}
                onChange={handleInputChange}
              />
            </div>

            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey="6Le8inMrAAAAAKQ-LgBgwKObKNjJRD7DnyJ5ySTK"
                onChange={handleRecaptchaChange}
              />
            </div>

            {formError && (
              <div className="error-message" role="alert">
                {formError}
              </div>
            )}

            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSending}
            >
              {isSending ? 'Sending...' : `Book ${selectedPlan}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal; 