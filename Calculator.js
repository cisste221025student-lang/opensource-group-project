const readline = require("readline");
const chalk = require("chalk");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let history = [];

// ================= OPERATIONS =================
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) {
    if (y === 0) return chalk.red("Error: Cannot divide by zero");
    return x / y;
}

// ================= UI HELPER =================
function drawLine(text, colorizer = chalk.white) {
    let paddedText = text;

    if (paddedText.length > 36) {
        paddedText = paddedText.substring(0, 33) + "...";
    } else {
        paddedText = paddedText.padEnd(36, " ");
    }

    console.log(chalk.cyan("║ ") + colorizer(paddedText) + chalk.cyan(" ║"));
}

// ================= MENU =================
function showMenu() {
    console.clear();

    console.log(chalk.cyan("╔" + "═".repeat(38) + "╗"));
    console.log(chalk.cyan("║") + chalk.bold.yellow("        🧮 SIMPLE CALCULATOR          ") + chalk.cyan("║"));
    console.log(chalk.cyan("╠" + "═".repeat(38) + "╣"));

    drawLine("Select an operation:", chalk.green);
    drawLine("", chalk.white);

    drawLine("  1 ➜ Addition (+)", chalk.blue);
    drawLine("  2 ➜ Subtraction (-)", chalk.blue);
    drawLine("  3 ➜ Multiplication (×)", chalk.blue);
    drawLine("  4 ➜ Division (÷)", chalk.blue);
    drawLine("  5 ➜ View History", chalk.blue);
    drawLine("  6 ➜ Clear History", chalk.blue);
    drawLine("  7 ➜ Exit", chalk.blue);

    if (history.length > 0) {
        console.log(chalk.cyan("╟" + "─".repeat(38) + "╢"));
        drawLine("--- RECENT HISTORY ---", chalk.cyan);

        history.slice(-5).forEach(item => {
            drawLine(item, chalk.gray);
        });
    }

    console.log(chalk.cyan("╚" + "═".repeat(38) + "╝\n"));
}

// ================= HISTORY =================
function showHistory() {
    console.log(chalk.cyan("\n========== CALCULATION HISTORY ==========\n"));

    if (history.length === 0) {
        console.log(chalk.yellow("No calculations yet.\n"));
    } else {
        history.forEach((item, index) => {
            console.log(chalk.green(`${index + 1}. ${item}`));
        });
        console.log();
    }
}

function clearHistory() {
    history = [];
    console.log(chalk.green("\n✅ History cleared successfully!\n"));
}

// ================= MAIN LOOP =================
function askQuestion() {
    showMenu();

    rl.question(chalk.magenta("👉 Enter your choice (1-7): "), (choice) => {

        // EXIT
        if (choice === "7") {
            console.log(chalk.yellow("\n👋 Thanks for using the calculator!"));
            rl.close();
            return;
        }

        // VIEW HISTORY
        if (choice === "5") {
            showHistory();
            return rl.question(
                chalk.magenta("Press Enter to return to menu..."),
                askQuestion
            );
        }

        // CLEAR HISTORY
        if (choice === "6") {
            clearHistory();
            return setTimeout(askQuestion, 1200);
        }

        // INVALID INPUT
        if (!["1", "2", "3", "4"].includes(choice)) {
            console.log(chalk.red("\n❌ Invalid choice. Try again.\n"));
            return setTimeout(askQuestion, 1200);
        }

        // INPUT NUMBERS
        rl.question(chalk.yellow("Enter first number: "), (num1) => {
            rl.question(chalk.yellow("Enter second number: "), (num2) => {

                num1 = parseFloat(num1);
                num2 = parseFloat(num2);

                if (isNaN(num1) || isNaN(num2)) {
                    console.log(chalk.red("\n❌ Please enter valid numbers.\n"));
                    return setTimeout(askQuestion, 1200);
                }

                let result;
                let symbol;

                switch (choice) {
                    case "1": result = add(num1, num2); symbol = "+"; break;
                    case "2": result = subtract(num1, num2); symbol = "-"; break;
                    case "3": result = multiply(num1, num2); symbol = "×"; break;
                    case "4": result = divide(num1, num2); symbol = "÷"; break;
                }

                const output = `${num1} ${symbol} ${num2} = ${result}`;
                history.push(output);

                // RESULT BOX
                console.log(chalk.cyan("\n╔" + "═".repeat(38) + "╗"));
                drawLine(`Result: ${output}`, chalk.green.bold);
                console.log(chalk.cyan("╚" + "═".repeat(38) + "╝\n"));

                rl.question(
                    chalk.magenta("Do you want to continue? (y/n): "),
                    (answer) => {
                        if (answer.toLowerCase() === "y") {
                            askQuestion();
                        } else {
                            console.log(chalk.yellow("\n👋 Goodbye!"));
                            rl.close();
                        }
                    }
                );
            });
        });
    });
}

askQuestion();