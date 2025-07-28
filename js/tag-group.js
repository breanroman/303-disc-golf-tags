document.addEventListener("DOMContentLoaded", () => {
  const players = JSON.parse(localStorage.getItem("players")) || [];

  // Sort players by tag
  players.sort((a, b) => a.tag - b.tag);

  const tbody = document.querySelector("#leaderboard tbody");

  players.forEach((player) => {
    const lastPlayed = player.history?.slice(-1)[0]?.date || "N/A";
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${player.tag}</td>
      <td>${player.name}</td>
      <td>${lastPlayed}</td>
    `;

    tbody.appendChild(row);
  });
});