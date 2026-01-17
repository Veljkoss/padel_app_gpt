const scoreState = {
  team1Sets: 0,
  team1Games: 0,
  team2Sets: 0,
  team2Games: 0,
};

const wheelChallenges = [
  "Only lobs for one game",
  "Left-handed points for 5 minutes",
  "First to 11 wins a smoothie",
  "Silent communication round",
  "Winner picks post-game snack",
  "Golden point decides the next game",
  "Losers bring the new balls",
];

const scoreElements = {
  team1Sets: document.getElementById("team1Sets"),
  team1Games: document.getElementById("team1Games"),
  team2Sets: document.getElementById("team2Sets"),
  team2Games: document.getElementById("team2Games"),
};

const matchNotes = document.getElementById("matchNotes");
const wheelResult = document.getElementById("wheelResult");
const wheelList = document.getElementById("wheelList");

function renderScores() {
  Object.keys(scoreElements).forEach((key) => {
    scoreElements[key].textContent = scoreState[key];
  });
}

function updateScore(team, type, step) {
  const key = `team${team}${type === "set" ? "Sets" : "Games"}`;
  scoreState[key] = Math.max(0, scoreState[key] + step);
  renderScores();
}

function handleScoreButtons(event) {
  const button = event.target.closest("button");
  if (!button) return;
  const { action, team, step } = button.dataset;
  if (!action || !team) return;
  updateScore(team, action, Number(step));
}

function spinWheel() {
  const choice = wheelChallenges[Math.floor(Math.random() * wheelChallenges.length)];
  wheelResult.textContent = `🎯 ${choice}`;
}

function resetAll() {
  scoreState.team1Sets = 0;
  scoreState.team1Games = 0;
  scoreState.team2Sets = 0;
  scoreState.team2Games = 0;
  matchNotes.value = "";
  wheelResult.textContent = "Spin to choose a challenge!";
  renderScores();
}

function saveNote() {
  const note = matchNotes.value.trim();
  wheelResult.textContent = note
    ? `Saved note: “${note.substring(0, 60)}${note.length > 60 ? "..." : ""}”`
    : "Add a note to save a highlight.";
}

function populateWheelList() {
  wheelList.innerHTML = "";
  wheelChallenges.forEach((challenge) => {
    const item = document.createElement("li");
    item.textContent = challenge;
    wheelList.appendChild(item);
  });
}

function updateMatchDetails() {
  const date = prompt("Next match date/time?", "Saturday, 10:00 AM");
  if (!date) return;
  const location = prompt("Match location?", "Downtown Padel Club - Court 2");
  if (!location) return;
  const players = prompt("Players/teams?", "You + 3 friends");
  if (!players) return;

  document.getElementById("matchDate").textContent = date;
  document.getElementById("matchLocation").textContent = location;
  document.getElementById("matchPlayers").textContent = players;
}

renderScores();
populateWheelList();

const scoreboard = document.querySelector(".scoreboard");
scoreboard.addEventListener("click", handleScoreButtons);

document.getElementById("spinWheel").addEventListener("click", spinWheel);
document.getElementById("resetAll").addEventListener("click", resetAll);
document.getElementById("saveNote").addEventListener("click", saveNote);
document.getElementById("updateMatch").addEventListener("click", updateMatchDetails);
