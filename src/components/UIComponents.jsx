import DatePicker from "./DatePicker";
import Dropdown from "./Dropdown";
import TextInput from "./TextInput";

const UIComponents = ({ ui, onComponentSelect, onSubmit }) => {
  if (!ui || !ui.hasComponents) {
    return null;
  }

  const handleComponentSelect = (field, value) => {
    if (onComponentSelect) {
      onComponentSelect(field, value);
    }
  };

  const handleTextSubmit = (field, value) => {
    if (onSubmit) {
      onSubmit(field, value);
    }
  };

  const renderComponent = (field, component) => {
    switch (component.type) {
      case "datePicker":
        return (
          <DatePicker
            key={field}
            component={component}
            field={field}
            onSelect={handleComponentSelect}
          />
        );
      case "dropdown":
        return (
          <Dropdown
            key={field}
            component={component}
            field={field}
            onSelect={handleComponentSelect}
          />
        );
      case "textInput":
        return (
          <TextInput
            key={field}
            component={component}
            field={field}
            onSelect={handleComponentSelect}
            onSubmit={handleTextSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="ui-components-container">
      {Object.keys(ui)
        .filter((key) => key !== "hasComponents")
        .map((field) => renderComponent(field, ui[field]))}
    </div>
  );
};

export default UIComponents;

