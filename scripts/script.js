let startCmds = [ // add a command in the form: {cmd:"COMMAND NAME", cost:COST TO BUY, profit:AMOUNT OF MONEY YOU GET BY USING IT} and everything else should be taken care of automatically
    //Example: {cmd:"test;", cost:400, profit:5},
    {cmd:"return;", cost:0, profit:1}, // Default command 
    {cmd:"console.log('i need semicolons');", cost:10, profit:3},
    {cmd:"let semicolons = semicolons + 5;", cost:15, profit:5},
    {cmd:"semicolons += 8;", cost:20, profit:8},
    {cmd:"function giveMoney() {semicolons += 10;}", cost:25, profit:10},
    {cmd:"if(money < 100000) {giveMoney();}", cost:30, profit:12},
    {cmd:"for(let i = 0; i < 10; i++) { semicolons += i; }", cost:35, profit:15},
    {cmd:"while(semicolons < 100) { semicolons += 5; }", cost:40, profit:20},
    {cmd:"if(a > b) { return a; } else { return b; }", cost:45, profit: 25},
    {cmd:"switch(x) { case 1: semicolons += 10; break; default: semicolons += 5; }", cost:50, profit:30},
    {cmd:"class SemicolonMaster { constructor() { this.semicolons = 50; } }", cost:60, profit:40},
    
    // New complex commands
    {cmd:"try { JSON.parse('{invalid: json}'); } catch(e) { semicolons += 20; }", cost:75, profit:70},
    {cmd:"async function fetchSemicolons() { let res = await fetch('api/semicolons'); semicolons += 25; }", cost:100, profit:90},
    {cmd:"document.querySelectorAll('.semicolon').forEach(el => semicolons += 5);", cost:120, profit:110},
    {cmd:"const calculate = (x, y) => x * y; semicolons += calculate(5, 6);", cost:150, profit:130},
    {cmd:"new Promise(resolve => setTimeout(() => { semicolons += 50; resolve(); }, 1000));", cost:200, profit:180},
    {cmd:"let map = new Map(); map.set('key', 100); semicolons += map.get('key');", cost:250, profit:230},
    
    //Other
    {cmd:"CSS MODE", cost:1000, profit:0},
    {cmd:"prestige", cost:700, profit:0}
];
let cssCmds = [ //cmds for css mode WIP
    {cmd:"color:#000;", cost:0, profit:1}, // Default command
    {cmd:"!important", cost:15, profit:3},
    {cmd:"@import url('https://example.com');", cost:15, profit:5},
    {cmd:":root {--semicolons: 1000;}", cost:25, profit:10},
    {cmd:"@media only screen and (max-width:1000px)", cost:30, profit:12},
    {cmd:"#semicolons::before { content: '1000';}", cost:35, profit:15},
    {cmd:".semicolons:target { overflow-x:var(--semicolons);}", cost:40, profit:20},
    {cmd:".semicolonsContainer .semicolons a:link {backdrop-filter: blur(calc(100vw - 30px));", cost:45, profit: 25}
];
let specialCmds = ["CSS MODE", "prestige"];
// Starting commands (only "return;" is available by default)
let cmds = ["return;"];
const directories = ["main", "shop", "credits"];
let shopCmds = allCmds.filter(item => !cmds.includes(item.cmd)).filter(item => !specialCmds.includes(item.cmd)).map((item) => "buy: " + item.cmd); // adds the buy: part to the shop commands
let prestigeCount = 0;
let semicolons = 0;
let currentDirectory = "main";
let debug = false;
let done = false;
let allCmds = startCmds;
// Prevents pasting commands
document.getElementById("inputReader").addEventListener('paste', (event) => { if (!debug) {event.preventDefault(); window.alert("no pasting code allowed");}});

