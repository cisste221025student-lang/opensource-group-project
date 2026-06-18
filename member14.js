// Member 14 Assignment - Add Basic Tests Using Jest & Help Command
// 1. Jest Test File (calculator.test.js)

const Calculator = require('./calculator');

describe('Calculator Tests', () => {
    const calc = new Calculator();

    test('Addition', () => {
        expect(calc.add(2, 3)).toBe(5);
    });

    test('Subtraction', () => {
        expect(calc.subtract(5, 3)).toBe(2);
    });

    test('Multiplication', () => {
        expect(calc.multiply(2, 4)).toBe(8);
    });

    test('Division', () => {
        expect(calc.divide(8, 2)).toBe(4);
    });

    test('Power', () => {
        expect(calc.power(2, 3)).toBe(8);
    });

    test('Square Root', () => {
        expect(calc.squareRoot(25)).toBe(5);
    });
});

// 2. Help / Info Section

function showHelp() {
    console.log(`
=== CALCULATOR HELP ===
Available Operations:
1. Add (+)
2. Subtract (-)
3. Multiply (*)
4. Divide (/)
5. Power (^)
6. Square Root (√)
7. Percentage (%)
8. Modulo (%)

Other Features:
- Calculation History
- Save/Load History
- Clear History
- Colored Output
- Continuous Mode

Developed by Group Members.
========================
`);
}

// 3. Install Jest
// npm install --save-dev jest
