// Simple in-memory store for tags
let tagAssignments = {};
let nextAvailableTag = 1;

// Get the form element and listen for submit
document.getElementById("checkInForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("playerName");
  const playerName = nameInput.value.trim();

  if (!playerName) {
    alert("Please enter your name.");
    return;
  }

  // If player is already assigned a tag, show it again
  if (tagAssignments[playerName]) {
    displayMessage(`${playerName}, your current tag is #${tagAssignments[playerName]}`);
  } else {
    // Assign new tag
    tagAssignments[playerName] = nextAvailableTag;
    displayMessage(`Welcome, ${playerName}! You've been assigned Tag #${nextAvailableTag}.`);
    nextAvailableTag++;
  }

  // Clear input
  nameInput.value = "";

  // Refresh the tag list
  updateTagDisplay();
});

function displayMessage(msg) {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = msg;
}

function updateTagDisplay() {
  const list = document.getElementById("tagList");
  list.innerHTML = ""; // clear previous

  for (const [player, tag] of Object.entries(tagAssignments)) {
    const item = document.createElement("li");
    item.textContent = `${player}: Tag #${tag}`;
    list.appendChild(item);
  }
}