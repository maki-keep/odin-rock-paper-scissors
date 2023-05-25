const prompt = require("prompt-sync")();

const choices = ['rock', 'paper', 'scissors'];

class Player {
  constructor(isUser) {
    this.isUser = isUser;
    this.score = 0;
  }

  _isUser;
  _score;

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
    this._score = payload;
  }

  incrementScore() {
    this.score = this.score + 1;
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
      result = 'lost';
    } else if (computerChoice === getChoices()[2]) /* scissors */ {
      result = 'won';
    } else {
      result = 'tied';
    }
  } else if (userChoice === getChoices()[1]) /* paper */ {
    if (computerChoice === getChoices()[0]) /* rock */ {
      result = 'won';
    } else if (computerChoice === getChoices()[2]) /* scissors */ {
      result = 'lost';
    } else {
      result = 'tied';
    }
  } else /* scissors */ {
    if (computerChoice === getChoices()[1]) /* paper */ {
      result = 'won';
    } else if (computerChoice === getChoices()[0]) /* rock */ {
      result = 'lost';
    } else {
      result = 'tied';
    }
  }
  return result;
}

const userPlayer = new Player(true);
const computerPlayer = new Player(false);

console.log("0 - Rock\n1 - Paper\n2 - Scissors");
let input;
let valid = false;
let endCondition = false;

do {
  input = prompt("Enter choice: ", "0");
  valid = input === "0" || input === "1" || input === "2";

  if (valid) {
    // playing
    const userChoice = getChoices()[parseInt(input, 10)];
    const computerChoice = getComputerChoice();
    console.log("Playing...");
    console.log(`User (${userPlayer.score}/2): ${userChoice}`);
    console.log(`Computer (${computerPlayer.score}/2): ${computerChoice}`);
    const outcome = getOutcome(userChoice, computerChoice);

    if (outcome === 'won') {
      userPlayer.incrementScore();
    } else if (outcome === 'lost') {
      computerPlayer.incrementScore();
    }

    // endgame
    endCondition = userPlayer.score >= 2 || computerPlayer.score >= 2;

    if (endCondition) {
      console.log(`You ${outcome} the game.`);
    } else {
      console.log(`You ${outcome} a round.`);
    }
  } else {
    console.log("Invalid choice.");
  }
} while(!endCondition);
