function computerPlay() {
  const options = ["rock", "paper", "scissors"];
  const computerChoice = options[Math.floor(Math.random() * options.length)];

  if (computerChoice == "rock") {
    computerChoiceImage.src = "images/rock.png";
  } else if (computerChoice == "paper") {
    computerChoiceImage.src = "images/paper.png";
  } else {
    computerChoiceImage.src = "images/scissors.png";
  }

  return computerChoice;
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
    content.textContent = `It\'s a tie! You both chose ${playerSelection}`;
  } else if (playerSelection == "rock") {
    if (computerSelection == "paper") {
      content.textContent = `You lose! ${
        computerSelection[0].toUpperCase() + computerSelection.slice(1)
      } beats ${playerSelection}!`;
      return "computerWins";
    } else if (computerSelection == "scissors") {
      content.textContent = `You win! ${
        playerSelection[0].toUpperCase() + playerSelection.slice(1)
      } beats ${computerSelection}!`;
      return "playerWins";
    }
  } else if (playerSelection == "paper") {
    if (computerSelection == "rock") {
      content.textContent = `You win! ${
        playerSelection[0].toUpperCase() + playerSelection.slice(1)
      } beats ${computerSelection}!`;
      return "playerWins";
    } else if (computerSelection == "scissors") {
      content.textContent = `You lose! ${
        computerSelection[0].toUpperCase() + computerSelection.slice(1)
      } beats ${playerSelection}!`;
      return "computerWins";
    }
  } else if (playerSelection == "scissors") {
    if (computerSelection == "rock") {
      content.textContent = `You lose! ${
        computerSelection[0].toUpperCase() + computerSelection.slice(1)
      } beats ${playerSelection}!`;
      return "computerWins";
    } else {
      content.textContent = `You win! ${
        playerSelection[0].toUpperCase() + playerSelection.slice(1)
      } beats ${computerSelection}!`;
      return "playerWins";
    }
  }
}

function displayResults(playerScore, computerScore, roundCounter) {
  playerPoints.textContent = playerScore;
  displayPlayer.appendChild(playerPoints);

  computerPoints.textContent = computerScore;
  displayComputer.appendChild(computerPoints);

  roundNumber.textContent = roundCounter;

  if (roundCounter == 5) {
    results.classList.toggle("hidden");
    options.classList.add("hidden");

    container.appendChild(finalScore);
    document.getElementById("finalScore").appendChild(trophy);
    container.appendChild(playAgain);
    finalScore.appendChild(winner);

    if (playerScore == computerScore) {
      winner.textContent = `IT\'S A TIE!`;
    } else if (playerScore > computerScore) {
      winner.textContent = `PLAYER WON!`;
    } else {
      winner.textContent = `COMPUTER WON!`;
    }
  }
}

let i = 0;
let playerScore = 0;
let computerScore = 0;

const container = document.querySelector(".container");
const results = document.querySelector(".results");
const content = document.createElement("p");
results.appendChild(content);

const displayPlayer = document.querySelector(".display-player");
const displayNameP = document.querySelector(".display-name-p");
const playerPoints = document.createElement("p");
playerPoints.classList.add("p-display");

const displayComputer = document.querySelector(".display-computer");
const displayNameC = document.querySelector(".display-name-c");
const computerPoints = document.createElement("p");
computerPoints.classList.add("p-display");

const finalScore = document.createElement("div");
finalScore.setAttribute("id", "finalScore");
const trophy = document.createElement("img");
trophy.src = "images/thophy.png";
trophy.classList.add("trophy");
const winner = document.createElement("p");
winner.classList.add("winner");

const startMessage = document.querySelector(".start-message");

const roundDisplay = document.querySelector(".round");
const roundCount = document.querySelector(".board");
roundDisplay.appendChild(roundCount);
const roundNumber = document.createElement("p");
roundCount.appendChild(roundNumber);

const options = document.querySelector(".options");

const playAgain = document.createElement("button");
playAgain.classList.add("playAgain");
playAgain.textContent = "Play Again";
playAgain.addEventListener("click", function () {
  location.reload();
});

const playerChoiceImage = document.createElement("img");
playerChoiceImage.src = "images/default.png";
playerChoiceImage.classList.add("player-big-hand");
container.appendChild(playerChoiceImage);

const computerChoiceImage = document.createElement("img");
computerPlay.src = "images/rock.png";
computerChoiceImage.classList.add("computer-big-hand");
container.appendChild(computerChoiceImage);

const playerBoard = document.querySelector(".player-board");
const computerBoard = document.querySelector(".computer-board");

const placeholders = document.querySelectorAll(".placeholder");

const images = document.querySelectorAll("button");
images.forEach((button) => {
  button.addEventListener("click", () => {
    playerChoice = button.id;
    const computerChoice = computerPlay();
    playRound(playerChoice, computerChoice);
    let round = playRound(playerChoice, computerPlay());
    i++;

    if (playerChoice == "rock") {
      button.innerHTML = '<img class="btn-click" src="images/rock-hover.png">';
      setTimeout(function () {
        button.innerHTML = '<img class="btn-click" src="images/rock.png">';
      }, 300);
      playerChoiceImage.src = "images/rockbig.png";
    } else if (playerChoice == "paper") {
      button.innerHTML = '<img class="btn-click" src="images/paper-hover.png">';
      setTimeout(function () {
        button.innerHTML = '<img class="btn-click" src="images/paper.png">';
      }, 300);
      playerChoiceImage.src = "images/paperbig.png";
    } else {
      button.innerHTML =
        '<img class="btn-click" src="images/scissors-hover.png">';
      setTimeout(function () {
        button.innerHTML = '<img class="btn-click" src="images/scissors.png">';
      }, 300);
      playerChoiceImage.src = "images/scissorsbig.png";
    }

    if (round == "playerWins") {
      playerScore++;
      displayPlayer.classList.add("point-animation");
      displayNameP.classList.add("point-animation");
      playerBoard.classList.add("point");
      computerBoard.classList.add("lose");

      setTimeout(function () {
        displayPlayer.classList.remove("point-animation");
        displayNameP.classList.remove("point-animation");
      }, 300);
      setTimeout(function () {
        playerBoard.classList.remove("point");
        computerBoard.classList.remove("lose");
      }, 600);
    } else if (round == "computerWins") {
      computerScore++;
      displayComputer.classList.add("point-animation");
      displayNameC.classList.add("point-animation");
      computerBoard.classList.add("point");
      playerBoard.classList.add("lose");

      setTimeout(function () {
        displayComputer.classList.remove("point-animation");
        displayNameC.classList.remove("point-animation");
      }, 300);
      setTimeout(function () {
        computerBoard.classList.remove("point");
        playerBoard.classList.remove("lose");
      }, 600);
    }

    displayResults(playerScore, computerScore, i);

    placeholders.forEach((placeholder) => {
      placeholder.classList.add("hidden");
    });
    startMessage.classList.add("hidden");
    roundDisplay.classList.remove("hidden");
  });
});
