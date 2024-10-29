const EmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3}$/i; // Email válido
const blankSpaceRegex = /^\S*$/; // Espacio en blanco
const minLengthRegex = /^.{8,}$/;
const numberRegex = /[0-9]/;
const symbolRegex = /[!@#$%^&*]/;
const uppercaseRegex = /^(?=.*[A-Z]).*$/;

export default function validations(values) {
  const errors = {};
  /*EMAIL */
  if (values.email && !blankSpaceRegex.test(values.email)) {
    errors.email = "It should not be a blank space";
  }
  if (!values.email) {
    errors.email = "Enter a email";
  }
  if (values.email && !EmailRegex.test(values.email)) {
    errors.email = "It must be a valid email";
  }

  /*PASSWORD */
  if (values.password && !blankSpaceRegex.test(values.password)) {
    errors.password = "It should not be a blank space";
  }
  if (!values.password) {
    errors.password = "Enter a password";
  }
  if (values.password && !minLengthRegex.test(values.password)) {
    errors.password = "Min. 8 characters.";
  }
  if (values.password && !numberRegex.test(values.password)) {
    errors.password = "Must include 1 number";
  }
  if (values.password && !symbolRegex.test(values.password)) {
    errors.password = "Must include 1 symbol (ej. @, #, $).";
  }
  if (values.password && !uppercaseRegex.test(values.password)) {
    errors.password = "Must include 1 symbol uppercase.";
  }

  /*REPEAT PASSWORD */
  if (!values.repeatPassword) {
    errors.repeatPassword = "Enter a password";
  }
  if (!values.repeatPassword && !values.repeatPassword === values.password) {
    errors.repeatPassword = "passwords do not match";
  }

  return errors;
}
