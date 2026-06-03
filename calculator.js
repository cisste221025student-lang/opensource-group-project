const readline = require("readline");
const chalk = require("chalk");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return chalk.red("Error: Cannot divide by zero");
    }
    return x / y;
}

// 🎨 UI Menu
function showMenu() {
    console.clear();

    console.log(chalk.cyan("===================================="));
    console.log(chalk.bold.yellow("        🧮 SIMPLE CALCULATOR        "));
    console.log(chalk.cyan("====================================\n"));

    console.log(chalk.green("Select an operation:\n"));

    console.log(chalk.blue("  1 ➜ Addition (+)"));
    console.log(chalk.blue("  2 ➜ Subtraction (-)"));
    console.log(chalk.blue("  3 ➜ Multiplication (×)"));
    console.log(chalk.blue("  4 ➜ Division (÷)\n"));
}

function askQuestion() {
    showMenu();

    rl.question(chalk.magenta("👉 Enter your choice (1-4): "), (choice) => {

        if (!["1", "2", "3", "4"].includes(choice)) {
            console.log(chalk.red("\n❌ Invalid choice. Try again.\n"));
            return askQuestion();
        }

        rl.question(chalk.yellow("Enter first number: "), (num1) => {
            rl.question(chalk.yellow("Enter second number: "), (num2) => {

                num1 = parseFloat(num1);
                num2 = parseFloat(num2);

                if (isNaN(num1) || isNaN(num2)) {
                    console.log(chalk.red("\n❌ Please enter valid numbers.\n"));
                    return askQuestion();
                }

                let result;
                let symbol;

                switch (choice) {
                    case "1":
                        result = add(num1, num2);
                        symbol = "+";
                        break;
                    case "2":
                        result = subtract(num1, num2);
                        symbol = "-";
                        break;
                    case "3":
                        result = multiply(num1, num2);
                        symbol = "×";
                        break;
                    case "4":
                        result = divide(num1, num2);
                        symbol = "÷";
                        break;
                }

                console.log(chalk.cyan("\n===================================="));
                console.log(chalk.green.bold(`Result: ${num1} ${symbol} ${num2} = ${result}`));
                console.log(chalk.cyan("====================================\n"));

                rl.question(chalk.magenta("Do you want to continue? (y/n): "), (answer) => {

                    if (answer.toLowerCase() === "y") {
                        askQuestion();
                    } else {
                        console.log(chalk.yellow("\n👋 Thanks for using the calculator!"));
                        rl.close();
                    }
                });
            });
        });
    });
}

askQuestion();