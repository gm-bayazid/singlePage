import React, { useRef, useState, useEffect } from "react";
import "./TestimonialsCarousel.css";

const testimonials = [
  {
    name: "Rezaul Karim",
    role: "Project Manager",
    company: "Mid-size Contractor",
    location: "Dhaka",
    quote:
      "Before this, weekly reporting took us hours. Now it’s automated and easy to share with clients.",
    avatar: "https://ui-avatars.com/api/?name=Rezaul+Karim&background=0D8ABC&color=fff",
  },
  {
    name: "Sadia Rahman",
    role: "Site Engineer",
    company: "Industrial EPC",
    location: "Chattogram",
    quote:
      "We don’t use Primavera or MS Project, so this tool filled the gap perfectly.",
    avatar: "https://ui-avatars.com/api/?name=Sadia+Rahman&background=673AB7&color=fff",
  },
  {
    name: "Tanvir Hasan",
    role: "Senior Planner",
    company: "Large Construction Firm",
    location: "Sylhet",
    quote:
      "This tool cut our reporting time by 60%. It’s exactly what we needed for field-level clarity.",
    avatar: "https://ui-avatars.com/api/?name=Tanvir+Hasan&background=009688&color=fff",
  },
  {
    name: "Farhana Chowdhury",
    role: "Operations Head",
    company: "Tech Infra Solutions",
    location: "Rajshahi",
    quote:
      "The best part? My site engineers actually use it without complaint.",
    avatar: "https://ui-avatars.com/api/?name=Farhana+Chowdhury&background=F57C00&color=fff",
  },
  {
    name: "Zahidul Alam",
    role: "Project Consultant",
    company: "SME Developer",
    location: "Khulna",
    quote:
      "We replaced 3 apps with this Excel tool. It’s clean, smart, and battle-tested.",
    avatar: "https://ui-avatars.com/api/?name=Zahidul+Alam&background=3F51B5&color=fff",
  }
];

const TestimonialsCarousel = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 2; // adjust based on screen size if needed

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardWidth = scrollRef.current.firstChild.offsetWidth + 20; // 20 is the gap
      const nextIndex =
        direction === "left"
          ? Math.max(activeIndex - 1, 0)
          : Math.min(activeIndex + 1, testimonials.length - visibleCount);

      scrollRef.current.scrollTo({
        left: nextIndex * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(nextIndex);
    }
  };

  const handleDotClick = (index) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild.offsetWidth + 20;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, firstChild } = scrollRef.current;
        const cardWidth = firstChild.offsetWidth + 20;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(index);
      }
    };
    const container = scrollRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="testimonials-carousel-section dark-theme">
      <h2>What Engineers Are Saying</h2>
      <div className="carousel-wrapper">
        <button className="nav-arrow left" onClick={() => scroll("left")} aria-label="Previous">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="carousel-container no-scrollbar" ref={scrollRef}>
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card dark">
              <img src={t.avatar} alt={t.name} className="avatar" />
              <p className="quote">"{t.quote}"</p>
              <p className="name">{t.name}</p>
              <p className="meta">{t.role}, {t.company} ({t.location})</p>
            </div>
          ))}
        </div>
        <button className="nav-arrow right" onClick={() => scroll("right")} aria-label="Next">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="carousel-dots">
        {testimonials.slice(0, testimonials.length - visibleCount + 1).map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === activeIndex ? "active" : ""}`}
            onClick={() => handleDotClick(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
