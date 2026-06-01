const { validatePassword } = require('../../src/exercises/password/password.validator');

describe('Ejercicio 2 - Validación de contraseña', () => {
  test('valida una contraseña que cumple todas las reglas', () => {
    expect(validatePassword('ClaveSegura2026')).toEqual({
      hasMinLength: true,
      hasUppercase: true,
      hasNumber: true,
      isValid: true,
    });
  });

  test('detecta contraseña sin longitud mínima', () => {
    const result = validatePassword('Abc1');
    expect(result.hasMinLength).toBe(false);
    expect(result.isValid).toBe(false);
  });

  test('detecta contraseña sin mayúsculas', () => {
    const result = validatePassword('password123');
    expect(result.hasUppercase).toBe(false);
    expect(result.isValid).toBe(false);
  });

  test('detecta contraseña sin números', () => {
    const result = validatePassword('Password');
    expect(result.hasNumber).toBe(false);
    expect(result.isValid).toBe(false);
  });

  test('lanza error cuando no recibe texto', () => {
    expect(() => validatePassword(12345678)).toThrow(TypeError);
  });
});
