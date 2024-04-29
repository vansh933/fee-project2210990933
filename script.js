let userScore = 0;
let computerScore = 0;
let draws = 0;

const drawsSpan = document.getElementById("draws");
const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultDiv = document.querySelector("#message");
const resetButton = document.getElementById("reset-button")

const rockDiv = document.getElementById("rock");
const paperDiv = document.getElementById("paper");
const scissorsDiv = document.getElementById("scissors");

const userMoveButtons = document.querySelectorAll(".user-move");
const computerMoveButton = document.getElementById("computer-move");

const getComputerChoice = () => {
  const choiceList = ["rock", "paper", "scissors"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choiceList[randomNumber];
};

const convertToUp = (word) => {
  switch (word) {
    case "rock":
      return "Rock";
    case "paper":
      return "Paper";
    case "scissors":
      return "Scissors";
  }
};

const win = (userChoice, computerChoice) => {
  userScore++;
  userScoreSpan.innerHTML = userScore;
  const randomWin = ["beats", "smashes", "destroys", "obliterates"];
  const randomNumber = Math.floor(Math.random() * 4);
  const winEmojis = ["🤠", "🎉", "✨", "🎊", "🤩", "👌"]
  const randomNumberEmoji = Math.floor(Math.random() * 6);

  resultDiv.innerHTML = `${convertToUp(userChoice)} ${randomWin[randomNumber]} ${convertToUp(computerChoice)}. You win! ${winEmojis[randomNumberEmoji]}`;

  document.getElementById(userChoice).classList.add('win-border')
  setTimeout(() => document.getElementById(userChoice).classList.remove('win-border'), 600);
};

const lose = (userChoice, computerChoice) => {
  computerScore++;
  computerScoreSpan.innerHTML = computerScore;
  const randomWin = ["beats", "smashes", "destroys", "obliterates"];
  const randomNumber = Math.floor(Math.random() * 4);
  const loseEmojis = ["😩", "😥 ", "😭", "😵‍💫", "😔", "🤦🏽"]
  const randomNumberEmoji = Math.floor(Math.random() * 6);
  resultDiv.innerHTML = `${convertToUp(computerChoice)} ${randomWin[randomNumber]} ${convertToUp(userChoice)}. You lose! ${loseEmojis[randomNumberEmoji]}`;

  document.getElementById(userChoice).classList.add('lose-border');
  setTimeout(() => document.getElementById(userChoice).classList.remove('lose-border'), 600);

};

const tie = (userChoice, computerChoice) => {
  draws++;
  drawsSpan.innerHTML = draws;
  const tieEmojis = ["🤔", " 😱", "🙈", "🧐", "🙀", "🙃"];
  const randomNumberEmoji = Math.floor(Math.random() * 6);
  resultDiv.innerHTML = `${convertToUp(computerChoice)} matches ${convertToUp(userChoice)}. It's a tie! ${tieEmojis[randomNumberEmoji]}`;

  document.getElementById(userChoice).classList.add('tie-border');
  setTimeout(() => document.getElementById(userChoice).classList.remove('tie-border'), 600);
};

const game = (userChoice) => {
  // Disable user move buttons during the computer's move
  userMoveButtons.forEach(button => button.disabled = true);

  // Add identifier to user's move button
  document.getElementById(userChoice).classList.add('user-move-border');

  // Delay computer's move by 3 seconds
  setTimeout(() => {
    const computerChoice = getComputerChoice();

    // Remove identifier from user's move button
    document.getElementById(userChoice).classList.remove('user-move-border');

    // Enable user move buttons after the computer's move
    userMoveButtons.forEach(button => button.disabled = false);

    switch (userChoice + computerChoice) {
      case "paperrock":
      case "rockscissors":
      case "scissorspaper":
        win(userChoice, computerChoice);
        break;

      case "rockpaper":
      case "scissorsrock":
      case "paperscissors":
        lose(userChoice, computerChoice);
        break;

      case "rockrock":
      case "paperpaper":
      case "scissorsscissors":
        tie(userChoice, computerChoice);
        break;
    }
  }, 3000);
};


const resetScores = () => {
  computerScore = 0;
  computerScoreSpan.innerHTML = computerScore
  userScore = 0;
  userScoreSpan.innerHTML = userScore;
  draws = 0;
  drawsSpan.innerHTML = draws;
  resultDiv.innerHTML = 'Who will win this match ?';
};

const main = () => {
  rockDiv.addEventListener('click', () => game("rock"));

  paperDiv.addEventListener('click', () => game("paper"));

  scissorsDiv.addEventListener('click', () => game("scissors"));

  resetButton.addEventListener('click', () => resetScores());
  const game = (userChoice) => {
    // Disable user move buttons during the countdown and the computer's move
    userMoveButtons.forEach(button => button.disabled = true);
  
    // Add identifier to user's move button
    document.getElementById(userChoice).classList.add('user-move-border');
  
    // Show countdown for 3 seconds
    let count = 3;
    const countdownInterval = setInterval(() => {
      document.getElementById('timer').textContent = count;
      count--;
      if (count < 0) {
        clearInterval(countdownInterval);
        document.getElementById('timer').textContent = '';
        const computerChoice = getComputerChoice();
  
        // Remove identifier from user's move button
        document.getElementById(userChoice).classList.remove('user-move-border');
  
        // Display computer's choice
        document.getElementById('computer-move-text').textContent = `Computer chose ${convertToUp(computerChoice)}.`;
  
        // Enable user move buttons after the computer's move
        userMoveButtons.forEach(button => button.disabled = false);
  
        switch (userChoice + computerChoice) {
          case "paperrock":
          case "rockscissors":
          case "scissorspaper":
            win(userChoice, computerChoice);
            break;
  
          case "rockpaper":
          case "scissorsrock":
          case "paperscissors":
            lose(userChoice, computerChoice);
            break;
  
          case "rockrock":
          case "paperpaper":
          case "scissorsscissors":
            tie(userChoice, computerChoice);
            break;
        }
      }
    }, 1000);
  };
  
};


main();

