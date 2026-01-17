const scoreState = {
  team1Sets: 0,
  team1Games: 0,
  team2Sets: 0,
  team2Games: 0,
};

const players = ["You", "Friend A", "Friend B", "Friend C"];

const wheelChallenges = [
  "Only lobs for one game",
  "Left-handed points for 5 minutes",
  "First to 11 wins a smoothie",
  "Silent communication round",
  "Winner picks post-game snack",
  "Golden point decides the next game",
  "Losers bring the new balls",
];

const hypeLines = [
  "You are 87% pure racket wizard today.",
  "The walls are on your side. Use them.",
  "Crowd chant unlocked: OLE! OLE!",
  "Drop shot? More like drop mic.",
  "Play like the score is 0-0 and the snacks are infinite.",
  "Your backhand has its own fan club.",
];

const playlistVibes = [
  "Padel Pump-Up Mix",
  "Golden Point Grooves",
  "Slow-Mo Smashes",
  "Vibes Over Volleys",
  "Retro Rally Classics",
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
const matchCountdown = document.getElementById("matchCountdown");
const hypeDisplay = document.getElementById("hypeDisplay");
const snackDraft = document.getElementById("snackDraft");
const playlistName = document.getElementById("playlistName");
const mvpResult = document.getElementById("mvpResult");

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

function shuffleList(list) {
  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function updateSnackDraft() {
  snackDraft.innerHTML = "";
  shuffleList(players).forEach((player) => {
    const item = document.createElement("li");
    item.textContent = player;
    snackDraft.appendChild(item);
  });
}

function updateHype() {
  hypeDisplay.textContent = hypeLines[Math.floor(Math.random() * hypeLines.length)];
}

function updatePlaylist() {
  playlistName.textContent = playlistVibes[Math.floor(Math.random() * playlistVibes.length)];
}

function updateCountdown() {
  const matchText = document.getElementById("matchDate").textContent;
  const target = new Date(matchText);
  if (Number.isNaN(target.getTime())) {
    matchCountdown.textContent = "Set a date to start the hype.";
    return;
  }

  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    matchCountdown.textContent = "Match time! Grab your racket.";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  matchCountdown.textContent = `${days}d ${hours}h ${minutes}m to go`;
}

function resetAll() {
  scoreState.team1Sets = 0;
  scoreState.team1Games = 0;
  scoreState.team2Sets = 0;
  scoreState.team2Games = 0;
  matchNotes.value = "";
  wheelResult.textContent = "Spin to choose a challenge!";
  hypeDisplay.textContent = "Tap for instant swagger.";
  mvpResult.textContent = "Cast a vote to crown the MVP.";
  updateSnackDraft();
  updatePlaylist();
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
  updateCountdown();
}

renderScores();
populateWheelList();
updateSnackDraft();
updateHype();
updatePlaylist();
updateCountdown();

const scoreboard = document.querySelector(".scoreboard");
scoreboard.addEventListener("click", handleScoreButtons);

document.getElementById("spinWheel").addEventListener("click", spinWheel);
document.getElementById("resetAll").addEventListener("click", resetAll);
document.getElementById("saveNote").addEventListener("click", saveNote);
document.getElementById("updateMatch").addEventListener("click", updateMatchDetails);
document.getElementById("generateHype").addEventListener("click", updateHype);
document.getElementById("shuffleSnacks").addEventListener("click", updateSnackDraft);
document.getElementById("shufflePlaylist").addEventListener("click", updatePlaylist);

document.querySelectorAll(".mvp-option").forEach((button) => {
  button.addEventListener("click", () => {
    mvpResult.textContent = `🏆 ${button.dataset.player} takes the MVP crown!`;
  });
});

setInterval(updateCountdown, 60000);
