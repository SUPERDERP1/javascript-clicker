// Define the main commands and their costs
const allCmds = {
    "console.log('i need semicolons');": 10,
    "let semicolons = semicolons + 5;": 15,
    "semicolons += 8;": 20,
    "function giveMoney() {semicolons += 10;}": 25,
    "if(money < 100000) {giveMoney();}": 30,
    "for(let i = 0; i < 10; i++) { semicolons += i; }": 35,
    "while(semicolons < 100) { semicolons += 5; }": 40,
    "if(a > b) { return a; } else { return b; }": 45,
    "switch(x) { case 1: semicolons += 10; break; default: semicolons += 5; }": 50,
    "class SemicolonMaster { constructor() { this.semicolons = 50; } }": 60,
};

// Populate shop commands and costs dynamically
const shopCmds = Object.keys(allCmds).map(cmd => `buy: ${cmd}`);
const shopCmdsCosts = Object.entries(allCmds).map(
    ([cmd, cost]) => `buy: ${cmd} <span style='color:#0fe300;'>${cost} semicolons</span>`
);

// Main commands array dynamically derived from `allCmds`
const cmds = Object.keys(allCmds);

// Initialize variables
let semicolons = 0;
let currentDirectory = "main";

// Prevent pasting commands
document.getElementById("inputReader").addEventListener("paste", (event) => {
    event.preventDefault();
});

// Event listener for handling form submissions (entering a command)
document.getElementById("inputForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const inputField = document.getElementById("inputReader"); // Input field for user commands
    const input = inputField.value.trim(); // Get the input value and trim extra spaces

    if (input) {
        inputField.value = ""; // Clear the input field
    }

    if (input) {
        if (input === "dir") {
            ownedCmds(currentDirectory); // Display commands based on the current directory
        } else if (input === "cd shop") {
            // Change to the shop directory
            if (currentDirectory === "credits") {
                document.getElementById("cmdHistory").innerHTML = "";
            }
            currentDirectory = "shop";
            document.getElementById("directoryTitle").innerHTML = "main/shop/";
            console.log("You are now in the shop directory. Type 'dir' to see available commands.");
        } else if (input === "cd main") {
            // Change to the main directory
            if (currentDirectory === "credits") {
                document.getElementById("cmdHistory").innerHTML = "";
            }
            currentDirectory = "main";
            document.getElementById("directoryTitle").innerHTML = "main/";
            console.log("You are now in the main directory. Type 'dir' to see available commands.");
        } else if (input === "cd credits") {
            // Change to the credits directory
            currentDirectory = "credits";
            document.getElementById("directoryTitle").innerHTML = "main/credits/";
            document.getElementById("cmdHistory").innerHTML =
                "Made by Airplane, Max Verstappen, and G I R A F F E";
            console.log("Made by Airplane, Max Verstappen, and G I R A F F E");
        } else if (currentDirectory === "main" && cmds.includes(input)) {
            processCommand(input); // Process commands in the main directory
        } else if (currentDirectory === "shop" && shopCmds.includes(input)) {
            const bought = processCommandShop(input); // Process shop commands
            if (bought === "poor") {
                return; // Prevent command history update for insufficient funds
            }
            console.log(`Executed shop command: ${input}`);
        } else if (input === "debug") {
            semicolons += 10000; // Debug command for testing
            console.log("Command executed. Current semicolons:", semicolons);
            updateSemicolonsDisplay();
        } else {
            console.error("Unknown command:", input);
            return false;
        }
        // Update command history for valid commands
        if (currentDirectory !== "credits") {
            document.getElementById("cmdHistory").innerHTML += input + "<br>";
        }
        // Hide the command list after executing another command
        if (input !== "dir") {
            document.getElementById("ownedCmdsWrap").innerHTML = "";
        }
    }
});

// Function to process commands in the main directory
function processCommand(command) {
    if (allCmds[command]) {
        semicolons += allCmds[command]; // Add semicolons based on command value
        console.log(`Command executed: ${command}. Current semicolons: ${semicolons}`);
        updateSemicolonsDisplay();
    } else {
        console.error("Command not recognized"); // Fallback for unlisted commands
    }
}

// Generalized function to handle shop purchases
function buyCmdShop(command, cost) {
    if (semicolons >= cost) {
        semicolons -= cost;
        const textCmd = command.split("buy: ")[1];
        cmds.push(textCmd); // Add the purchased command to the main command list
        shopCmds.splice(shopCmds.indexOf(command), 1); // Remove from shop
        shopCmdsCosts.splice(shopCmdsCosts.indexOf(command), 1); // Remove cost display
        console.log(`Purchased and unlocked command: ${textCmd}`);
        updateSemicolonsDisplay();
    } else {
        document.getElementById("cmdHistory").innerHTML +=
            "<span style='color:red'>Not Enough Semicolons</span> <br>";
        return "poor";
    }
}

// Function to process recognized commands in the shop directory
function processCommandShop(command) {
    const textCmd = command.split("buy: ")[1];
    const cost = allCmds[textCmd];
    if (cost !== undefined) {
        return buyCmdShop(command, cost); // Use the generalized buy function
    } else {
        console.error("Unknown shop command:", command);
        return false;
    }
}

// Function to update semicolon display dynamically
function updateSemicolonsDisplay() {
    const display = document.getElementById("semicolonsDisplay");
    display.textContent = `Semicolons: ${semicolons}`;
}

// Function to display owned commands based on the current directory
function ownedCmds(directory) {
    let dir;

    // Get the command list for the directory
    if (directory === "main") {
        dir = cmds.concat(["cd shop", "cd credits"]);
        console.log("Available commands in main directory:", dir);
    } else if (directory === "shop") {
        dir = shopCmdsCosts.concat(["cd main", "cd credits"]);
        console.log("Available commands in shop:", dir);
    } else if (directory === "credits") {
        dir = ["cd main", "cd shop"];
    } else {
        console.error(directory, " is an invalid directory");
        return;
    }

    // Define output as a line break-separated list of the elements of `dir`
    let output = "";
    for (let i = 0; i < dir.length; i++) {
        output += dir[i] + "<br>";
    }

    // Display the output list and the title for owned commands
    document.getElementById("ownedCmdsWrap").innerHTML =
        "Owned Commands for " + currentDirectory + ":<br>" + output;
}
