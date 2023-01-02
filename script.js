"use strict";

//Getting elements that show the scores of the players
const scoreEl0 = document.querySelector("#score--0");
const scoreEl1 = document.getElementById("score--1");
const current_scoreEl0 = document.getElementById("current--0");
const current_scoreEl1 = document.getElementById("current--1");
//Getting the dice element
const diceEl = document.querySelector(".dice");
//Getting the btn elements
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
//Getting the individual players section
const player0_Section = document.querySelector(".player--0");
const player1_Section = document.querySelector(".player--1");

//Game Set Up
scoreEl0.textContent = 0;
scoreEl1.textContent = 0;
diceEl.classList.add("hidden");
let currentScore0 = 0;
let currentScore1 = 0;
let activePlayer = 0;

//function to change display for active player
const playerSwitch = function () {
  if (activePlayer == 1) {
    player0_Section.classList.remove("player--active");
    player1_Section.classList.add("player--active");
  } else {
    player1_Section.classList.remove("player--active");
    if (!player0_Section.classList.contains("player--active")) {
      player0_Section.classList.add("player--active");
    }
  }
};

const gameReset = function () {
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  diceEl.classList.add("hidden");
  current_scoreEl0.textContent = 0;
  current_scoreEl1.textContent = 0;
  currentScore0 = 0;
  currentScore1 = 0;
  activePlayer = 0;
  playerSwitch();
};

//adding event listener to buttons

//dice Roll button
btnRoll.addEventListener("click", function () {
  //Generating a random number
  const diceNum = Math.trunc(Math.random() * 6 + 1);
  //displaying the dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${diceNum}.png`;
  //add number to current score if it is not 1
  if (diceNum != 1) {
    if (activePlayer == 0) {
      currentScore0 += diceNum;
      current_scoreEl0.textContent = currentScore0;
    } else {
      currentScore1 += diceNum;
      current_scoreEl1.textContent = currentScore1;
    }
  } else {
    if (activePlayer == 0) {
      currentScore0 = 0;
      current_scoreEl0.textContent = currentScore0;
      activePlayer = 1;
      playerSwitch();
    } else {
      currentScore1 = 0;
      current_scoreEl1.textContent = currentScore1;
      activePlayer = 0;
      playerSwitch();
    }
  }
});

//hold button listener
btnHold.addEventListener("click", function () {
  if (activePlayer == 0) {
    scoreEl0.textContent = Number(scoreEl0.textContent) + currentScore0;
    currentScore0 = 0;
    current_scoreEl0.textContent = currentScore0;
    activePlayer = 1;
    playerSwitch();
  } else {
    scoreEl1.textContent = Number(scoreEl1.textContent) + currentScore1;
    currentScore1 = 0;
    current_scoreEl1.textContent = currentScore1;
    activePlayer = 0;
    playerSwitch();
  }
});

//new game button listener
btnNew.addEventListener("click", gameReset);
