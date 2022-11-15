import React from "react";

function Button(props) {
  return (
    <button
      id={props.id}
      className={props.className}
      onClick={props.onClick}
      type={props.type}
    >
      {props.label}
    </button>
  );
}

export default Button;