// Event listener for handling form submissions (entering a command)
document.getElementById("inputForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const inputField = document.getElementById("inputReader");
    const input = inputField.value.trim();

    if (input) {
        inputField.value = ""; // Clear input field

        if (input === "dir") {
            ownedCmds(currentDirectory);
        } else if (input.includes("cd") && input.split("cd ").length === 2) {
            changeDirectory(input.split("cd ")[1]);
            if (!directories.includes(input.split("cd ")[1])) {
                return;
            }
        } else if (currentDirectory === "main" && cmds.includes(input) && !specialCmds.includes(input)) {
            processCommand(input);
        } else if (currentDirectory === "shop" && shopCmds.includes(input)) {
            const bought = processCommandShop(input);
            if (bought === "poor") {
                return; // Prevent logging invalid purchases
            }
        } else if (input === "debug") {
            semicolons += 10000; // Debug command
            console.log("Debug executed. Current semicolons:", semicolons);
            const allCmdsStr = allCmds.map(cmd => JSON.stringify(cmd)).join('<br>');
            const cmdsStr = cmds.join('<br>');
            const shopCmdsStr = shopCmds.join('<br>');
            debug = true;
            document.getElementById("cmdHistory").innerHTML += 
                `DEBUG:<br>
                semicolons:${semicolons}<br>
                currentDirectory:${currentDirectory}<br>
                prestigecount:${prestigeCount}<br>
                allCmds:<br>${allCmdsStr}<br>
                cmds:<br>${cmdsStr}<br>
                shopCmds:<br>${shopCmdsStr}<br>`;
            updateSemicolonsDisplay();
            
        } else if (input === "CSS MODE" && cmds.includes("CSS MODE")) {
            console.log("CSS mode on");
            document.getElementById("cmdHistory").innerHTML += "<span style='color:#00fe40'>CSS MODE ON</span> <br> Check shop and main for new commands <br>";
            cmds.push("color:#000;");
            allCmds = allCmds.concat(cssCmds);
            shopCmds = allCmds.filter(item => !cmds.includes(item.cmd)).filter(item => item.cmd !== "CSS MODE").map((item) => "buy: " + item.cmd); // adds the buy: part to the shop commands
            updateSemicolonsDisplay();
            return;
        } else if (input === "prestige" && cmds.includes("prestige") && window.confirm("Are you sure you want to prestige?\nThis will reset current semicolons.")) { 
            semicolons = 0;
            prestigeCount += 1;
            cmds = ["return;"];
            allCmds = startCmds;
            shopCmds = allCmds.filter(item => !cmds.includes(item.cmd)).filter(item => !specialCmds.includes(item.cmd) || !cssCmds.includes(item)).map((item) => "buy: " + item.cmd); // adds the buy: part to the shop commands
            console.log("prestiged");
            document.getElementById("cmdHistory").innerHTML = `<span style='color:#ff0;'>You Have Successfully Prestiged, Current Modifier: ${prestigeCount + 1} </span> <br>`;
            updateSemicolonsDisplay();
            return;
        } else if (input === "secretsaremeanttobehidden" && currentDirectory === "credits"){
            document.getElementById("directoryTitle").innerHTML = "ooo secrets";
            allCmds.pop(allCmds.length);
            cmds.pop(cmds.length);
            semicolons -= 100000;
            updateSemicolonsDisplay();
        } else if (input === "debug CSS") {
            shopCmds.push("buy: CSS MODE");
        } else {
            document.getElementById("cmdHistory").innerHTML += "<span style='color:red;'>Invalid Command</span>" + "<br>";
            console.error("Unknown command:", input);
            return;
        }
        // Update command history for valid commands
        if (currentDirectory !== "credits") {
            document.getElementById("cmdHistory").innerHTML += input + "<br>";
        }
    }
});

// Function to handle shop purchases
function processCommandShop(command) {
    const cmdText = command.split("buy: ")[1]; //finds the original command code which can interface with allCmds
    const cost = allCmds.find(item => "buy: " + item.cmd === command).cost * ((prestigeCount ** 1.2) + 1); //finds the object in all Cmds that corresponds to the command and extracts the cost
    const shopIndex = shopCmds.indexOf(command);
    console.log(cost);
    console.log(cmdText);
    console.log("shop index: ", shopIndex);
    if (semicolons >= cost) {
        semicolons -= cost;
        cmds.push(cmdText); // Add to available commands
        shopCmds.splice(shopIndex, 1); // Remove from shop
    } else {
        document.getElementById("cmdHistory").innerHTML += "<span style='color:red'>Not Enough Semicolons</span> <br>";
        return "poor";
    }

    if (shopCmds.length == 0 && !done) {
        document.getElementById("cmdHistory").innerHTML += command + "<br>";
        document.getElementById("cmdHistory").innerHTML += "<span style='color:#00fe40'>All Commands Bought! You Have Unlocked:</span> <br> <span style='color:#ff0;'>Prestige</span> <br> <span style='color:#00fe40'>CSS MODE</span> <br>";
        shopCmds.push("buy: CSS MODE");
        shopCmds.push("buy: prestige");
        return "poor";
        let done = true;
    }
    console.log("Command purchased:", cmdText);
    if (!(document.getElementById("ownedCmdsWrap").innerHTML == "")) {
        ownedCmds(currentDirectory);
    }
    updateSemicolonsDisplay();
}

// Function to process main directory commands
function processCommand(command) {
    const using = allCmds.find(item => item.cmd === command); //extracts the object in allCmds corresponding to the command
    if (using) {
        semicolons += using.profit; //finds the amount of money gained using said object
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
        //This line is very long. It takes every item in shop commands and adds the semicolon cost in green to the end, and adds cd main and cd shop to the command list
        dir = shopCmds.map(item => item + " <span style='color:#00fe40;'>" + allCmds.find(it => "buy: " + it.cmd === item).cost * (prestigeCount + 1) + " Semicolons</span>").concat(["cd main", "cd credits"]); //adds cd main and cd credits to the command list
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
    if (!directories.includes(directory) || !directory) {
        document.getElementById("cmdHistory").innerHTML += "<span style='color:red;'>Invalid Directory</span>" + "<br>";
        return;
    }
    if (currentDirectory === "credits") {
        document.getElementById("cmdHistory").innerHTML = ""; // Clear credits display
    }

    //clears dir after changing directories
    document.getElementById("ownedCmdsWrap").innerHTML = "";
    
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
