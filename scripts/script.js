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
]; // Main directory commands

const shopCmds = [
    "buy: console.log(i need semicolons);",
    "buy: megaLoop;",
    "buy: ultimateClass;"
]; // Commands available in the shop

let semicolons = 0; // Counter to track the number of semicolons
let currentDirectory = "main"; // Track the current directory

// Event listener for handling form submissions
document.getElementById("inputForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const inputField = document.getElementById("inputReader"); // Input field for user commands
    const input = inputField.value.trim(); // Get the input value and trim extra spaces

    if (input) { // Ensure input is not empty
        if (input === "dir") {
            // Display commands based on the current directory
            if (currentDirectory === "main") {
                console.log("Available commands in main directory:", cmds.concat(["cd shop"]));
            } else if (currentDirectory === "shop") {
                console.log("Available commands in shop:", shopCmds.concat(["cd main"]));
            }
        } else if (input === "cd shop") {
            // Change to the shop directory
            currentDirectory = "shop";
            console.log("You are now in the shop directory. Type 'dir' to see available commands.");
        } else if (input === "cd main") {
            // Change to the main directory
            currentDirectory = "main";
            console.log("You are now in the main directory. Type 'dir' to see available commands.");
        } else if (currentDirectory === "main" && cmds.includes(input)) {
            // Process commands in the main directory
            processCommand(input);
        } else if (currentDirectory === "shop" && shopCmds.includes(input)) {
            // Process commands in the shop directory
            console.log(`Executed shop command: ${input}`);
        } else {
            // Invalid command for the current directory
            console.error("Unknown command:", input);
            return false;
        }

        // Clear the input field
        inputField.value = "";
    }
});

// Function to process recognized commands in the main directory
function processCommand(command) {
    if (command === "return;") {
        semicolons += 1;
    } else if (command === "console.log(i need semicolons);") {
        semicolons += 3;
    } else if (command === "let semicolons = semicolons + 5;") {
        semicolons += 5;
    } else if (command === "semicolons += 8;") {
        semicolons += 8;
    } else if (command === "function giveMoney() {semicolons += 10;}") {
        semicolons += 12;
    } else if (command === "if(money < 100000) {giveMoney();}") {
        semicolons += 15;
    } else if (command === "for(let i = 0; i < 10; i++) { semicolons += i; }") {
        semicolons += 20;
    } else if (command === "while(semicolons < 100) { semicolons += 5; }") {
        semicolons += 25;
    } else if (command === "if(a > b) { return a; } else { return b; }") {
        semicolons += 18;
    } else if (command === "switch(x) { case 1: semicolons += 10; break; default: semicolons += 5; }") {
        semicolons += 22;
    } else if (command === "class SemicolonMaster { constructor() { this.semicolons = 50; } }") {
        semicolons += 30;
    }
    console.log("Command executed. Current semicolons:", semicolons);
}

// Function to update semicolon display dynamically
function updateSemicolonsDisplay() {
    const display = document.getElementById("semicolonsDisplay");
    display.textContent = `Semicolons: ${semicolons}`;
}
