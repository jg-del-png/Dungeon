// Data storage
const loot = [];
const players = [];

// DOM elements
const lootName = document.getElementById("loot-name");
const lootValue = document.getElementById("loot-value");
const lootList = document.getElementById("loot-list");
const runningTotal = document.getElementById("running-total");

const playerName = document.getElementById("player-name");
const playerList = document.getElementById("player-list");

const resultsDiv = document.getElementById("results");
const finalTotal = document.getElementById("final-total");

// Add loot
document.getElementById("add-loot").addEventListener("click", () => {
  const name = lootName.value.trim();
  const value = Number(lootValue.value);

  if (!name || value <= 0) {
    alert("Enter a valid item and value.");
    return;
  }

  loot.push({ name, value });
  renderLoot();
  lootName.value = "";
  lootValue.value = "";
});

// Add player
document.getElementById("add-player").addEventListener("click", () => {
  const name = playerName.value.trim();
  if (!name) {
    alert("Enter a valid player name.");
    return;
  }

  players.push({ name, total: 0 });
  renderPlayers();
  playerName.value = "";
});

// Render loot list
function renderLoot() {
  lootList.innerHTML = loot.map(item => `<li>${item.name} — ${item.value} gold</li>`).join("");
  
  // Calculate running total
  const total = loot.reduce((sum, item) => sum + item.value, 0);

  runningTotal.textContent = `${total} gold`;
}

// Render players list
function renderPlayers() {
  playerList.innerHTML = players.map(p => `<li>${p.name}</li>`).join("");
}


//Calculate split
const calculateBtn = document.getElementById("calculate");
calculateBtn.addEventListener("click", () => {
  if (loot.length === 0 || players.length === 0) {
    alert("Add loot and players first.");
    return;
  }

  // compute grand total and equal share
  const grandTotal = loot.reduce((sum, item) => sum + item.value, 0);
  const share = grandTotal / players.length;

  // assign share to each player
  players.forEach(p => p.total = share);

  renderResults();
});

// Results
function renderResults() {
  // Calculate final total
  const total = loot.reduce((sum, item) => sum + item.value, 0);
  finalTotal.textContent = `${total} gold`;
  
  resultsDiv.innerHTML = players
    .map(p => `<p><strong>${p.name}</strong>: ${p.total} gold</p>`)
    .join("");
}
