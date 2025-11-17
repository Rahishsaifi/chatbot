import { useEffect, useRef, useState } from "react";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import IntroScreen from "./components/IntroScreen";
import { companyInfo } from "./companyInfo";

const App = () => {
  const chatBodyRef = useRef();
  const [showChatbot, setShowChatbot] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);

  const generateBotResponse = async (history) => {
    // Helper function to update chat history
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [...prev.filter((msg) => msg.text !== "Thinking"), { role: "model", text, isError }]);
    };

    // Format chat history for API request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      // Make the API call to get the bot's response
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error.message || "Something went wrong!");

      // Clean and update chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      // Update chat history with the error message
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    // Auto-scroll whenever chat history updates
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleToggleChatbot = () => {
    if (!showChatbot) {
      // Opening chatbot - show intro screen first
      setShowChatbot(true);
      setShowIntro(true);
      setShowChat(false);
      setShowSuggestions(false);
      setSuggestionsVisible(false);
    } else {
      // Closing chatbot - reset everything
      setShowChatbot(false);
      setShowIntro(false);
      setShowChat(false);
      setShowSuggestions(false);
      setSuggestionsVisible(false);
    }
  };

  const handleStartChat = () => {
    setShowIntro(false);
    setTimeout(() => {
      setShowChat(true);
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    setSuggestionsVisible(false);
    // Add user message
    setChatHistory((history) => [...history, { role: "user", text: suggestion }]);
    
    // Delay before showing "Thinking..." and generating response
    setTimeout(() => {
      setChatHistory((history) => [...history, { role: "model", text: "Thinking" }]);
      generateBotResponse([...chatHistory, { role: "user", text: `Using the details provided above, please address this query: ${suggestion}` }]);
    }, 600);
  };

  const toggleSuggestions = () => {
    if (suggestionsVisible) {
      setSuggestionsVisible(false);
      setTimeout(() => setShowSuggestions(false), 300);
    } else {
      setShowSuggestions(true);
      setTimeout(() => setSuggestionsVisible(true), 10);
    }
  };

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      {/* Landing Page - Indigo Airlines Style */}
      <div className="landing-page">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <img src="/IndiGo_logo_2x.avif" alt="IndiGo" className="h-10 w-auto" />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen pt-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 w-full">
          {/* Sky Background with Clouds */}
          <div className="absolute inset-0 overflow-hidden w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-100 to-indigo-50 w-full"></div>
            {/* Cloud decorations */}
            <div className="absolute top-20 left-10 w-32 h-20 bg-white/30 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-40 h-24 bg-white/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-40 left-1/4 w-36 h-22 bg-white/30 rounded-full blur-xl"></div>
          </div>

          <div className="relative w-full px-4 sm:px-6 lg:px-8 py-20">
            {/* Hero Content */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-indigo-dark mb-6">
                Fly with IndiGo
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
                Experience the joy of flying with India's most preferred airline
              </p>
            </div>

            {/* Chatbot Features Section */}
            <div className="mt-20 w-full">
              <div className="w-full px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-dark mb-12 text-center">
                  ChatBot Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                  {/* Azure AI Foundry */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-primary rounded-lg mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-indigo-dark mb-2">Azure AI Foundry</h3>
                    <p className="text-gray-600 text-sm">Powered by Microsoft Azure AI Foundry for advanced AI capabilities</p>
                  </div>

                  {/* Multi Agent */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-primary rounded-lg mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-indigo-dark mb-2">Multi Agent</h3>
                    <p className="text-gray-600 text-sm">Intelligent multi-agent system for complex task handling</p>
                  </div>

                  {/* Integration with SF */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-primary rounded-lg mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-indigo-dark mb-2">Integration with SF</h3>
                    <p className="text-gray-600 text-sm">Seamless integration with SF for data synchronization</p>
                  </div>

                  {/* Update over Teams and Email */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-primary rounded-lg mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-indigo-dark mb-2">Teams & Email Updates</h3>
                    <p className="text-gray-600 text-sm">Real-time updates via Microsoft Teams and Email notifications</p>
                  </div>
                </div>
              </div>
            </div>

                    
          </div>
        </section>
      </div>
      
      {/* Chatbot Toggle Button - UNTOUCHED */}
      <button onClick={handleToggleChatbot} id="chatbot-toggler">
        {!showChatbot ? (
          <img src="/icon.png" alt="Avatar" className="toggler-avatar" />
        ) : (
          <span className="material-symbols-rounded">close</span>
        )}
      </button>

      <div className="chatbot-popup">
        {showIntro && !showChat && (
          <IntroScreen onStartChat={handleStartChat} />
        )}
        
        {showChat && (
          <>
            {/* Chatbot Header */}
              <div className="chat-header">
                <div className="header-info">
                  <img src="/icon.png" alt="Avatar" className="header-avatar" />
                  <div className="header-text-wrapper">
                    <h2 className="logo-text">HR Bot</h2>
                    <p className="user-name-header">Kunal</p>
                  </div>
                </div>
                <button onClick={handleToggleChatbot} className="material-symbols-rounded">
                  keyboard_arrow_down
                </button>
              </div>

              {/* Chatbot Body */}
              <div ref={chatBodyRef} className="chat-body">
                <div className="message bot-message">
                  <img src="/icon.png" alt="Avatar" className="message-avatar" />
                  <p className="message-text">
                    Hi Kunal 👋 <br /> I'm here to help you with Leaves, Holidays & Attendance queries. How can I assist you today?
                  </p>
                </div>


              {/* Render the chat history dynamically */}
              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </div>

            {/* Voice Recording Indicator */}
            {isRecording && (
              <div className="recording-indicator">
                <div className="recording-pulse"></div>
                <div className="recording-content">
                  <div className="recording-icon">
                    <span className="material-symbols-rounded">mic</span>
                  </div>
                  <p className="recording-text">Listening...</p>
                  <div className="recording-waves">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            {/* Chatbot Footer */}
            <div className="chat-footer">
              <div className="chat-footer-wrapper">
                <button 
                  className="suggestions-toggle-btn"
                  onClick={toggleSuggestions}
                  title={suggestionsVisible ? "Hide suggestions" : "Show suggestions"}
                >
                  <span className="material-symbols-rounded">
                    {suggestionsVisible ? "close" : "lightbulb"}
                  </span>
                </button>
                
                {/* Floating Suggestion Panel */}
                {showSuggestions && (
                  <div className={`suggestion-panel ${suggestionsVisible ? 'visible' : 'hidden'}`}>
                    <div className="suggestion-panel-header">
                      <h3>Quick Suggestions</h3>
                    </div>
                    <div className="suggestion-chips">
                      <button 
                        className="suggestion-chip"
                        onClick={() => handleSuggestionClick("My Holidays")}
                      >
                        My Holidays
                      </button>
                      <button 
                        className="suggestion-chip"
                        onClick={() => handleSuggestionClick("Leave policies")}
                      >
                        Leave policies
                      </button>
                      <button 
                        className="suggestion-chip"
                        onClick={() => handleSuggestionClick("Attendance regularisation")}
                      >
                        Attendance regularisation
                      </button>
                    </div>
                  </div>
                )}

                <ChatForm 
                  chatHistory={chatHistory} 
                  setChatHistory={setChatHistory} 
                  generateBotResponse={generateBotResponse}
                  onRecordingChange={setIsRecording}
                  onMessageSend={() => {
                    setShowSuggestions(false);
                    setSuggestionsVisible(false);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
