// Header.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';
import logo from '../assets/logo_footer.svg';

const sections = ['features', 'pricing', 'download', 'contact'];

const Header = ({ stickyThreshold = 150 }) => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('product');

  const handleScroll = useCallback(() => {
    setIsSticky(window.scrollY > stickyThreshold);

    const scrollPosition = window.scrollY + window.innerHeight / 3;

    const currentSection = sections.find(id => {
      const el = document.getElementById(id);
      if (!el) return false;
      return scrollPosition >= el.offsetTop;
    });

    if (currentSection && currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [stickyThreshold, activeSection]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return (
    <Navbar expand="lg" className={`main-navbar shadow-sm ${isSticky ? 'sticky-header' : ''}`}>
      <Container className="d-flex align-items-center justify-content-between flex-nowrap">
        <Navbar.Brand href="/" className="d-flex align-items-center navbar-logo flex-shrink-0">
          <img src={logo} alt="Logo" className="logo-img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="main-nav ms-auto">
            {sections.map(section => (
              <Nav.Link
                key={section}
                onClick={(e) => {
                  e.preventDefault();
                  const targetSection = section === 'download' ? 'pricing' : section;
                  navigate(`/${targetSection}`);
                }}
                className={activeSection === section ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                {section === 'pricing' ? 'Plans & Services' : section === 'download' ? 'Download' : section.charAt(0).toUpperCase() + section.slice(1)}
              </Nav.Link>
            ))}
            {/* Optional Search Icon */}
            {/* <span className="nav-search-icon"><i className="bi bi-search"></i></span> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  stickyThreshold: PropTypes.number
};

export default Header;
