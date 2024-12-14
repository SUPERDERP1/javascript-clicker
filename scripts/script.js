const cmds = [
    "return;",
    "console.log(i need semicolons);",
    "let semicolons = semicolons + 5;",
    "semicolons += 8;",
    "function giveMoney() {semicolons += 10;}",
    "if(money < 100000) {giveMoney();}",
    "for(let i = 0; i < 10; i++) { semicolons += i; }",
    "while(semicolons < 100) { semicolons += 5; }",
    "if(a > b) { return a; } else { return b; }",
    "switch(x) { case 1: semicolons += 10; break; default: semicolons += 5; }",
    "class SemicolonMaster { constructor() { this.semicolons = 50; } }"
]; // Predefined commands
let semicolons = 0; // Counter to track the number of semicolons

// Event listener for handling form submissions
document.getElementById("inputForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const inputField = document.getElementById("inputReader"); // Input field for user commands
    const input = inputField.value.trim(); // Get the input value and trim extra spaces

    if (input) { // Ensure input is not empty
        // Check if the command exists in the predefined cmds array
        if (cmds.includes(input)) {
            // Process the recognized command and update semicolons
            if (input === "return;") {
                // Adds 1 semicolon for a simple return statement
                semicolons += 1;
            } else if (input === "console.log(i need semicolons);") {
                // Adds 3 semicolons for a console log statement
                semicolons += 3;
            } else if (input === "let semicolons = semicolons + 5;") {
                // Adds 5 semicolons for using a variable assignment and addition
                semicolons += 5;
            } else if (input === "semicolons += 8;") {
                // Adds 8 semicolons for shorthand addition
                semicolons += 8;
            } else if (input === "function giveMoney() {semicolons += 10;}") {
                // Adds 12 semicolons for defining a function that modifies semicolons
                semicolons += 12;
            } else if (input === "if(money < 100000) {giveMoney();}") {
                // Adds 15 semicolons for a conditional statement that calls a function
                semicolons += 15;
            } else if (input === "for(let i = 0; i < 10; i++) { semicolons += i; }") {
                // Adds 20 semicolons for a for loop that iterates and updates semicolons
                semicolons += 20;
            } else if (input === "while(semicolons < 100) { semicolons += 5; }") {
                // Adds 25 semicolons for a while loop that keeps adding until a condition is met
                semicolons += 25;
            } else if (input === "if(a > b) { return a; } else { return b; }") {
                // Adds 18 semicolons for a conditional statement with an else clause
                semicolons += 18;
            } else if (input === "switch(x) { case 1: semicolons += 10; break; default: semicolons += 5; }") {
                // Adds 22 semicolons for a switch statement with cases and a default
                semicolons += 22;
            } else if (input === "class SemicolonMaster { constructor() { this.semicolons = 50; } }") {
                // Adds 30 semicolons for defining a class with a constructor
                semicolons += 30;
            }
        } else {
            // Command not recognized; log an error and return false
            console.error("Unknown command:", input);
            return false;
        }

        // Clear the input field
        inputField.value = "";

        // Update the semicolon display
        updateSemicolonsDisplay();
        console.log("Current semicolons:", semicolons);
    }
});

// Function to update semicolon display dynamically
function updateSemicolonsDisplay() {
    const display = document.getElementById("semicolonsDisplay");
    display.textContent = `Semicolons: ${semicolons}`;
}
