// Simulated player tag data (shared with checkin.js)
const playerTags = {
  "Abe": 4,
  "Bob": 5,
  "Cab": 6,
  "Don": 1,
  "Eve": 2,
  "Fin": 3,
  "Gig": 7,
  "Nova": 8 // If Nova was added earlier in check-in
};

const listEl = document.getElementById('leaderboard-list');

// Sort by tag number ascending
const sortedPlayers = Object.entries(playerTags).sort((a, b) => a[1] - b[1]);

// Build leaderboard list
sortedPlayers.forEach(([name, tag]) => {
  const li = document.createElement('li');
  li.textContent = `#${tag} — ${name}`;
  listEl.appendChild(li);
});