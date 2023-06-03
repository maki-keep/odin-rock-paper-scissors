const choices = ["rock", "paper", "scissors"];

class Player {
  constructor(props) {
    this.isUser = typeof props !== "undefined" && Object.hasOwn(props, "isUser") ? props.isUser : false;
    this.score = 0;
  }

  get isUser() {
    return this._isUser;
  }
  get score() {
    return this._score;
  }

  set isUser(payload) {
    if (typeof payload === "boolean") {
      this._isUser = payload;
    } else {
      throw new Error("isUser must be a boolean.");
    }
  }
  set score(payload) {
    if (typeof payload === "number") {
      this._score = payload;
    } else {
      throw new Error("score must be a number.");
    }
  }

  incrementScore() {
    this.score = this.score + 1;
  }
}

class GameStats {
  constructor() {
    this.endCondition = false;
    this.outcome = "";
  }

  get endCondition() {
    return this._endCondition;
  }
  get outcome() {
    return this._outcome;
  }

  set endCondition(payload) {
    if (typeof payload === "boolean") {
      this._endCondition = payload;
    } else {
      throw new Error("endCondition must be a boolean.");
    }
  }
  set outcome(payload) {
    if (typeof payload === "string") {
      this._outcome = payload;
    } else {
      throw new Error("outcome must be a string.");
    }
  }
}

function getChoices() {
  return choices;
}

function getComputerChoice() {
  return getChoices()[Math.floor(Math.random() * getChoices().length)];
}

function getOutcome(userChoice, computerChoice) {
  let result;
  if (userChoice === getChoices()[0]) /* rock */ {
    if (computerChoice === getChoices()[1]) /* paper */ {
      result = "lost";
    } else if (computerChoice === getChoices()[2]) /* scissors */ {
      result = "won";
    } else {
      result = "tied";
    }
  } else if (userChoice === getChoices()[1]) /* paper */ {
    if (computerChoice === getChoices()[0]) /* rock */ {
      result = "won";
    } else if (computerChoice === getChoices()[2]) /* scissors */ {
      result = "lost";
    } else {
      result = "tied";
    }
  } else /* scissors */ {
    if (computerChoice === getChoices()[1]) /* paper */ {
      result = "won";
    } else if (computerChoice === getChoices()[0]) /* rock */ {
      result = "lost";
    } else {
      result = "tied";
    }
  }
  return result;
}

function move(index) {
  const {rockButton, paperButton, scissorsButton, playButton, statusMessage} = elements;

  stats.outcome = getOutcome(getChoices()[index], getComputerChoice());
  if (stats.outcome === "won") {
    userPlayer.incrementScore();
  } else if (stats.outcome === "lost") {
    computerPlayer.incrementScore();
  }

  console.log(userPlayer);
  console.log(computerPlayer);
  // endgame
  stats.endCondition = userPlayer.score >= 2 || computerPlayer.score >= 2;

  if (stats.endCondition) {
    rockButton.removeEventListener("click", handleRock);
    rockButton.style.display = "none";

    paperButton.removeEventListener("click", handlePaper);
    paperButton.style.display = "none";

    scissorsButton.removeEventListener("click", handleScissors);
    scissorsButton.style.display = "none";

    playButton.innerHTML = "Play again";
    playButton.style.display = "block";
    playButton.addEventListener("click", handlePlay);

    statusMessage.innerHTML = `User: ${userPlayer.score}<br />Computer: ${computerPlayer.score}<br />You ${stats.outcome} the game.`;

    // removes won/lost outcome and sets scores to 0
    resetStats();
  } else {
    statusMessage.innerHTML = `User: ${userPlayer.score}<br />Computer: ${computerPlayer.score}<br />You ${stats.outcome} a round.`;
  }
}

function play() {
  const {playButton, statusMessage, rockButton, paperButton, scissorsButton} = elements;

  playButton.removeEventListener("click", handlePlay);
  playButton.style.display = "none";

  statusMessage.innerHTML = `User: ${userPlayer.score}<br />Computer: ${computerPlayer.score}<br />Computer has joined the game.`;

  rockButton.style.display = "block";
  rockButton.addEventListener("click", handleRock);

  paperButton.style.display = "block";
  paperButton.addEventListener("click", handlePaper);

  scissorsButton.style.display = "block";
  scissorsButton.addEventListener("click", handleScissors);
}

function resetStats() {
  stats.endCondition = false;
  stats.outcome = "";
  userPlayer.score = 0;
  computerPlayer.score = 0;
}

// game and players
const stats = new GameStats();
const userPlayer = new Player({isUser: true});
const computerPlayer = new Player();

// DOM variables
const elements = {};
elements.playButton = document.getElementById("play");
elements.rockButton = document.getElementById("rock");
elements.paperButton = document.getElementById("paper");
elements.scissorsButton = document.getElementById("scissors");
elements.statusMessage = document.getElementById("status");

const handlePlay = () => {
  play();
};
const handleRock = () => {
  move(0);
};
const handlePaper = () => {
  move(1);
};
const handleScissors = () => {
  move(2);
};

elements.playButton.style.display = "block";
elements.playButton.addEventListener("click", handlePlay);
