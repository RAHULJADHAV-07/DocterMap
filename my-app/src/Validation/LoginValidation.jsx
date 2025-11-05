

export function validateLoginField(name, value) {
  let error = '';
  if (name === 'email') {
    if (!value) {
      error = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      error = 'Email is invalid';
    }
  }
  if (name === 'password') {
    if (!value) {
      error = 'Password is required';
    } else if (value.length < 8) {
      error = 'Password must be at least 8 characters';
    }
  }
  return error;
}

 