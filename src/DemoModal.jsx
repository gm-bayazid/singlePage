import React, { useState } from 'react';
import './DemoModal.css';

const DemoModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    setStatus('');

          try {
        const response = await fetch('send-email.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: email,
            name: 'Demo User'
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Unknown error');
        }

        setStatus(data.message || 'Demo link sent to your email!');
      setEmail('');

      // Auto-close after 5 seconds
      setTimeout(() => {
        onClose();
        setStatus('');
      }, 5000);

    } catch (err) {
      console.error('Error sending email:', err);
      setError('Failed to send demo link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setStatus('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="demo-modal-overlay" onClick={handleClose}>
      <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="demo-modal-close-btn" onClick={handleClose}>×</button>
        
        <div className="demo-modal-header">
          <h2>Download Demo</h2>
          <p>Enter your email to receive the demo file link</p>
        </div>

        <form onSubmit={handleSubmit} className="demo-modal-form">
          <div className="demo-form-group">
            <label htmlFor="demo-email">Email Address</label>
            <input
              type="email"
              id="demo-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          {error && <div className="demo-error">{error}</div>}

          {status && (
            <div className="demo-success">
              <div>{status}</div>
              <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#888' }}>
                Please check your inbox and spam folder
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="demo-submit-btn"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Demo Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemoModal;
