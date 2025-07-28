document.addEventListener("DOMContentLoaded", () => {
  const leaderboardDiv = document.getElementById("leaderboard");

  // Simulated local data (will be replaced with real storage or dynamic fetch)
  const players = JSON.parse(localStorage.getItem("players")) || [
    { name: "Abe", tag: 3 },
    { name: "Bob", tag: 1 },
    { name: "Carol", tag: 2 },
  ];

  if (players.length === 0) {
    leaderboardDiv.innerHTML = "<p>No players checked in yet.</p>";
    return;
  }

  // Sort by tag number ascending
  const sorted = players.slice().sort((a, b) => a.tag - b.tag);

  const list = document.createElement("ol");
  sorted.forEach((player) => {
    const item = document.createElement("li");
    item.textContent = `#${player.tag} – ${player.name}`;
    list.appendChild(item);
  });

  leaderboardDiv.innerHTML = "";
  leaderboardDiv.appendChild(list);
});