import { useEffect, useState } from "react";
import CircularSlider from "./CircularSlider";

const IntroScreen = ({ onStartChat }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [showZoom, setShowZoom] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [activeModule, setActiveModule] = useState("leaves");
  const [isScrolling, setIsScrolling] = useState(false);
  const [userName] = useState("Kunal"); // In future, this can come from props or context

  useEffect(() => {
    // Show greeting first
    setTimeout(() => {
      setShowGreeting(true);
    }, 100);
    
    // After 5 seconds, start zoom effect
    setTimeout(() => {
      setShowGreeting(false);
      setShowZoom(true);
    }, 5000);
    
    // After zoom animation (1 second), show content
    setTimeout(() => {
      setShowZoom(false);
      setShowContent(true);
    }, 6000);
  }, []);

  const handleStart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onStartChat();
    }, 600);
  };

  const handleModuleChange = (moduleId) => {
    if (moduleId !== activeModule) {
      setIsScrolling(true);
      setTimeout(() => {
        setActiveModule(moduleId);
        setTimeout(() => {
          setIsScrolling(false);
        }, 100);
      }, 400);
    }
  };

  const moduleContent = {
    leaves: {
      title: "Leave Management",
      subtitle: "Manage your time off requests"
    },
    holidays: {
      title: "Holiday Calendar",
      subtitle: "View company holidays"
    },
    attendance: {
      title: "Attendance",
      subtitle: "Track your work hours"
    }
  };

  const currentContent = moduleContent[activeModule];

  return (
    <div className={`intro-screen ${isAnimating ? "fade-out" : ""} ${showContent ? "dark-background" : "white-background"}`}>
      <div className="intro-background-gradient"></div>
      
      {/* Greeting Screen */}
      {showGreeting && (
        <div className="greeting-screen">
          <div className="greeting-content">
            <img src="/IndiGo_logo_2x.avif" alt="IndiGo Logo" className="indigo-logo" />
            <div className="greeting-text">
              <h1 className="greeting-name">Hi <span className="user-name">{userName}</span></h1>
              <p className="greeting-welcome">welcome to HR ChatBot</p>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Effect */}
      {showZoom && (
        <div className="zoom-effect">
          <div className="zoom-circle"></div>
        </div>
      )}
      
      {/* Main Intro Content */}
      {showContent && (
        <div className={`intro-content show`}>
          <div className="intro-header">
            <div className="intro-badge">
              <span>HR Assistant</span>
            </div>
          </div>

          <div className="intro-main">
            <CircularSlider onModuleChange={handleModuleChange} />
            
            <div className={`intro-text-wrapper ${isScrolling ? "scrolling" : ""}`}>
              <div className="intro-text-content">
                <h1 className="intro-title">
                  {currentContent.title}
                </h1>
                <p className="intro-subtitle">
                  {currentContent.subtitle}
                </p>
              </div>
            </div>
          </div>
          
          <div className="intro-footer">
            <button onClick={handleStart} className="start-chat-btn">
              <span>Get Started</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroScreen;

