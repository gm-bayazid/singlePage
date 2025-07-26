import React, { useRef, useState, useEffect } from "react";
import "./TestimonialsCarousel.css";

const testimonials = [
  {
    name: "Engr. Borhan Uddin, PMP",
    role: "Senior Planning Engineer",
    company: "Max Group",
    location: "Dhaka",
    quote:
      "Excel Project Monitor is exactly what construction managers need. The Excel-based approach makes it accessible to everyone, while the tracking features rival expensive software solutions.",
    avatar: "https://ui-avatars.com/api/?name=Borhan+Uddin&background=0D8ABC&color=fff",
  },
  {
    name: "Engr. Rezaul Karim",
    role: "Head of Construction",
    company: "Abul Hossain Group",
    location: "Dhaka",
    quote:
      "This tool could revolutionize how small to medium construction companies manage their projects. Simple, effective, and affordable - exactly what the industry needs.",
    avatar: "https://ui-avatars.com/api/?name=Rezaul+Karim&background=673AB7&color=fff",
  },
  {
    name: "Engr. Sohel Ahmed",
    role: "Project Management Expert",
    company: "Construction Tech Institute",
    location: "Dhaka",
    quote:
      "Having reviewed countless project management tools, this Excel-based solution stands out for its practicality. It addresses real pain points without overwhelming complexity.",
    avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=009688&color=fff",
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director",
    company: "Urban Development Partners",
    location: "Gazipur",
    quote:
      "The dashboard gives instant visibility into project progress without the complexity of expensive software. This is the kind of tool that gets adopted quickly by field teams.",
    avatar: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=F57C00&color=fff",
  },
  {
    name: "David Kim",
    role: "Construction Technology Advisor",
    company: "SmartBuild Consulting",
    location: "Dhaka",
    quote:
      "This tool addresses real pain points I've seen in construction project management. The Excel integration is brilliant - it leverages what teams already know and use daily.",
    avatar: "https://ui-avatars.com/api/?name=David+Kim&background=3F51B5&color=fff",
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
      <h2>What Our Partners Say</h2>
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
