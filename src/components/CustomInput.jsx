import React from "react";

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

export default CustomInput;
