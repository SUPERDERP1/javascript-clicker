// i hvvae no idea what im doing
const cmds = [];
let semicolons = 0;

// Handle form submission
document.getElementById('inputForm').addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const inputField = document.getElementById('inputReader');
    const input = inputField.value.trim(); // Get and trim the input value

    if (input) {
        cmds.push(input); // Add the command to the cmds array

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
        inputField.value = '';

        // Log the current state
        console.log("Current semicolons:", semicolons);
        console.log("Commands array:", cmds);
    }
});

// Function to add a new command programmatically
function addCmds(command) {
    cmds.push(command);
}