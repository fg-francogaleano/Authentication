import React, { useState, useRef, useContext } from "react";
import { Context } from "../../Context/Context";
import { TextField, InputAdornment } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

function InputFieldPassword({
  id,
  type,
  label,
  values,
  index,
  handleChange,
  handleBlur,
  shrinkLabel,
  handleShrinkLabel,
  touched,
  errors,
}) {
  const [styleIcon, setStyleIcon] = useState(false);

  const theme = useTheme();

  const inputRef = useRef(null);

  const handleFocus = (e, values, index) => {
    if (!values[type]) {
      setStyleIcon(false);
      handleShrinkLabel(index, false);
    }
    setStyleIcon(true);
    handleShrinkLabel(index, true);
    // setShrinkLabel(true);
  };

  const handleBlurWithShrink = (e, values, index) => {
    if (!values[type]) {
      handleShrinkLabel(index, false);
      // setShrinkLabel(false);
    }
    setStyleIcon(false);
  };

  const [showPassword, setShowPassword] = useState(type);
  // Función para manejar el clic en el icono de visibilidad y evitar que pierda el foco
  const handleClickShowPassword = (e) => {
    e.preventDefault(); // Evita que el campo pierda el foco

    const input = inputRef.current;
    const cursorPosition = input.selectionStart; // Guardar la posición del cursor

    // Alternar la visibilidad de la contraseña
    setShowPassword((prev) => (prev === type ? "text" : type));

    // Restablecer la posición del cursor
    setTimeout(() => {
      input.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  return (
    <TextField
      inputRef={inputRef}
      variant="standard"
      type={showPassword}
      id={id}
      name={id}
      label={label}
      value={values[id]}
      autoComplete="off"
      fullWidth
      helperText={touched[id] && errors[id]}
      error={Boolean(touched[id] && errors[id])}
      onChange={handleChange}
      onFocus={(e) => {
        handleFocus(e, values, index);
      }}
      onBlur={(e) => {
        handleBlur(e);
        handleBlurWithShrink(e, values, index);
      }}
      InputLabelProps={{
        shrink: shrinkLabel,
        style: { paddingLeft: "30px" },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IoLockClosedOutline
              color={
                touched[id] && errors[id]
                  ? theme.palette.error.main
                  : styleIcon
                  ? theme.palette.primary.main
                  : "black"
              }
            />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position="end"
            onClick={handleClickShowPassword} // Maneja el clic para cambiar la visibilidad sin perder foco
          >
            <>
              {showPassword === "password" ? (
                <FiEyeOff
                  color={
                    touched[id] && errors[id]
                      ? theme.palette.error.main
                      : styleIcon
                      ? theme.palette.primary.main
                      : "black"
                  }
                  cursor="pointer"
                  onMouseDown={(e) => e.preventDefault()} // Evita que el mouseDown cause pérdida de foco
                />
              ) : (
                <FiEye
                  color={
                    touched[id] && errors[id]
                      ? theme.palette.error.main
                      : styleIcon
                      ? theme.palette.primary.main
                      : "black"
                  }
                  cursor="pointer"
                  onMouseDown={(e) => e.preventDefault()} // Evita que el mouseDown cause pérdida de foco
                />
              )}
            </>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default InputFieldPassword;
