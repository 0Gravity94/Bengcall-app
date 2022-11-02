import React from "react";

function Button(props) {
	return (
		<div
			id={props.id}
			className={props.className}
			onClick={props.onClick}
		>
			{props.label}
		</div>
	);
}

export default Button;
