// i hvvae no idea what im doing
const cmds = []; // Commands array
let semicolons = 0; // Semicolon counter

// Event listener for handling input submissions
document.getElementById("inputForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    const inputField = document.getElementById("inputReader");
    const input = inputField.value.trim(); // Get the input value and trim spaces

    if (input) {
        // Check if the command matches any valid entry in the cmds array
        if (cmds.includes(input)) {
            // Process the command and update semicolons
            if (input === "return;") {
                semicolons += 1;
            } else if (cmds.includes("return;")) {
                // Adds 1 semicolon for a simple return statement
                semicolons += 1;
            } else if (cmds.includes("console.log(i need semicolons);")) {
                // Adds 3 semicolons for a console log statement
                semicolons += 3;
            } else if (cmds.includes("let semicolons = semicolons + 5;")) {
                // Adds 5 semicolons for using a variable assignment and addition
                semicolons += 5;
            } else if (cmds.includes("semicolons += 8;")) {
                // Adds 8 semicolons for shorthand addition
                semicolons += 8;
            } else if (cmds.includes("function giveMoney() {semicolons += 10;}")) {
                // Adds 12 semicolons for defining a function that modifies semicolons
                semicolons += 12;
            } else if (cmds.includes("if(money < 100000) {giveMoney();}")) {
                // Adds 15 semicolons for a conditional statement that calls a function
                semicolons += 15;
            } else if (cmds.includes("for(let i = 0; i < 10; i++) { semicolons += i; }")) {
                // Adds 20 semicolons for a for loop that iterates and updates semicolons
                semicolons += 20;
            } else if (cmds.includes("while(semicolons < 100) { semicolons += 5; }")) {
                // Adds 25 semicolons for a while loop that keeps adding until a condition is met
                semicolons += 25;
            } else if (cmds.includes("if(a > b) { return a; } else { return b; }")) {
                // Adds 18 semicolons for a conditional statement with an else clause
                semicolons += 18;
            } else if (cmds.includes("switch(x) { case 1: semicolons += 10; break; default: semicolons += 5; }")) {
                // Adds 22 semicolons for a switch statement with cases and a default
                semicolons += 22;
            } else if (cmds.includes("class SemicolonMaster { constructor() { this.semicolons = 50; } }")) {
                // Adds 30 semicolons for defining a class with a constructor
                semicolons += 30;
            }
        } else {
            // Command not recognized; return false and log an error
            console.error("Unknown command:", input);
            return false;
        }

        // Clear the input field
        inputField.value = "";

        // Update the display
        updateSemicolonsDisplay();
        console.log("Current semicolons:", semicolons);
    }
});

// Function to update semicolon display dynamically
function updateSemicolonsDisplay() {
    const display = document.getElementById("semicolonsDisplay");
    display.textContent = `Semicolons: ${semicolons}`;
}

cmds.push("return;");
cmds.push("console.log(i need semicolons);");
cmds.push("let semicolons = semicolons + 5;");
cmds.push("semicolons += 8;");
cmds.push("function giveMoney() {semicolons += 10;}");
cmds.push("if(money < 100000) {giveMoney();}");
cmds.push("for(let i = 0; i < 10; i++) { semicolons += i; }");
cmds.push("while(semicolons < 100) { semicolons += 5; }");
cmds.push("if(a > b) { return a; } else { return b; }");
cmds.push("switch(x) { case 1: semicolons += 10; break; default: semicolons += 5; }");
cmds.push("class SemicolonMaster { constructor() { this.semicolons = 50; } }");