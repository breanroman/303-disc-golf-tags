const form = document.getElementById("checkInForm");
const playerNameInput = document.getElementById("playerName");
const resultDiv = document.getElementById("checkInResult");
const tagList = document.getElementById("tagList");

let players = JSON.parse(localStorage.getItem("players")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const playerName = playerNameInput.value.trim();

  if (!playerName) return;

  let player = players.find((p) => p.name.toLowerCase() === playerName.toLowerCase());

  if (player) {
    resultDiv.innerHTML = `${player.name} already has Tag #${player.tag}`;
  } else {
    const assignedTag = getNextAvailableTag(players);
    player = { name: playerName, tag: assignedTag };
    players.push(player);
    localStorage.setItem("players", JSON.stringify(players));
    resultDiv.innerHTML = `Assigned Tag #${assignedTag} to ${player.name}`;
  }

  playerNameInput.value = "";
  renderTags();
});

function getNextAvailableTag(players) {
  const tags = players.map((p) => p.tag);
  let next = 1;
  while (tags.includes(next)) {
    next++;
  }
  return next;
}

function renderTags() {
  tagList.innerHTML = "";
  const sortedPlayers = [...players].sort((a, b) => a.tag - b.tag);
  sortedPlayers.forEach((p) => {
    const li = document.createElement("li");
    li.classList.add("tag-item");
    li.textContent = `Tag #${p.tag} — ${p.name}`;
    tagList.appendChild(li);
  });
}

// Show tags on page load
renderTags();