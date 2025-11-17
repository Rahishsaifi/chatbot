import { useState, useEffect } from "react";

const CircularSlider = ({ onModuleChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const modules = [
    { id: "leaves", icon: "📅", label: "Leaves", color: "#091098" },
    { id: "holidays", icon: "🎉", label: "Holidays", color: "#0a1bb8" },
    { id: "attendance", icon: "⏰", label: "Attendance", color: "#060770" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % modules.length);
    }, 4000); // Auto-rotate every 4 seconds

    return () => clearInterval(interval);
  }, [modules.length]);

  useEffect(() => {
    onModuleChange(modules[activeIndex].id);
  }, [activeIndex, onModuleChange]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="circular-slider-container">
      <div className="circular-slider-wrapper">
        <div className="slider-circle-track"></div>
        
        {modules.map((module, index) => {
          const angle = (index * 360) / modules.length - 90;
          const isActive = index === activeIndex;
          const radius = 80;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <div
              key={module.id}
              className={`slider-dot ${isActive ? "active" : ""}`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                backgroundColor: isActive ? module.color : "rgba(255, 255, 255, 0.3)",
              }}
              onClick={() => handleClick(index)}
            >
              {isActive && <div className="slider-dot-pulse"></div>}
            </div>
          );
        })}
        
        <div className="avatar-container">
          <div className="avatar-glow"></div>
          <div className="avatar-glow-ring"></div>
          <div className="avatar-circle">
            <img src="/avatar.png" alt="AI Avatar" className="avatar-image" />
            <div className="avatar-shine"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularSlider;

