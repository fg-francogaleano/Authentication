const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3}$/i; // Email válido
const blankSpace = /\s/; // Espacio en blanco

export default function validations(values) {
  const errors = {};

  if (values.email && blankSpace.test(values.email)) {
    errors.email = "It should not be a blank space";
  }
  if (!values.email) {
    errors.email = "Enter a email";
  }
  if (values.email && !regexEmail.test(values.email)) {
    errors.email = "It must be a valid email";
  }

  return errors;
}
