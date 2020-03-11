/*
Game Function:
- player must guess a number between a min and max
- player gets a certain amount of guesses
- notify player of guesses remaining 
- notify the player of the correct answer if loose
- let player choose to play again
*/
// Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  message = document.querySelector(".message"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input");

// Assign Ui min and max
minNum.textContent = min;
maxNum.textContent = max;

// add event on the game
game.addEventListener("mousedown", function(e) {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
});

// listen for guess
guessBtn.addEventListener("click", function() {
  const guess = parseInt(guessInput.value);
  // validate
  if (isNaN(guess) || guess > max || guess < min) {
    guessInput.style.borderColor = "red";
    setMessage(`Please Enter a number between ${min} and ${max}`, "red");
  }

  // check if win
  if (guess === winningNum) {
    // game over - win
    gameOver(true, `${winningNum} is correct, You Win!`);
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // game over - lost
      // disabled the guess-input
      gameOver(
        false,
        `Game Over,you lose, the correct number was ${winningNum}`
      );
    } else {
      setMessage(`${guess} is incorrect, ${guessesLeft} guesses left`, "red");
    }
  }
});

// game over function
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // disabled the guess-input
  guessInput.disabled = true;
  setMessage(msg);
  guessInput.style.borderColor = color;
  message.style.color = color;

  guessBtn.value = "Play again";
  guessBtn.className += "play-again";
}

// set message function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// get random number function
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
