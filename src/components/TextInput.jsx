import { useState } from "react";

const TextInput = ({ component, onSelect, field, onSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (value.trim() && onSelect) {
      onSelect(field, value.trim());
      // Auto-submit after selection
      setTimeout(() => {
        if (onSubmit) {
          onSubmit(field, value.trim());
        }
      }, 100);
    }
  };

  return (
    <div className="ui-component text-input-component">
      <label className="ui-label">{component.label}</label>
      <form onSubmit={handleSubmit} className="ui-text-form">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={component.placeholder}
          className="ui-text-input"
          required={component.required}
        />
        <button type="submit" className="ui-submit-btn">
          <span className="material-symbols-rounded">send</span>
        </button>
      </form>
      {component.placeholder && !value && (
        <small className="ui-hint">{component.placeholder}</small>
      )}
    </div>
  );
};

export default TextInput;

