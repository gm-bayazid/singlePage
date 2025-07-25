import React, { useState } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';
import "./LandingPage.css";
import thumbnail from "./assets/thumbnail01.png";
import dashboard from "./assets/dashboard_straight.svg";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import "./header/Header.scss";
import "./footer/Footer.scss";
import ShowcaseStack from "./ShowcaseStack";
import TestimonialsCarousel from "./TestimonialsCarousel";
import FloatingWhatsApp from "./FloatingWhatsApp";
import PricingSection from "./PricingSection";
import { Helmet } from 'react-helmet';






const heroParent = {
  hidden: {},
  visible: {
    transition: {
      delay: 0.2,
      staggerChildren: 0.3 // smaller stagger for subtlety
    }
  }
};

const heroChild = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 1.5, // longer for smoothness
      ease: [0.42, 0, 0.58, 1] // standard ease-in-out
    } 
  }
};

export default function LandingPage() {
  const [formStatus, setFormStatus] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showStack, setShowStack] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    mobile: '',
    inquiryType: '',
    message: ''
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [formError, setFormError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formValues, [name]: value };
    setFormValues(updated);
    setIsFormValid(
      updated.name.trim() &&
      updated.email.trim() &&
      updated.mobile.trim() &&
      updated.inquiryType.trim() &&
      updated.message.trim()
    );
    setFormError('');
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.name.trim() || !formValues.email.trim() || !formValues.mobile.trim() || !formValues.inquiryType.trim() || !formValues.message.trim()) {
      setFormError('! Please fill out all required fields.');
      return;
    }
    if (!recaptchaValue) {
      setFormError('Please complete the reCAPTCHA.');
      return;
    }
    setFormError('');
    setIsSending(true);
    setFormStatus(null);
    // Add reCAPTCHA value to the form
    // (EmailJS will include all form fields)
    emailjs.sendForm(
      'service_2wrml6l',
      'template_zk5yxqa',
      e.target,
      '5AXiVWGDz6vYTCeLK'
    ).then(
      (result) => {
        setFormStatus("success");
        setFormValues({ name: "", email: "", mobile: "", inquiryType: "", message: "" });
        setIsFormValid(false);
        setRecaptchaValue(null);
        e.target.reset();
        setIsSending(false);
        setFormError('');
        setSelectedPlan("");
      },
      (error) => {
        setFormStatus("error");
        setIsSending(false);
      }
    );
  };
  

  return (
    <>
      <Helmet>
        <title>Excel Project Monitor | Construction Project Management Tool</title>
        <meta name="description" content="Track progress, costs, and deadlines with our Excel-based project management tool for construction teams." />
        <meta property="og:title" content="Excel Project Monitor" />
        <meta property="og:description" content="Track progress, costs, and deadlines with our Excel-based project management tool for construction teams." />
        <meta property="og:image" content="/logo192.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://milestonebd.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Excel Project Monitor" />
        <meta name="twitter:description" content="Track progress, costs, and deadlines with our Excel-based project management tool for construction teams." />
        <meta name="twitter:image" content="/logo192.png" />
        <link rel="canonical" href="https://milestonebd.com/" />
      </Helmet>
      <Header />
      <main className="landing-container">
        {/* Hero Section */}
        <section id="product" className="hero">
        <motion.div className="hero-content" variants={heroParent} initial="hidden" animate="visible">
  <div className="hero-text">
    <motion.h1 variants={heroChild} transition={{ delay: 0.5 }} >
    The Only Excel Tool You Need to Run Construction Projects Smoothly
    </motion.h1>
    <motion.p variants={heroChild} transition={{ delay: 0.8 }}>
    Designed by a 17-year veteran project manager. <br /> No bloat. No confusion. Just clear tracking and instant reporting — even from the field.
    </motion.p>
  </div>

  <motion.div
    className="hero-buttons"
    variants={heroChild}
    onAnimationStart={() => setShowStack(true)}
  >
    <a href="#pricing" className="primary-btn">See Plans & Services</a>
    <button className="secondary-btn" onClick={() => setShowVideo(true)}>
        ▶ Watch 1-Min Walkthrough
      </button>
  </motion.div>
</motion.div>

          <ShowcaseStack animateStack={showStack} />
        </section>

        {/* Problem Section */}
        <section className="problem modern-problem">
          <div className="problem-header">
            <h2>Why Most Project Monitoring Fails</h2>
            <p>Even experienced teams hit roadblocks without the right tools.</p>
          </div>
          <div className="problem-cards">
  <div className="problem-card">
    <div className="problem-top">
      <span className="problem-icon">📉</span>
      <h4>Scattered Data</h4>
    </div>
    <p>Teams waste hours collecting data from scattered sheets.</p>
  </div>

  <div className="problem-card">
    <div className="problem-top">
      <span className="problem-icon">⏱️</span>
      <h4>No Real-Time Tracking</h4>
    </div>
    <p>Managers can’t track actual vs. planned progress in real time.</p>
  </div>

  <div className="problem-card">
    <div className="problem-top">
      <span className="problem-icon">📑</span>
      <h4>Inconsistent Reports</h4>
    </div>
    <p>Clients are frustrated with inconsistent reports.</p>
  </div>
</div>

        </section>

        {/* Features Section */}
        <section id="features" className="features modern-features">
          <h2>Key Features</h2>
          <div className="features-cards">
            <div className="feature-card">
              <span className="feature-icon">✅</span>
              <h4>Progress Tracker</h4>
              <p>Track work status, milestones, and deliverables at a glance.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h4>Cost Dashboard</h4>
              <p>Instantly compare planned vs. actual spending.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🧮</span>
              <h4>Resource Sheet</h4>
              <p>Analyze labor and materials over time.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📅</span>
              <h4>Gantt Chart</h4>
              <p>Visual timeline with automatic updates.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⚠️</span>
              <h4>Delay & Risk Log</h4>
              <p>Flag issues before they escalate.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📁</span>
              <h4>Auto Reports</h4>
              <p>Generate client-ready summaries in seconds.</p>
            </div>
          </div>
        </section>

        {/* See it in Action Section */}
        <section id="action" className="see-action">
          <h2>Track budget, work progress, and delays — all from one Excel tool.</h2>
          <p className="section-subtext">
            From planning to cost to delays — this is how real project managers stay ahead.
          </p>
          <div className="video-demo" style={{ marginTop: 32, textAlign: 'center' }}>
            <video
              controls
              width="100%"
              height="auto"
              poster={thumbnail}
              style={{ maxWidth: 1200, borderRadius: 12, boxShadow: '0 4px 32px rgba(0,0,0,0.18)' }}
            >
              <source src={require('./assets/Whats Going On Full.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>


        {/* Testimonials */}
        <div id="testimonials" className="testimonials-carousel-outer">
          <TestimonialsCarousel />
        </div>
 {/* PricingSection */}
 <section id="pricing" className="pricing-section">
 <div className="PricingSection-outer">
          <PricingSection onSelectPlan={setSelectedPlan} />
        </div>
        </section>

        {/* CTA Section */}
        <section id="get-tool" className="cta">
  <h2>Start With the Free Demo — See How It Saves You Hours</h2>
  <p>This Excel-based tool is built by a 17-year project manager. Download, explore, and discover how it simplifies your workflow.</p>
  {/* <div className="cta-buttons">
    <a href={require('./assets/PMC_Tools_Demo.zip')} download className="primary-btn">Download Demo</a>
    <button className="secondary-btn" onClick={() => setShowVideo(true)}>Watch 1-Min Demo</button>
  </div> */}
</section>


        {/* Contact Section */}
        <div className="contact-form-outer" id="contact">
          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <input name="name" type="text" placeholder="Your Name" value={formValues.name} onChange={handleInputChange} />
            <input name="email" type="email" placeholder="Your Email" value={formValues.email} onChange={handleInputChange} />
            <input name="mobile" type="tel" placeholder="Mobile No" value={formValues.mobile} onChange={handleInputChange} />
            <select name="inquiryType" value={selectedPlan || formValues.inquiryType} onChange={handleInputChange}>
              <option value="" disabled>I want to...</option>
              <option value="Download the demo">Download the demo</option>
              <option value="Book a free session">Book a free session</option>
              <option value="Ask a question">Ask a question</option>
              <option value="Done-for-You Setup">Done-for-You Setup</option>
              <option value="Pro Subscription">Pro Subscription</option>
            </select>
            <textarea name="message" placeholder="Your Message" rows="4" value={formValues.message} onChange={handleInputChange}></textarea>
            <input type="hidden" name="g-recaptcha-response" value={recaptchaValue || ''} />
            <div style={{ margin: '12px 0' }}>
              <ReCAPTCHA
                sitekey="6Le8inMrAAAAAKQ-LgBgwKObKNjJRD7DnyJ5ySTK"
                onChange={handleRecaptchaChange}
                theme="dark"
              />
            </div>
            {formError && (
              <div className="error" style={{ color: '#ff9800', background: '#232a36', padding: '8px 16px', borderRadius: '6px', marginTop: '10px', display: 'inline-block' }}>
                <span style={{ fontWeight: 'bold', marginRight: 6 }}>{formError.startsWith('!') ? '!' : ''}</span> {formError.replace(/^!\s*/, '')}
              </div>
            )}
            <button type="submit" disabled={isSending} className="primary-btn">
              {isSending ? (
                <>
                  <span className="spinner"></span> Sending…
                </>
              ) : "Send Message"}
            </button>
          </form>
          {formStatus === "success" && (
            <p className="success">
              ✅ Message sent!
            </p>
          )}
          {formStatus === "error" && (
            <p className="error">❌ Something went wrong. Please try again later.</p>
          )}
        </div>

        {/* WhatsApp FAB */}
        <FloatingWhatsApp />

        {/* Video Modal */}
        {showVideo && (
          <div className="video-modal" onClick={() => setShowVideo(false)}>
            <div className="video-modal-content" onClick={e => e.stopPropagation()}>
              <video controls autoPlay style={{ width: '100%', borderRadius: '12px' }}>
                <source src={require('./assets/Whats Going On Full.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button className="close-modal" onClick={() => setShowVideo(false)}>&times;</button>
            </div>
          </div>
        )}
      </main>
      <div className="mobile-sticky-cta">
  <a href="#get-tool">Download Free Demo</a>
  <a href="#contact">Book Call</a>
</div>

      <Footer />
    </>
  );
}
