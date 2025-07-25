import React, { useState } from 'react';
import { Mail, Phone, SendHorizonal } from 'lucide-react';
import logo from '../assets/logo_footer.svg';

import './Footer.scss';
import linkedinIcon from '../assets/linkedin.svg';
import facebookIcon from '../assets/facebook.svg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-main" role="contentinfo">
      <div className="footer-top container">
        <div className="footer-col footer-brand">
          <img src={logo} alt="Excel Project Monitor Logo" className="footer-logo" />
          <p className="footer-desc">
            Built for engineers by engineers — Excel Project Monitor helps you track progress, costs, and deadlines without complex software.
          </p>

          <div className="footer-socials">
            <a href="https://linkedin.com/company/milestonebd" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a href="https://facebook.com/milestonebd" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" />
            </a>
          </div>
        </div>

        <div className="footer-col footer-services">
          <h6>Our Services</h6>
          <ul>
            <li><a href="#features">Project Planning</a></li>
            <li><a href="#features">Progress Reporting</a></li>
            <li><a href="#features">Cost Management</a></li>
          </ul>
        </div>

        <div className="footer-col footer-contact-info">
          <h6>Contact Info</h6>
          <div className="footer-contact-row">
            <Mail size={18} strokeWidth={2} />
            <a href="mailto:support@milestonebd.com">support@milestonebd.com</a>
          </div>
          <div className="footer-contact-row">
            <Phone size={18} strokeWidth={2} />
            <a href="tel:+8801712925342">+880 1712 92 53 42</a>
          </div>
        </div>

        <div className="footer-col footer-newsletter">
          <h6>Newsletter</h6>
          <p className="newsletter-desc">
            Stay updated with our latest insights and company news.
          </p>
          {!isSubscribed ? (
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={isLoading} className={isLoading ? 'loading' : ''}>
                  {isLoading ? <div className="spinner" aria-label="Loading"></div> : <SendHorizonal size={18} strokeWidth={2} />}
                </button>
              </div>
              {error && <div className="error-message" role="alert">{error}</div>}
            </form>
          ) : (
            <div className="success-message" role="alert">✅ Thanks for subscribing!</div>
          )}
        </div>
      </div>

      {/* ➕ Global + Checkout Info */}
      <div className="footer-extra container">
        <p>📍 Built in Bangladesh for global project teams</p>
        {/* <p>🔒 Secure checkout powered by Stripe</p> */}
      </div>

      <div className="footer-bottom container">
        <div className="footer-bottom-links">
          <a href="/">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-copyright">
          &copy; {currentYear} milestoneBD. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
