document.addEventListener("DOMContentLoaded", () => {
  const round = JSON.parse(localStorage.getItem("currentRound"));
  const playersDB = JSON.parse(localStorage.getItem("players")) || [];
  const roundsDB = JSON.parse(localStorage.getItem("rounds")) || [];

  if (!round) {
    alert("No round in progress.");
    window.location.href = "checkin.html";
    return;
  }

  // Populate round info
  document.getElementById("courseName").textContent = round.course;
  document.getElementById("coursePar").textContent = round.par;
  document.getElementById("roundId").textContent = round.id;

  const playerInputs = document.getElementById("playerScoreInputs");

  round.players.forEach((player) => {
    const div = document.createElement("div");
    div.className = "score-entry";
    div.innerHTML = `
      <label>${player}:
        <input type="number" name="${player}" required />
      </label>
    `;
    playerInputs.appendChild(div);
  });

  document.getElementById("scoreForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const scores = [];
    round.players.forEach((player) => {
      const input = document.querySelector(`input[name="${player}"]`);
      const score = parseInt(input.value);
      if (isNaN(score)) {
        alert(`Score missing for ${player}`);
        return;
      }
      scores.push({ name: player, score });
    });

    // Sort by score ASC (low score wins)
    scores.sort((a, b) => a.score - b.score);

    // Assign new tags by finish
    let maxTag = playersDB.reduce((max, p) => Math.max(max, p.tag || 0), 0);
    const assignedTags = [];

    scores.forEach((playerResult, index) => {
      let player = playersDB.find(
        (p) => p.name.toLowerCase() === playerResult.name.toLowerCase()
      );

      if (!player) {
        // New player, assign next tag
        maxTag++;
        player = { name: playerResult.name, tag: maxTag, history: [] };
        playersDB.push(player);
      }

      const newTag = index + 1;
      assignedTags.push({ name: player.name, oldTag: player.tag, newTag });
      player.history = player.history || [];
      player.history.push({
        roundId: round.id,
        score: playerResult.score,
        oldTag: player.tag,
        newTag: newTag,
        course: round.course,
        date: round.timestamp,
      });

      player.tag = newTag;
    });

    // Save results
    roundsDB.push({
      id: round.id,
      course: round.course,
      par: round.par,
      date: round.timestamp,
      results: scores.map((r, i) => ({
        name: r.name,
        score: r.score,
        tag: i + 1,
      })),
    });

    localStorage.setItem("rounds", JSON.stringify(roundsDB));
    localStorage.setItem("players", JSON.stringify(playersDB));
    localStorage.removeItem("currentRound");

    alert("Round completed! Tags updated.");
    window.location.href = "tag-group.html";
  });
});