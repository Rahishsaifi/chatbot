import { useState } from "react";

const Dropdown = ({ component, onSelect, field }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (value && onSelect) {
      onSelect(field, value);
    }
  };

  return (
    <div className="ui-component dropdown-component">
      <label className="ui-label">{component.label}</label>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="ui-dropdown"
        required={component.required}
      >
        <option value="">-- Select an option --</option>
        {component.options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {component.placeholder && (
        <small className="ui-hint">{component.placeholder}</small>
      )}
    </div>
  );
};

export default Dropdown;

