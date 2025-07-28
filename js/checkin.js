document.addEventListener("DOMContentLoaded", () => {
  const maxPlayers = 20;
  let playerCount = 0;

  const playersDB = JSON.parse(localStorage.getItem("players")) || [];
  const coursesDB = JSON.parse(localStorage.getItem("courses")) || [];

  const playerFields = document.getElementById("playerFields");
  const addPlayerBtn = document.getElementById("addPlayerBtn");
  const courseInput = document.getElementById("courseName");
  const courseList = document.getElementById("courseList");
  const parInput = document.getElementById("coursePar");
  const newCourseFields = document.getElementById("newCourseFields");

  const formatName = (name) =>
    name
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();

  function createPlayerInput() {
    if (playerCount >= maxPlayers) return;

    const div = document.createElement("div");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Player ${playerCount + 1}`;
    input.name = `player${playerCount + 1}`;
    input.autocomplete = "off";

    input.addEventListener("blur", () => {
      input.value = formatName(input.value);
    });

    div.appendChild(input);
    playerFields.appendChild(div);
    playerCount++;
  }

  addPlayerBtn.addEventListener("click", () => {
    createPlayerInput();
  });

  // Initialize with 5 player fields
  for (let i = 0; i < 5; i++) createPlayerInput();

  // Populate course datalist
  coursesDB.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.name;
    courseList.appendChild(opt);
  });

  // Detect if it's a new course
  courseInput.addEventListener("input", () => {
    const existing = coursesDB.find(
      (c) => c.name.toLowerCase() === courseInput.value.toLowerCase()
    );
    if (existing) {
      parInput.value = existing.par;
      newCourseFields.style.display = "none";
    } else {
      newCourseFields.style.display = "block";
    }
  });

  // Form submit (Start Round)
  document.getElementById("checkinForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const checkedInPlayers = [];
    const inputs = playerFields.querySelectorAll("input");

    inputs.forEach((input) => {
      const name = formatName(input.value);
      if (name) checkedInPlayers.push(name);
    });

    if (checkedInPlayers.length === 0) {
      alert("Please enter at least one player.");
      return;
    }

    const courseName = formatName(courseInput.value);
    const par = parseInt(parInput.value);
    if (!courseName || !par) {
      alert("Please provide course and par.");
      return;
    }

    const course = coursesDB.find(
      (c) => c.name.toLowerCase() === courseName.toLowerCase()
    );

    if (!course) {
      const location = document.getElementById("courseLocation").value.trim();
      if (!location) {
        alert("Please enter course location for new courses.");
        return;
      }

      coursesDB.push({ name: courseName, par, location });
      localStorage.setItem("courses", JSON.stringify(coursesDB));
    }

    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(
      now.getHours()
    ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
    const roundId = `${timestamp}${courseName.slice(0, 4).toUpperCase()}`;

    // Store temporary round data
    const currentRound = {
      id: roundId,
      course: courseName,
      par,
      players: checkedInPlayers,
      timestamp: now.toISOString(),
    };
    localStorage.setItem("currentRound", JSON.stringify(currentRound));

    window.location.href = "score-entry.html";
  });
});