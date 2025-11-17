const ChatMessage = ({ chat }) => {
  const isThinking = chat.text === "Thinking";
  
  return (
    !chat.hideInChat && (
      <div 
        className={`message ${chat.role === "model" ? "bot" : "user"}-message ${chat.isError ? "error" : ""}`}
        data-thinking={isThinking}
      >
        {chat.role === "model" && <img src="/icon.png" alt="Avatar" className="message-avatar" />}
        <p className="message-text">
          {chat.text}
          {isThinking && <span className="typing-dots"><span>.</span><span>.</span><span>.</span></span>}
        </p>
      </div>
    )
  );
};

export default ChatMessage;
