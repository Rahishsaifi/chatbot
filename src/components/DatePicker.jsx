import { useState } from "react";

const DatePicker = ({ component, onSelect, field }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date && onSelect) {
      onSelect(field, date);
    }
  };

  return (
    <div className="ui-component date-picker-component">
      <label className="ui-label">{component.label}</label>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="ui-date-input"
        required={component.required}
        min={new Date().toISOString().split('T')[0]} // Prevent past dates for future dates
      />
      {component.placeholder && (
        <small className="ui-hint">{component.placeholder}</small>
      )}
    </div>
  );
};

export default DatePicker;

