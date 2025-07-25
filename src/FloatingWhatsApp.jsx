import React from 'react';
import './FloatingWhatsApp.css';
import whatsappIcon from './assets/whatsapp.png'; // ✅ direct import

// Safe analytics tracking function
const safeTrackWhatsAppClick = () => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'floating_whatsapp',
      });
    } else {
      // Fallback logging for development
      if (process.env.NODE_ENV === 'development') {
        console.log('WhatsApp Click: floating_whatsapp');
      }
    }
  } catch (error) {
    // Silently fail if analytics tracking fails
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics tracking failed:', error);
    }
  }
};

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    safeTrackWhatsAppClick();
  };

  return (
    <a
      href="https://wa.me/8801712925342"
      className="floating-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={handleWhatsAppClick}
    >
      <div className="whatsapp-bubble">
        <span className="whatsapp-text">
          Need Help? <b>Chat with us</b>
        </span>
      </div>
      <img
        src={whatsappIcon}
        alt="Chat with MilestoneBD on WhatsApp for project management consultation"
        className="whatsapp-icon"
      />
    </a>
  );
}
