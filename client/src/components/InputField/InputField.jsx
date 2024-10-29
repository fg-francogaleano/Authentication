import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CiMail } from "react-icons/ci";

function InputField({
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

  const handleFocus = (e, values, index) => {
    if (!values[type]) {
      handleShrinkLabel(index, false);
    } else {
    }
    setStyleIcon(true);
    handleShrinkLabel(index, true);
  };

  const handleBlurWithShrink = (e, values, index) => {
    if (!values[type]) {
      handleShrinkLabel(index, false);
    } else {
      setStyleIcon(false);
    }
    setStyleIcon(false);
  };

  return (
    <TextField
      variant="standard"
      type={type}
      id={id}
      name={type}
      label={label}
      value={values[type]}
      autoComplete="off"
      fullWidth
      helperText={touched[type] && errors[type]}
      error={Boolean(touched[type] && errors[type])}
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
            <CiMail
              color={
                touched[type] && errors[type]
                  ? theme.palette.error.main
                  : styleIcon
                  ? theme.palette.primary.main
                  : "black"
              }
            />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default InputField;
