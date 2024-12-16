const allCmds = {
    "return;": 1, // Default command
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

    // New complex commands
    "try { JSON.parse('{invalid: json}'); } catch(e) { semicolons += 20; }": 75,
    "async function fetchSemicolons() { let res = await fetch('api/semicolons'); semicolons += 25; }": 100,
    "document.querySelectorAll('.semicolon').forEach(el => semicolons += 5);": 120,
    "const calculate = (x, y) => x * y; semicolons += calculate(5, 6);": 150,
    "new Promise(resolve => setTimeout(() => { semicolons += 50; resolve(); }, 1000));": 200,
    "let map = new Map(); map.set('key', 100); semicolons += map.get('key');": 250,
};

// Starting commands (only "return;" is available by default)
const cmds = ["return;"];

// Shop commands and their costs
const shopCmds = Object.keys(allCmds).filter(cmd => !cmds.includes(cmd));
const shopCmdsCosts = shopCmds.map(cmd => `buy: ${cmd} <span style='color:#0fe300;'>${allCmds[cmd]} semicolons</span>`);

let semicolons = 0;
let currentDirectory = "main";

// Prevents pasting commands
document.getElementById("inputReader").addEventListener('paste', (event) => { event.preventDefault(); });

// Event listener for handling form submissions (entering a command)
document.getElementById("inputForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const inputField = document.getElementById("inputReader");
    const input = inputField.value.trim();

    if (input) {
        inputField.value = ""; // Clear input field
        if (input === "dir") {
            ownedCmds(currentDirectory);
        } else if (input === "cd shop") {
            changeDirectory("shop");
        } else if (input === "cd main") {
            changeDirectory("main");
        } else if (input === "cd credits") {
            changeDirectory("credits");
        } else if (currentDirectory === "main" && cmds.includes(input)) {
            processCommand(input);
        } else if (currentDirectory === "shop" && shopCmds[input] !== undefined) {
            const bought = processCommandShop(input);
            if (bought === "poor") return; // Prevent logging invalid purchases
        } else if (input === "debug") {
            semicolons += 10000; // Debug command
            console.log("Debug executed. Current semicolons:", semicolons);
            updateSemicolonsDisplay();
        } else {
            console.error("Unknown command:", input);
            return;
        }

        // Update command history for valid commands
        if (currentDirectory !== "credits") {
            document.getElementById("cmdHistory").innerHTML += input + "<br>";
        }

        // Hide "dir" output after executing another command
        if (input !== "dir") {
            document.getElementById("ownedCmdsWrap").innerHTML = "";
        }
    }
});

// Function to handle shop purchases
function processCommandShop(command) {
    const cmdText = command.split("buy: ")[1];
    const cost = allCmds[cmdText];

    if (semicolons >= cost) {
        semicolons -= cost;
        cmds.push(cmdText); // Add to available commands
        const shopIndex = shopCmds.indexOf(cmdText);
        shopCmds.splice(shopIndex, 1); // Remove from shop
        shopCmdsCosts.splice(shopIndex, 1); // Remove from shop costs
    } else {
        document.getElementById("cmdHistory").innerHTML += "<span style='color:red'>Not Enough Semicolons</span> <br>";
        return "poor";
    }

    console.log("Command purchased:", cmdText);
    updateSemicolonsDisplay();
}

// Function to process main directory commands
function processCommand(command) {
    if (allCmds[command]) {
        semicolons += allCmds[command];
        console.log(`Executed: ${command}. Semicolons rewarded: ${allCmds[command]}`);
    } else {
        console.error("Command not recognized:", command);
    }

    updateSemicolonsDisplay();
}

// Function to update the semicolon display dynamically
function updateSemicolonsDisplay() {
    const display = document.getElementById("semicolonsDisplay");
    display.textContent = `Semicolons: ${semicolons}`;
}

// Function to display owned commands
function ownedCmds(directory) {
    let dir;

    if (directory === "main") {
        dir = cmds.concat(["cd shop", "cd credits"]);
    } else if (directory === "shop") {
        dir = shopCmdsCosts.concat(["cd main", "cd credits"]);
    } else if (directory === "credits") {
        dir = ["cd main", "cd shop"];
    } else {
        console.error(directory, "is an invalid directory");
        return;
    }

    const output = dir.join("<br>");
    document.getElementById("ownedCmdsWrap").innerHTML = `Owned Commands for ${currentDirectory}:<br>${output}`;
}

// Function to change directories
function changeDirectory(directory) {
    if (currentDirectory === "credits") {
        document.getElementById("cmdHistory").innerHTML = ""; // Clear credits display
    }

    currentDirectory = directory;
    if (directory !== "main") {
    document.getElementById("directoryTitle").innerHTML = `main/${directory}/`;
    } else {
        document.getElementById("directoryTitle").innerHTML = `main/`;
    }

    if (directory === "credits") {
        document.getElementById("cmdHistory").innerHTML = "Made by Airplane, Max Verstappen, and G I R A F F E";
        console.log("Credits displayed.");
    } else {
        console.log(`You are now in the ${directory} directory. Type 'dir' to see available commands.`);
    }
}
