// i hvvae no idea what im doing
const cmds = [];
let semicolons = 0;

document.getElementById('inputReader').addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        const input = document.getElementById('inputReader').value.trim();
        cmds.push(input); // Add the entered command to cmds array

        // Check the entered command and update semicolons
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
        } else {
            console.error("Unknown command:", input);
        }

        // Clear the input field
        document.getElementById('inputReader').value = '';
        console.log("Current semicolons:", semicolons);
    }
});

// Function to add a new command to cmds
function addCmds(command) {
    cmds.push(command);
}