import React from "react";

export default function VideoModal({ onClose }) {
  return (
    <div className="video-modal" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <video controls autoPlay style={{ width: "100%", borderRadius: "12px" }}>
          <source src="/Whats Going On Full.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}