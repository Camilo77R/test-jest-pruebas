function validateNumber(value, label) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new TypeError(`El valor de ${label} debe ser un número válido`);
  }
}

function celsiusToFahrenheit(celsius) {
  validateNumber(celsius, 'celsius');
  return (celsius * 9) / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  validateNumber(fahrenheit, 'fahrenheit');
  return ((fahrenheit - 32) * 5) / 9;
}

module.exports = {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
};
