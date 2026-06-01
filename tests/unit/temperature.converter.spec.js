const {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} = require('../../src/exercises/temperature/temperature.converter');

describe('Ejercicio 1 - Conversor de temperatura', () => {
  test.each([
    [0, 32],
    [100, 212],
    [-40, -40],
  ])('convierte %s°C a %s°F', (celsius, expectedFahrenheit) => {
    expect(celsiusToFahrenheit(celsius)).toBe(expectedFahrenheit);
  });

  test.each([
    [32, 0],
    [212, 100],
    [-40, -40],
  ])('convierte %s°F a %s°C', (fahrenheit, expectedCelsius) => {
    expect(fahrenheitToCelsius(fahrenheit)).toBe(expectedCelsius);
  });

  test('lanza error cuando la entrada no es numérica', () => {
    expect(() => celsiusToFahrenheit('20')).toThrow(TypeError);
    expect(() => fahrenheitToCelsius(undefined)).toThrow(TypeError);
  });
});
