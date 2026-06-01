const DEFAULT_MIN_LENGTH = 8;

function validatePassword(password, options = {}) {
  if (typeof password !== 'string') {
    throw new TypeError('La contraseña debe ser un texto');
  }

  const minLength = options.minLength || DEFAULT_MIN_LENGTH;
  const cleanPassword = password.trim();

  const result = {
    hasMinLength: cleanPassword.length >= minLength,
    hasUppercase: /[A-Z]/.test(cleanPassword),
    hasNumber: /\d/.test(cleanPassword),
  };

  return {
    ...result,
    isValid: result.hasMinLength && result.hasUppercase && result.hasNumber,
  };
}

module.exports = {
  validatePassword,
};
