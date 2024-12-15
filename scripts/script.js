const cmds = [
    "return;",
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
document.getElementById("inputReader").addEventListener('paste',(event) => {event.preventDefault();});
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

    // Clear the input field
    inputField.value = "";
    
    if (input) { // Ensure input is not empty
        if (input === "dir") {
            // Display commands based on the current directory
            if (currentDirectory === "main") {
                console.log("Available commands in main directory:", cmds.concat(["cd shop"]));
            } else if (currentDirectory === "shop") {
                console.log("Available commands in shop:", shopCmds.concat(["cd main"]));
            }
            ownedCmds(currentDirectory);
        } else if (input === "cd shop") {
            // Change to the shop directory
            if (currentDirectory === "credits") {document.getElementById("cmdHistory").innerHTML = "";}
            currentDirectory = "shop";
            document.getElementById("directoryTitle").innerHTML = "shop/";
            console.log("You are now in the shop directory. Type 'dir' to see available commands.");
            
        } else if (input === "cd main") {
            // Change to the main directory
            if (currentDirectory === "credits") {document.getElementById("cmdHistory").innerHTML = "";}
            currentDirectory = "main";
            document.getElementById("directoryTitle").innerHTML = "main/";
            console.log("You are now in the main directory. Type 'dir' to see available commands.");
        } else if (input === "cd credits"){
            currentDirectory = "credits";
            document.getElementById("directoryTitle").innerHTML = "credits/";
            document.getElementById("cmdHistory").innerHTML = "Made by Airplane, Max Verstappen, and G I R A F F E";
            console.log("Made by Airplane, Max Verstappen, and G I R A F F E");
        
        } else if (currentDirectory === "main" && cmds.includes(input)) {
            // Process commands in the main directory
            processCommand(input);
        } else if (currentDirectory === "shop" && shopCmds.includes(input)) {
            // Process commands in the shop directory
            processCommandShop(input);
            console.log(`Executed shop command: ${input}`);
        } else {
            // Invalid command for the current directory
            console.error("Unknown command:", input);
            return false;
        }
        // Update the cmd history for valid cmds
        if (currentDirectory !== "credits") {
            document.getElementById("cmdHistory").innerHTML += input + "<br>";
        }
        if (input !== "dir") {
            document.getElementById("ownedCmdsWrap").innerHTML = "";
        }
    }
});

// Function to process recognized commands in the main directory
function processCommandShop(command) {
    if (command === "buy: console.log(i need semicolons);") {
        if (semicolons >= 10) {
            semicolons -= 10;
            cmds.push("console.log(i need semicolons);");
            shopCmds.splice(0, 1);
            
        } else {
            document.getElementById("cmdHistory").innerHTML += "<span style='color:red'>Not Enough Semicolons</span> <br>";
        }
    } else if (command === "buy: megaLoop;") {
        if (semicolons >= 25) {
            semicolons -= 25;
            cmds.push("megaLoop;");
            shopCmds.splice(1, 1);
            
        } else {
            document.getElementById("cmdHistory").innerHTML += "<span style='color:red'>Not Enough Semicolons</span> <br>";
        }
    } else if (command === "buy: ultimateClass;") {
        if (semicolons >= 100) {
            semicolons -= 100;
            cmds.push("ultimateClass;");
            shopCmds.splice(2, 1);
            
        } else {
            document.getElementById("cmdHistory").innerHTML += "<span style='color:red'>Not Enough Semicolons</span> <br>";
        }
    }
    console.log("Command executed. Current semicolons:", semicolons);
    updateSemicolonsDisplay();
    
}
// shop command function
function processCommand(command) {
    if (command === "return;") {
        semicolons += 1;
    } else if (command === "console.log(i need semicolons);") {
        semicolons += 3;
    } else if (command === "megaLoop;") {
        semicolons += 10;
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
    } else if (command === "ultimateClass;") {
        semicolons += 50;
    } else {
        console.error("command not recognized");
        return;
    }
    console.log("Command executed. Current semicolons:", semicolons);
    updateSemicolonsDisplay();
}
    
// Function to update semicolon display dynamically
function updateSemicolonsDisplay() {
    const display = document.getElementById("semicolonsDisplay");
    display.textContent = `Semicolons: ${semicolons}`;
}
//Function to update/display owned cmd list
function ownedCmds(directory) {
    let dir;
    
    if (directory == "main") {
        dir = cmds.concat(["cd shop", "cd credits"]);
    } else if (directory == "shop") {
        dir = shopCmds.concat(["cd main", "cd credits"]);
    } else if (directory == "credits") {
        dir = ["cd main", "cd shop"];
    } else {
        console.error(directory," is an invalid directory");
        return;
    }
    let output = "";
    for (let i = 0; i < dir.length; i++) {
        output += dir[i] + "<br>";
    }
    document.getElementById("ownedCmdsWrap").innerHTML = "Owned Commands for " + currentDirectory + ":<br>" + output;
}
