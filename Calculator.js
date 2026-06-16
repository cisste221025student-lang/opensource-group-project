const readline = require("readline");
const chalk = require("chalk");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ================= HISTORY =================
let history = [];

// Load history from file if it exists
if (fs.existsSync("history.json")) {
    try {
        history = JSON.parse(
            fs.readFileSync("history.json", "utf8")
        );
    } catch (error) {
        console.log(chalk.red("Error loading history file."));
        history = [];
    }
}

// Save history to file
function saveHistory() {
    fs.writeFileSync(
        "history.json",
        JSON.stringify(history, null, 2)
    );
}

// ================= OPERATIONS =================
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

// Member 2 Contribution
// Improved Multiplication Function
function multiply(x, y) {
    const result = x * y;

    console.log(
        chalk.blue(`\nℹ️ Multiplying ${x} × ${y}`)
    );

    return result;
}

// Member 2 Contribution
// Improved Division Function with Enhanced Zero Check
function divide(x, y) {

    if (y === 0) {

        console.log(
            chalk.red(
                "\n❌ Error: Division by zero is not allowed."
            )
        );

        return "Undefined";
    }

    const result = x / y;

    console.log(
        chalk.blue(`\nℹ️ Dividing ${x} ÷ ${y}`)
    );

    return result;
}

// ================= UI HELPER =================
function drawLine(text, colorizer = chalk.white) {
    let paddedText = text;

    if (paddedText.length > 36) {
        paddedText = paddedText.substring(0, 33) + "...";
    } else {
        paddedText = paddedText.padEnd(36, " ");
    }

    console.log(
        chalk.cyan("║ ") +
        colorizer(paddedText) +
        chalk.cyan(" ║")
    );
}

// ================= MENU =================
function showMenu() {
    console.clear();

    console.log(chalk.cyan("╔" + "═".repeat(38) + "╗"));
    console.log(
        chalk.cyan("║") +
        chalk.bold.yellow("        🧮 SIMPLE CALCULATOR          ") +
        chalk.cyan("║")
    );
    console.log(chalk.cyan("╠" + "═".repeat(38) + "╣"));

    drawLine("Select an operation:", chalk.green);
    drawLine("");

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

// ================= HISTORY FUNCTIONS =================
function showHistory() {
    console.log(chalk.cyan("\n========== CALCULATION HISTORY ==========\n"));

    if (history.length === 0) {
        console.log(chalk.yellow("No calculations yet.\n"));
    } else {
        history.forEach((item, index) => {
            console.log(
                chalk.green(`${index + 1}. ${item}`)
            );
        });
        console.log();
    }
}

function clearHistory() {
    history = [];
    saveHistory();

    console.log(
        chalk.green("\n✅ History cleared successfully!\n")
    );
}

// ================= MAIN LOOP =================
function askQuestion() {
    showMenu();

    rl.question(
        chalk.magenta("👉 Enter your choice (1-7): "),
        (choice) => {

            // Exit
            if (choice === "7") {
                console.log(
                    chalk.yellow(
                        "\n👋 Thanks for using the calculator!"
                    )
                );
                rl.close();
                return;
            }

            // View History
            if (choice === "5") {
                showHistory();

                return rl.question(
                    chalk.magenta(
                        "Press Enter to return to menu..."
                    ),
                    () => askQuestion()
                );
            }

            // Clear History
            if (choice === "6") {
                clearHistory();
                return setTimeout(
                    askQuestion,
                    1200
                );
            }

            // Invalid Choice
            if (!["1", "2", "3", "4"].includes(choice)) {
                console.log(
                    chalk.red(
                        "\n❌ Invalid choice. Try again.\n"
                    )
                );

                return setTimeout(
                    askQuestion,
                    1200
                );
            }

            // Number Inputs
            rl.question(
                chalk.yellow("Enter first number: "),
                (num1) => {

                    rl.question(
                        chalk.yellow("Enter second number: "),
                        (num2) => {

                            num1 = parseFloat(num1);
                            num2 = parseFloat(num2);

                            if (
                                isNaN(num1) ||
                                isNaN(num2)
                            ) {
                                console.log(
                                    chalk.red(
                                        "\n❌ Please enter valid numbers.\n"
                                    )
                                );

                                return setTimeout(
                                    askQuestion,
                                    1200
                                );
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

                            const output =
                                `${num1} ${symbol} ${num2} = ${result}`;

                            history.push(output);

                            // Save to history.json
                            saveHistory();

                            console.log(
                                chalk.cyan(
                                    "\n╔" +
                                    "═".repeat(38) +
                                    "╗"
                                )
                            );

                            drawLine(
                                `Result: ${output}`,
                                chalk.green.bold
                            );

                            console.log(
                                chalk.cyan(
                                    "╚" +
                                    "═".repeat(38) +
                                    "╝\n"
                                )
                            );

                            rl.question(
                                chalk.magenta(
                                    "Do you want to continue? (y/n): "
                                ),
                                (answer) => {

                                    if (
                                        answer.toLowerCase() === "y"
                                    ) {
                                        askQuestion();
                                    } else {
                                        console.log(
                                            chalk.yellow(
                                                "\n👋 Goodbye!"
                                            )
                                        );

                                        rl.close();
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

askQuestion();
