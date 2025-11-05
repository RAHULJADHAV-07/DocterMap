

export function validateRegisterForm(values) {
  const errors = {};

 
  if (!values.name || values.name.trim() === "") {
    errors.name = "Name is required.";
  }

 
  if (!values.email || values.email.trim() === "") {
    errors.email = "Email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (
    values.password.length < 8 ||
    !/^[A-Z]/.test(values.password) ||
    !/[0-9]/.test(values.password) ||
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(values.password)
  ) {
    errors.password =
      "Password must start with a capital letter, be at least 8 characters, and include a number and special character.";
  }

  if (values.confirmPassword !== undefined && values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

