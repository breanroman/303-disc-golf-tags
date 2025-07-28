// Simulated player history from past rounds
const playerTags = {
  "Abe": 4,
  "Bob": 5,
  "Cab": 6,
  "Don": 1,
  "Eve": 2,
  "Fin": 3,
  "Gig": 7
};

const checkinForm = document.getElementById('checkin-form');
const resultBox = document.getElementById('result');

checkinForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('playerName').value.trim();

  if (!name) {
    resultBox.innerHTML = `<p>Please enter your name.</p>`;
    return;
  }

  const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  if (playerTags[formattedName]) {
    resultBox.innerHTML = `
      <p>✅ Welcome back, <strong>${formattedName}</strong>!</p>
      <p>Your current tag is: <strong>#${playerTags[formattedName]}</strong></p>
    `;
  } else {
    // Assign next unclaimed tag
    const existingTags = Object.values(playerTags);
    const maxTag = Math.max(...existingTags);
    const newTag = maxTag + 1;

    playerTags[formattedName] = newTag;

    resultBox.innerHTML = `
      <p>🆕 Hello, <strong>${formattedName}</strong>!</p>
      <p>You’ve been assigned tag: <strong>#${newTag}</strong></p>
    `;
  }

  checkinForm.reset();
});