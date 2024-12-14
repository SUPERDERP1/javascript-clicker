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
            } else if (input === "console.log(i need semicolons);") {
                semicolons += 3;
            } else if (input === "let semicolons = semicolons + 5;") {
                semicolons += 5;
            } else if (input === "semicolons += 8;") {
                semicolons += 8;
            } else if (input === "function giveMoney() {semicolons += 10;}") {
                semicolons += 12;
            } else if (input === "if(money < 100000) {giveMoney();}") {
                semicolons += 15;
            } else if (input === "for(let i = 0; i < 10; i++) { semicolons += i; }") {
                semicolons += 20;
            } else if (input === "while(semicolons < 100) { semicolons += 5; }") {
                semicolons += 25;
            } else if (input === "if(a > b) { return a; } else { return b; }") {
                semicolons += 18;
            } else if (input === "switch(x) { case 1: semicolons += 10; break; default: semicolons += 5; }") {
                semicolons += 22;
            } else if (input === "class SemicolonMaster { constructor() { this.semicolons = 50; } }") {
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
