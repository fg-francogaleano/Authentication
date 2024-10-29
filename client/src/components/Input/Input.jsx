import React from "react";
import InputField from "../InputField/InputField";
import InputFieldPassword from "../InputFieldPassword/InputFieldPassword";

function Input(props) {
  return props.type === "password" ? (
    <InputFieldPassword {...props} />
  ) : (
    <InputField {...props} />
  );
}

export default Input;
