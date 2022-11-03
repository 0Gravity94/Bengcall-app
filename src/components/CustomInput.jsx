import React from "react";
import { components } from "react-select";

function CustomInput(props) {
  return (
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      maxLength={props.maxLength}
      minLength={props.minLength}
      className={props.className}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
}

function CustomOption(props) {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
}

function CustomSelect(props) {
  return (
    <div>
      <components.Option {...props}>
        <input type="radio" onChange={() => null} />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
}

export { CustomInput, CustomOption, CustomSelect };
