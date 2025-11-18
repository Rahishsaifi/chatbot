import UIComponents from "./UIComponents";

const ChatMessage = ({ chat, onUIComponentSelect, onUISubmit }) => {
  const isThinking = chat.text === "Thinking";
  
  return (
    !chat.hideInChat && (
      <div 
        className={`message ${chat.role === "model" ? "bot" : "user"}-message ${chat.isError ? "error" : ""}`}
        data-thinking={isThinking}
      >
        {chat.role === "model" ? (
          <>
            <img src="/icon.png" alt="Avatar" className="message-avatar" />
            <div className="message-content">
              <p className="message-text">
                {chat.text}
                {isThinking && <span className="typing-dots"><span>.</span><span>.</span><span>.</span></span>}
              </p>
              {chat.ui && chat.ui.hasComponents && (
                <UIComponents 
                  ui={chat.ui} 
                  onComponentSelect={onUIComponentSelect}
                  onSubmit={onUISubmit}
                />
              )}
            </div>
          </>
        ) : (
          <div className="message-content">
            <p className="message-text">
              {chat.text}
            </p>
          </div>
        )}
      </div>
    )
  );
};

export default ChatMessage;
