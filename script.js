'use strict';

// Differences: As we can see from the example above, the innerHTML property gets or sets HTML contents of the element. The textContent does not automatically encode and decode text and hence allows us to work with only the content part of the element.

// Document is a special object that is the entry point to the DOM. ex: document.querySelector()

const displayMessage = message =>
  (document.querySelector('.message').textContent = message);

const generateSecretNumber = () => Math.trunc(Math.random() * 20) + 1;

const setSelectorTextContent = (selector, text) =>
  (document.querySelector(selector).textContent = text);

const setSelectorStyleBackgroundColor = (selector, value) =>
  (document.querySelector(selector).style.backgroundColor = value);

const setSelectorStyleWidth = (selector, value) => {
  document.querySelector(selector).style.width = value;
};

const resetGuessNumber = () => (document.querySelector('.guess').value = '');

let secretNumber = generateSecretNumber();
let score = 20;
let highScore = 0;
let isGameOver = false;

// Submit guess when enter button is used
let input = document.querySelector('.guess');
input.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    document.querySelector('.check').click();
  }
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No number!');

    // When the player wins
  } else if (guess === secretNumber && score > 0 && !isGameOver) {
    displayMessage('🎉 Correct Number!');
    setSelectorTextContent('.number', secretNumber);

    setSelectorStyleBackgroundColor('body', '#60b347');
    setSelectorStyleWidth('.number', '30rem');

    score > highScore ? (highScore = score) : (highScore = highScore);
    setSelectorTextContent('.highscore', highScore);

    isGameOver = true;

    // When guess is not the correct number
  } else if (guess !== secretNumber && score >= 1 && !isGameOver) {
    guess > secretNumber
      ? displayMessage('📈 Too High!')
      : displayMessage('📉 Too Low!');
    score--;
    if (score === 0) {
      displayMessage('You lost the game!');
      isGameOver = true;
    }
  }
  setSelectorTextContent('.score', score);
});

// Reset game when again button is clicked
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  isGameOver = false;
  secretNumber = generateSecretNumber();
  displayMessage('Start guessing...');
  setSelectorTextContent('.score', score);
  setSelectorTextContent('.number', '?');
  resetGuessNumber();
  setSelectorStyleBackgroundColor('body', '#222');
  setSelectorStyleWidth('.number', '15rem');
});
