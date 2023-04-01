const pacman = document.querySelector(".pacman");
const ghost = document.querySelector(".ghost");
const score = document.querySelector(".score");
const leaderboard = document.querySelector(".leaderboard");
const form = document.querySelector("form");
const nameInput = document.querySelector("#nameInput");
const scoreInput = document.querySelector("#scoreInput");
const submitBtn = document.querySelector("#submitBtn");
const leaderboardList = document.querySelector(".leaderboard-list");
const playAgainBtn = document.querySelector(".play-again");
playAgainBtn.addEventListener("click", () => {
  location.reload();
});

let alreadyJump = false;
let count = 0;
let pacmanOpen = false;
let leaderboardEntries = [];

document.addEventListener("keydown", (e) => {
  if ((e.code === "ArrowUp") | (e.code === "Space")) {
    jump();
  }
});

function jump() {
  if (!pacman.classList.contains("jump")) {
    pacman.classList.add("jump");
    alreadyJump = true;

    setTimeout(() => {
      pacman.classList.remove("jump");
      alreadyJump = false;
    }, 1100);
  }
}

setInterval(() => {
  let pacmanBottom = parseInt(
    window.getComputedStyle(pacman).getPropertyValue("bottom")
  );
  let ghostLeft = parseInt(
    window.getComputedStyle(ghost).getPropertyValue("left")
  );

  if (ghostLeft > 40 && ghostLeft < 90 && pacmanBottom <= 50 && !alreadyJump) {
    alert(`Game Over! Seu score foi: ${count}`);
    leaderboardEntries.push({ name: "", score: count });
    leaderboard.style.display = "block";
    renderLeaderboard();
    playAgainBtn.style.display = "block";
    count = 0;
  }

  count++;
  score.innerHTML = `SCORE: ${count}`;

  if (count % 5 === 0) {
    pacmanOpen = !pacmanOpen;

    if (pacmanOpen) {
      pacman.classList.add("open");
    } else {
      pacman.classList.remove("open");
    }
  }
}, 10);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const score = parseInt(scoreInput.value);
  leaderboardEntries.push({ name, score });
  renderLeaderboard();
  form.reset();
});

function renderLeaderboard() {
  leaderboardList.innerHTML = "";
  leaderboardEntries
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .forEach((entry) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="name">${entry.name}</span><span class="score">${entry.score}</span>`;
      leaderboardList.appendChild(li);
    });
}
