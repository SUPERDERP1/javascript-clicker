// Main directory commands
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
]; 

// Commands available in the shop
const shopCmds = [
    "buy: console.log('i need semicolons');",
    "buy: megaLoop;",
    "buy: ultimateClass;"
]; 

// The array that is displayed in the shop dir for costs
const shopCmdsCosts = [
    "buy: console.log('i need semicolons'); <span stlye='color:#0fe300;'>10 semicolons</span>",
    "buy: megaLoop; <span stlye='color:#0fe300;'>25 semicolons</span>",
    "buy: ultimateClass; <span stlye='color:#0fe300;'>100 semicolons</span>"
]; 

let semicolons = 0; // Counter to track the number of semicolons
let currentDirectory = "main"; // Track the current directory

// Prevents pasting commands
document.getElementById("inputReader").addEventListener('paste',(event) => {event.preventDefault();});

// Event listener for handling form submissions (entering a command)
document.getElementById("inputForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const inputField = document.getElementById("inputReader"); // Input field for user commands
    const input = inputField.value.trim(); // Get the input value and trim extra spaces
    
    // Clears the input field
    if (input) {inputField.value = "";}
    
    if (input) { // Ensure input is not empty
        if (input === "dir") {
            ownedCmds(currentDirectory); // Display commands based on the current directory
        } else if (input === "cd shop") {
            // Change to the shop directory
            if (currentDirectory === "credits") {document.getElementById("cmdHistory").innerHTML = "";} //clears credits after switching from the credits dir
            currentDirectory = "shop";
            document.getElementById("directoryTitle").innerHTML = "main/shop/";
            console.log("You are now in the shop directory. Type 'dir' to see available commands.");
            
        } else if (input === "cd main") {
            // Change to the main directory
            if (currentDirectory === "credits") {document.getElementById("cmdHistory").innerHTML = "";} //clears credits after switching from the credits dir
            currentDirectory = "main";
            document.getElementById("directoryTitle").innerHTML = "main/";
            console.log("You are now in the main directory. Type 'dir' to see available commands.");
        } else if (input === "cd credits"){
            // Change to the credits directory
            currentDirectory = "credits";
            document.getElementById("directoryTitle").innerHTML = "main/credits/";
            document.getElementById("cmdHistory").innerHTML = "Made by Airplane, Max Verstappen, and G I R A F F E"; //clears cmd history and replaces it with credits
            console.log("Made by Airplane, Max Verstappen, and G I R A F F E");
        } else if (currentDirectory === "main" && cmds.includes(input)) {
            processCommand(input); // Processes commands in the main directory
        } else if (currentDirectory === "shop" && shopCmds.includes(input)) {
            // Processes commands in the shop directory
            const bought = processCommandShop(input);
            //prevents the buy command from appearing on cmd history if you can't afford it
            if (bought == "poor") {
                return;
            } 
            console.log(`Executed shop command: ${input}`);
        } else if (input === "debug") { //this is for testing and will be removed later
            semicolons += 10000; // large amount of semicolons for debugging and testing
            console.log("Command executed. Current semicolons:", semicolons);
            updateSemicolonsDisplay();
        } else {
            // Invalid command for the current directory
            console.error("Unknown command:", input);
            return false;
        }
        // Update the cmd history for valid cmds
        if (currentDirectory !== "credits") {
            document.getElementById("cmdHistory").innerHTML += input + "<br>";
        }
        // hides the dir afetr excecuting another cmd
        if (input !== "dir") {
            document.getElementById("ownedCmdsWrap").innerHTML = "";
        }
    }
});

// Function to process recognized commands in the shop directory
function processCommandShop(command) {
    if (command === "buy: console.log('i need semicolons');" && semicolons >= 10) { //checks command you want to buy
        semicolons -= 10;
        cmds.push("console.log('i need semicolons');"); // adds the cmd you bought to your cmd list
        shopCmds.splice(shopCmds.indexOf("buy: console.log('i need semicolons');"), 1); // removes the ability to buy the cmd again 
        shopCmdsCosts.splice(shopCmdsCosts.indexOf("buy: console.log('i need semicolons'); <span stlye='color:#0fe300;'>10 semicolons</span>"), 1); // removes the cmd from the dir
    } else if (command === "buy: megaLoop;" && semicolons >= 25) { //checks command you want to buy
        semicolons -= 25;
        cmds.push("megaLoop;"); // adds the cmd you bought to your cmd list
        shopCmds.splice(shopCmds.indexOf("buy: megaLoop;"), 1); // removes the ability to buy the cmd again 
        shopCmdsCosts.splice(shopCmdsCosts.indexOf("buy: megaLoop; <span stlye='color:#0fe300;'>25 semicolons</span>"), 1); // removes the cmd from the dir
    } else if (command === "buy: ultimateClass;" && semicolons >= 100) { //checks command you want to buy
        semicolons -= 100; 
        cmds.push("ultimateClass;"); // adds the cmd you bought to your cmd list
        shopCmds.splice(shopCmds.indexOf("buy: ultimateClass;"), 1); // removes the ability to buy the cmd again 
        shopCmdsCosts.splice(shopCmdsCosts.indexOf("buy: ultimateClass; <span stlye='color:#0fe300;'>100 semicolons</span>"), 1); // removes the cmd from the dir
    } else {
        document.getElementById("cmdHistory").innerHTML += "<span style='color:red'>Not Enough Semicolons</span> <br>";
        return "poor"; //used to stop the cmd from appearing
    }
    console.log("Command executed. Current semicolons:", semicolons);
    updateSemicolonsDisplay();
    
}
// Function to process recognized commands in the main directory
function processCommand(command) {
    if (command === "return;") {
        semicolons += 1;
    } else if (command === "console.log('i need semicolons');") {
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
        console.error("command not recognized"); //this message should be impossible to get, but is kept as contingency
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

    //gets the cmd list for the directory
    if (directory == "main") {
        dir = cmds.concat(["cd shop", "cd credits"]); 
        console.log("Available commands in main directory:", cmds.concat(["cd shop", "cd credits"]));
    } else if (directory == "shop") {
        dir = shopCmdsCosts.concat(["cd main", "cd credits"]);
        console.log("Available commands in shop:", shopCmds.concat(["cd main", "cd credits"]));
    } else if (directory == "credits") {
        dir = ["cd main", "cd shop"];
    } else {
        console.error(directory, " is an invalid directory");
        return;
    }
    //defines output as a line break separated list of the elements of dir (the command list)
    let output = "";
    for (let i = 0; i < dir.length; i++) {
        output += dir[i] + "<br>";
    }
    //displays the ouput list as well as the title for owned commands
    document.getElementById("ownedCmdsWrap").innerHTML = "Owned Commands for " + currentDirectory + ":<br>" + output;
}
