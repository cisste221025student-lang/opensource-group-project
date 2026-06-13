const calculator = require("./calculator");

test("Addition should work correctly", () => {
    expect(calculator.add(5, 3)).toBe(8);
});


test("Subtraction should work correctly", () => {
    expect(calculator.subtract(10, 4)).toBe(6);
});


test("Multiplication should work correctly", () => {
    expect(calculator.multiply(5, 2)).toBe(10);
});


test("Division should work correctly", () => {
    expect(calculator.divide(10, 2)).toBe(5);
});


test("Power function should work correctly", () => {
    expect(calculator.power(2, 3)).toBe(8);
});


test("Square root should work correctly", () => {
    expect(calculator.sqrt(25)).toBe(5);
});
