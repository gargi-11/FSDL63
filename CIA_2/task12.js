function celsiusToFahrenheit() {
    let celsius = parseFloat(prompt("Enter temperature in Celsius:"));
    let fahrenheit = (celsius * 9/5) + 32;
    alert("Temperature in Fahrenheit: " + fahrenheit.toFixed(2));
}

celsiusToFahrenheit();
