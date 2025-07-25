import React from 'react';
import './PricingSection.css';

const plans = [
  {
    title: 'Free Demo',
    //price: 'Tk. 0',
    features: [
      'Limited Features',
      'View-only Mode',
      'Downloadable Demo File',
      'No Support Included'
    ],
    action: {
      label: 'Download Demo',
      link: '/PMC_Tools_Demo.zip'
    }
  },
  {
    title: 'Done-for-You Setup',
    //price: 'Tk. 100k+ / project',
    features: [
      'We Set Up the Tool for You',
      'Custom Dashboard Config.',
      'Excel File + Lifetime License',
      '3x Training Videos Included',
      'Email Support (14 Days)'
    ],
    action: {
      label: 'Book Setup Now',
      link: '#contact'
    },
    popular: true // Mark as most popular
  },
  {
    title: 'Pro Subscription',
    //price: 'Tk. 250 / month',
    features: [
      'Live Support via WhatsApp/Email',
      'Priority Feature Requests',
      'Monthly Report Generation',
      'All Tool Updates Included',
      'Unlimited Projects'
    ],
    action: {
      label: 'Start Subscription',
      link: '#contact'
    }
  }
];

export default function PricingSection({ onSelectPlan }) {
  return (
    <section className="pricing-section">
      <h2 className="pricing-title">Plans & Services</h2>
      <p className="pricing-subtitle">Whether you're trying or scaling — pick the level of support that works for you.</p>

      <div className="pricing-grid">
        {plans.map((plan, i) => (
          <div className={`pricing-card${plan.popular ? ' popular' : ''}`} key={i}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <h3 className="plan-title">{plan.title}</h3>
            <div className="plan-price">{plan.price}</div>
            <ul className="plan-features">
              {plan.features.map((f, j) => (
                <li key={j} className="feature-item">{f}</li>
              ))}
            </ul>
            {plan.title === 'Free Demo' ? (
              <a
                href={plan.action.link}
                className="plan-button"
                download
              >
                {plan.action.label}
              </a>
            ) : (
              <button
                type="button"
                className="plan-button"
                onClick={() => {
                  if (onSelectPlan) onSelectPlan(plan.title);
                  const contact = document.getElementById('contact');
                  if (contact) contact.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {plan.action.label}
              </button>
            )}
          </div>
        ))}
      </div>

      {/*<p className="money-back">💯 30-Day Satisfaction Guarantee</p>*/}

      <div className="mobile-sticky-cta">
        <a href="#get-tool">Download Free Demo</a>
        <a href="#contact">Book Call</a>
      </div>

      {/* <div className="pricing-footer-notes">
        <p>📍 Built in Bangladesh for global project teams</p>
        <p>🔒 Secure checkout powered by Stripe</p>
      </div> */}
    </section>
  );
}
