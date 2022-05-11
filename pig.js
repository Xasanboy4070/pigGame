"use strict";
const diceImg = document.querySelector(".dice");
const resetBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const players = document.querySelectorAll(".player");
const scores = document.querySelectorAll(".score");
const section = document.querySelector(".sections");
const btnStart = document.querySelector(".btn-start");
const inputs = document.querySelector(".inputs");
const user1 = document.getElementById("user1");
const user2 = document.getElementById("user2");
const player1 = document.getElementById("player--1");
const player2 = document.getElementById("player--2");
const box = document.querySelector(".box");
const currentScores = document.querySelectorAll(".current-score");
const FINISH_SCORE = 50;

let currentScore = 0;
let _scores = [0, 0];
let currentPlayer = 0;
let playing = false;
let winnerExist = false;

section.style.display = "none";

rollBtn.onclick = onRollDice;
holdBtn.onclick = onHold;
resetBtn.onclick = onReset;
btnStart.onclick = start;
function onRollDice() {
  let dice = Math.ceil(Math.random() * 6);
  console.log(`dice=${dice}`);
  if (!playing) {
    diceImg.classList.remove("hidden");
    playing = true;
  }
  // random image
  let imgURL = `./images/dice-${dice}.png`;
  diceImg.src = imgURL;

  // add dice value to currentScore
  if (dice === 1) {
    console.log(`dice=${dice}`);
    nextPlayer();
  } else {
    currentScore += dice;
    currentScores[currentPlayer].innerHTML = currentScore;
  }
  if (currentPlayer === 1) {
    box.innerHTML = `bot: Roll bostm ${dice} chiqti`;
  } else {
    box.innerHTML = "";
  }
}

function onHold() {
  // add currentScore to score and displaying
  _scores[currentPlayer] += currentScore;
  scores[currentPlayer].innerHTML = _scores[currentPlayer];
  if (currentPlayer === 1) {
    box.innerHTML = `bot: Hold bostm`;
  } else {
    box.innerHTML = "";
  }
  checkWinner();
  nextPlayer();
}

function onReset() {
  currentScores[currentPlayer].innerHTML = 0;
  scores.forEach((score) => (score.innerHTML = 0));
  diceImg.classList.remove("hidden");
  rollBtn.disabled = false;
  holdBtn.disabled = false;

  currentScore = 0;
  _scores = [0, 0];
  if (winnerExist) players[currentPlayer].classList.remove("player--winner");

  if (currentPlayer !== 0) {
    currentPlayer = 0;
    players[0].classList.add("player--active");
    players[1].classList.remove("player--active");
  }
}

function checkWinner() {
  if (_scores[currentPlayer] >= FINISH_SCORE) {
    players[currentPlayer].classList.add("player--winner");
    rollBtn.disabled = true;
    holdBtn.disabled = true;
    winnerExist = true;
    playing = false;
  }
}

function nextPlayer() {
  rollBtn.disabled = false;
  holdBtn.disabled = false;
  currentScore = 0;
  currentScores[currentPlayer].innerHTML = currentScore;
  players[currentPlayer].classList.remove("player--active");
  if (currentPlayer === 0) {
    currentPlayer = 1;
    if (currentPlayer === 1) {
      rollBtn.disabled = true;
      holdBtn.disabled = true;
      setTimeout(function () {
        bot();
      }, 2000);
    }
  } else {
    currentPlayer = 0;
  }
  players[currentPlayer].classList.add("player--active");
}

function bot(dice) {
  if (dice === 1 || currentPlayer === 0) {
    return 0;
  }
  rollBtn.disabled = true;
  holdBtn.disabled = true;
  let randomBot = Math.ceil(Math.random() * 3);
  if (randomBot === 1) {
    box.innerHTML = "bot: Hold bostm";
    onHold();
  } else {
    box.innerHTML = `bot: Roll bostm ${dice} chiqti`;
    onRollDice();
  }
  console.log(randomBot);
  return setTimeout(function () {
    bot(randomBot);
  }, 2000);
}

// {} -> block scope
// () => {} -> function scope
// {} -> {...all codes...}

btnStart.classList.add("hidden");
user1.addEventListener("keyup", (event1) => {
  player1.innerText = event1.target.value;
  user2.addEventListener("keyup", (event2) => {
    player2.innerText = event2.target.value;
    if (event2.target.value === "" && event1.target.value === "") {
      btnStart.classList.add("hidden");
    } else {
      btnStart.classList.remove("hidden");
    }
  });
});
function start() {
  inputs.style.display = "none";
  section.style.display = "block";
}

// const my_input = document.getElementById("player_1");
// const btn = document.getElementById("btn");
// my_input.addEventListener("keyup", (event) => {
//   if (event.target.value === "") btn.classList.add("hidden");
//   else btn.classList.remove("hidden");
//   console.log("value = ");
// });

// const bot_input = document.getElementById("bot");
// bot_input.addEventListener("change", (event) => {
//   console.log("value = ", event.target.value);
// });
