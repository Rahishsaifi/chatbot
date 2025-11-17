import { useRef, useState, useEffect } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse, onRecordingChange, onMessageSend }) => {
  const inputRef = useRef();
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const handleFormSubmit = (e, text = null) => {
    if (e) e.preventDefault();
    const userMessage = text || inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Hide suggestions when user sends a message
    if (onMessageSend) onMessageSend();

    // Update chat history with the user's message
    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

    // Delay 600 ms before showing "Thinking..." and generating response
    setTimeout(() => {
      // Add a "Thinking" placeholder for the bot's response (dots will be animated)
      setChatHistory((history) => [...history, { role: "model", text: "Thinking" }]);

      // Call the function to generate the bot's response
      generateBotResponse([...chatHistory, { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }]);
    }, 600);
  };

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        inputRef.current.value = transcript;
        handleFormSubmit(null, transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        if (onRecordingChange) onRecordingChange(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
        if (onRecordingChange) onRecordingChange(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleSpeechClick = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      if (onRecordingChange) onRecordingChange(false);
    } else {
      recognition.start();
      setIsRecording(true);
      if (onRecordingChange) onRecordingChange(true);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="chat-form">
      <input ref={inputRef} placeholder="Message..." className="message-input" required />
      <button 
        type="button" 
        onClick={handleSpeechClick}
        className={`speech-button material-symbols-rounded ${isRecording ? 'recording' : ''}`}
        title={isRecording ? 'Stop recording' : 'Start voice input'}
      >
        {isRecording ? 'mic' : 'mic'}
      </button>
      <button type="submit" id="send-message" className="material-symbols-rounded">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
