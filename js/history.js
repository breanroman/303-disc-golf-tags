const roundData = [
  {
    date: "01/01/2026",
    players: [
      { name: "Abe", score: -2, tag: 1 },
      { name: "Bob", score: 0, tag: 2 },
      { name: "Cab", score: 1, tag: 3 }
    ]
  },
  {
    date: "03/01/2026",
    players: [
      { name: "Abe", score: 0, tag: 3 },
      { name: "Bob", score: -3, tag: 1 },
      { name: "Cab", score: 1, tag: 4 },
      { name: "Don", score: -3, tag: 2 }
    ]
  },
  {
    date: "11/30/2026",
    players: [
      { name: "Abe", score: 0, tag: 7 },
      { name: "Bob", score: -3, tag: 3 },
      { name: "Cab", score: 0, tag: 6 },
      { name: "Don", score: -1, tag: 5 },
      { name: "Eve", score: -4, tag: 1 },
      { name: "Fin", score: -3, tag: 2 },
      { name: "Gig", score: -2, tag: 4 }
    ]
  }
];

const historyContainer = document.getElementById("round-history");

roundData.forEach(round => {
  const roundDiv = document.createElement("div");
  roundDiv.classList.add("round");

  const dateHeading = document.createElement("h3");
  dateHeading.textContent = `🗓️ ${round.date}`;
  roundDiv.appendChild(dateHeading);

  const list = document.createElement("ul");
  round.players.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name} | Score: ${p.score} → Tag #${p.tag}`;
    list.appendChild(li);
  });

  roundDiv.appendChild(list);
  historyContainer.appendChild(roundDiv);
});