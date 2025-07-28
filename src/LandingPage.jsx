import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';
import { useNavigate, useLocation } from "react-router-dom";
import "./LandingPage.css";
import thumbnail from "./assets/thumbnail01.png";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import "./header/Header.scss";
import "./footer/Footer.scss";
import ShowcaseStack from "./ShowcaseStack";
import FloatingWhatsApp from "./FloatingWhatsApp";
import PricingSection from "./PricingSection";
import { Helmet } from 'react-helmet';
import { useRef } from "react";




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

const fadeInVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

export default function LandingPage({ scrollTo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [formStatus, setFormStatus] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showStack, setShowStack] = useState(false);
  const [isSending, setIsSending] = useState(false);
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

  // Section refs and inView
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { amount: 0.2, once: false });
  const actionRef = useRef(null);
  const actionInView = useInView(actionRef, { amount: 0.2, once: false });
  const pricingRef = useRef(null);
  const pricingInView = useInView(pricingRef, { amount: 0.2, once: false });
  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { amount: 0.2, once: false });
  const problemRef = useRef(null);
  const problemInView = useInView(problemRef, { amount: 0.2, once: false });
  const solutionRef = useRef(null);
  const solutionInView = useInView(solutionRef, { amount: 0.2, once: false });
  const whoRef = useRef(null);
  const whoInView = useInView(whoRef, { amount: 0.2, once: false });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { amount: 0.2, once: false });

  // Handle scrollTo prop and route-based scrolling
  useEffect(() => {
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [scrollTo]);

  // Clean URL when component mounts
  useEffect(() => {
    if (location.pathname !== '/') {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000); // Clean URL after 2 seconds
    }
  }, [location.pathname, navigate]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formValues, [name]: value };
    setFormValues(updated);
    
    // If user manually changes inquiryType, clear selectedPlan
    if (name === 'inquiryType') {
      setSelectedPlan('');
    }
    
    // Check if all fields are filled, including selectedPlan for inquiryType
    const inquiryTypeValue = name === 'inquiryType' ? value : (selectedPlan || updated.inquiryType);
    
    setFormError('');
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inquiryTypeValue = selectedPlan || formValues.inquiryType;
    if (!formValues.name.trim() || !formValues.email.trim() || !formValues.mobile.trim() || !inquiryTypeValue.trim() || !formValues.message.trim()) {
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
    
    // Prepare template parameters with all form data
    const templateParams = {
      name: formValues.name,
      email: formValues.email,
      mobile: formValues.mobile,
      inquiryType: selectedPlan || formValues.inquiryType,
      message: formValues.message,
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
        setFormValues({ name: "", email: "", mobile: "", inquiryType: "", message: "" });
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
          <title>milestoneBD | Excel Project Monitoring Tool for Construction</title>
          <meta name="description" content="Professional Excel-based project monitoring tool for construction managers. Track progress, costs, and deadlines with our 17-year veteran designed solution." />
          <meta name="keywords" content="project monitoring, construction management, Excel tools, project tracking, cost management, construction software" />
          <meta property="og:title" content="milestoneBD - Excel Project Monitoring Tool" />
          <meta property="og:description" content="Professional Excel-based project monitoring tool for construction managers. Track progress, costs, and deadlines with our 17-year veteran designed solution." />
          <meta property="og:image" content="https://milestonebd.com/logo192.png" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://milestonebd.com/" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="milestoneBD - Excel Project Monitoring Tool" />
          <meta name="twitter:description" content="Professional Excel-based project monitoring tool for construction managers. Track progress, costs, and deadlines." />
          <meta name="twitter:image" content="https://milestonebd.com/logo192.png" />
          <link rel="canonical" href="https://milestonebd.com/" />
          <meta name="robots" content="index, follow" />
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "milestoneBD",
                "url": "https://milestonebd.com/",
                "logo": "https://milestonebd.com/logo192.png"
              }
            `}
          </script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZH8BY50WT7"></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZH8BY50WT7');
            `}
          </script>
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
        <motion.section
          className="problem modern-problem"
          ref={problemRef}
          variants={fadeInVariant}
          initial="hidden"
          animate={problemInView ? "visible" : "hidden"}
        >
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

        </motion.section>

        {/* Solution Section */}
        <motion.section
          className="solution modern-solution"
          ref={solutionRef}
          variants={fadeInVariant}
          initial="hidden"
          animate={solutionInView ? "visible" : "hidden"}
        >
          <h2>Introducing the Field-Tested Excel Tool Built for Real Construction Projects</h2>
          <p>This isn't a template you found online. It's a powerful, plug-and-play Excel tool crafted from 17+ years of hard-earned field experience.</p>
          <div className="solution-cards">
            <div className="solution-card">
              <span className="solution-icon">📊</span>
              <h4>Track daily progress in real-time</h4>
              <p>Monitor work status, milestones, and deliverables at a glance.</p>
            </div>
            <div className="solution-card">
              <span className="solution-icon">💰</span>
              <h4>Monitor budget vs. actual costs</h4>
              <p>Compare planned vs. actual expenses with instant updates.</p>
            </div>
            <div className="solution-card">
              <span className="solution-icon">📈</span>
              <h4>Generate reports without formulas</h4>
              <p>Create client-ready summaries in seconds, no Excel expertise needed.</p>
            </div>
            <div className="solution-card">
              <span className="solution-icon">🎯</span>
              <h4>Stay in control — on-site or off-site</h4>
              <p>Access your project data anywhere, anytime with full control.</p>
            </div>
          </div>
          <div className="solution-highlight">
            <h3>And the best part?</h3>
            <p>You don't need to learn any new software. If you can use Excel, you can use this.</p>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          className="features modern-features"
          ref={featuresRef}
          variants={fadeInVariant}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
        >
          <h2>Key Features</h2>
          <div className="features-cards">
            <div className="feature-card">
              <span className="feature-icon">✅</span>
              <h4>Progress Tracker</h4>
              <p>Track work status, milestones, and deliverables at a glance.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h4>Project Dashboard</h4>
              <p>Instantly compare planned vs. actual progress and many more.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🧮</span>
              <h4>Cost Loading Sheet</h4>
              <p>Analyze activities and cost over time.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📅</span>
              <h4>Look Ahead Sheet</h4>
              <p>Visual timeline with automatic updates .</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📈</span>
              <h4>Indepth Comparison Sheet</h4>
              <p>Compare planned vs. actual quantity, delays, and many more.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📁</span>
              <h4>Auto Reports</h4>
              <p>Generate client-ready summaries in seconds.</p>
            </div>
          </div>
        </motion.section>

        {/* Who This Is For Section */}
        <motion.section
          className="who modern-who"
          ref={whoRef}
          variants={fadeInVariant}
          initial="hidden"
          animate={whoInView ? "visible" : "hidden"}
        >
          <h2>Who Will Benefit Most</h2>
          <p>This tool is built for professionals who manage projects in the real world — not in theoretical dashboards.</p>
          <div className="who-cards">
            <div className="who-card">
              <span className="who-icon">👷</span>
              <h4>Project Manager</h4>
              <p>Tired of chasing site updates and struggling with scattered data.</p>
            </div>
            <div className="who-card">
              <span className="who-icon">🏗️</span>
              <h4>Civil Engineer</h4>
              <p>Struggling with reporting deadlines and client communication.</p>
            </div>
            <div className="who-card">
              <span className="who-icon">📋</span>
              <h4>Contractor</h4>
              <p>Needs better tracking for government projects and compliance.</p>
            </div>
            <div className="who-card">
              <span className="who-icon">🔧</span>
              <h4>Site Engineer</h4>
              <p>Balancing multiple tasks daily while managing field operations.</p>
            </div>
          </div>
          <div className="who-highlight">
            <h3>...this tool will feel like your secret weapon.</h3>
          </div>
        </motion.section>

        {/* See it in Action Section */}
        <motion.section
          id="action"
          className="see-action"
          ref={actionRef}
          variants={fadeInVariant}
          initial="hidden"
          animate={actionInView ? "visible" : "hidden"}
        >
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
        </motion.section>


        {/* Testimonials */}
        {/* <motion.div
          id="testimonials"
          className="testimonials-carousel-outer"
          ref={testimonialsRef}
          variants={fadeInVariant}
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
        >
          <TestimonialsCarousel />
        </motion.div> */}
 {/* PricingSection */}
 <motion.section
  id="pricing"
  className="pricing-section"
  ref={pricingRef}
  variants={fadeInVariant}
  initial="hidden"
  animate={pricingInView ? "visible" : "hidden"}
>
 <div className="PricingSection-outer">
          <PricingSection onSelectPlan={setSelectedPlan} />
        </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          id="get-tool"
          className="cta"
          ref={ctaRef}
          variants={fadeInVariant}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
        >
  <h2>Let Excel Do the Work — You Focus on the Build</h2>
  <p>I’ve spent 17 years managing construction projects — and I built this tool because I needed it myself.
Now I’m sharing it with professionals who want a smarter, simpler way to stay on top of every project.

No big learning curve. No bloated software.
Just a clean, powerful tool that helps you deliver.</p>
  {/* <div className="cta-buttons">
    <a href={require('./assets/PMC_Tools_Demo.zip')} download className="primary-btn">Download Demo</a>
    <button className="secondary-btn" onClick={() => setShowVideo(true)}>Watch 1-Min Demo</button>
  </div> */}
</motion.section>


        {/* Contact Section */}
        <motion.div
          className="contact-form-outer"
          id="contact"
          ref={contactRef}
          variants={fadeInVariant}
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
        >
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
        </motion.div>

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
