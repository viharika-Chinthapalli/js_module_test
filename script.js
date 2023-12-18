document.addEventListener("DOMContentLoaded", () => {
  const rockButton = document.querySelector(".bottom .rock");
  const paperButton = document.querySelector(".bottom .paper");
  const scissorButton = document.querySelector(".bottom .scissor");
  const bottomContainer = document.querySelector(".bottom");
  const resultContainer = document.querySelector(".result");
  const player = document.querySelector(".player-choice");
  const computer = document.querySelector(".computer-choice");
  const playerColor = document.querySelector("#player-color");
  const computerColor = document.querySelector("#computer-color");
  const winner = document.querySelector(".txt");
  const nextBtn = document.querySelector(".next");
  const container = document.querySelector(".container");
  const won = document.querySelector(".won");
  const wonBtn = document.querySelector(".won button");
  resultContainer.style.display = "none";
  won.style.display = "none";

  let computerChoice = getComputerChoice();
  let userScore = parseInt(localStorage.getItem("userScore")) || 0;
  let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
  updateScores(userScore, computerScore);

  function toggleVisibility() {
    bottomContainer.style.display = "none";
    resultContainer.style.display = "flex";
  }

  function getComputerChoice() {
    const choices = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  }

  function updateComputerImage() {
    if (computerChoice === "rock") {
      computer.src = "assets/icons8-fist-67 1.png";
      computerColor.classList.add("rock");
    } else if (computerChoice === "paper") {
      computer.src = "assets/icons8-hand-64 1.png";
      computerColor.classList.add("paper");
    } else {
      computer.src = "assets/17911 1.png";
      computerColor.classList.add("scissor");
    }
  }

  function playGame(userChoice) {
    const result = determineWinner(userChoice, computerChoice);
    const computerAnim = document.querySelector(".pick:nth-child(3) .anim");
    const playerAnim = document.querySelector(".pick .anim");
    nextBtn.style.display = "none";
    nextBtn.addEventListener("click", () => {
      container.style.display = "none";
      won.style.display = "block";
      nextBtn.style.display = "none";
    });
    wonBtn.addEventListener("click", () => {
      window.location.reload();
    });
    if (result === "You win!") {
      userScore++;
      showPlayerAnimation();
      nextBtn.style.display = "block";
    } else if (result === "Computer wins!") {
      computerScore++;
      showComputerAnimation();
    } else if (result === "It's a tie!") {
      playerAnim.style.display = "none";
      computerAnim.style.display = "none";
    }
    localStorage.setItem("userScore", userScore);
    localStorage.setItem("computerScore", computerScore);
    function showPlayerAnimation() {
      playerAnim.style.display = "block";
      computerAnim.style.display = "none";
    }
    function showComputerAnimation() {
      playerAnim.style.display = "none";
      computerAnim.style.display = "block";
    }
    updateScores(userScore, computerScore);
  }

  function determineWinner(userChoice, computerChoice) {
    winner.innerHTML = "";
    if (userChoice === computerChoice) {
      let newElement = document.createElement("p");
      newElement.innerHTML = "TIE UP";
      let button = document.createElement("button");
      button.innerHTML = "REPLAY";
      winner.appendChild(newElement);
      winner.appendChild(button);
      button.addEventListener("click", function () {
        bottomContainer.style.display = "flex";
        resultContainer.style.display = "none";
        nextBtn.style.display = "none";
      });
      return "It's a tie!";
    } else if (
      (userChoice === "rock" && computerChoice === "scissor") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissor" && computerChoice === "paper")
    ) {
      let newElement1 = document.createElement("p");
      let newElement2 = document.createElement("p");
      let button = document.createElement("button");
      newElement1.innerHTML = "YOU WIN";
      newElement2.innerHTML = "AGAINST PC";
      button.innerHTML = "PLAY AGAIN";
      winner.appendChild(newElement1);
      winner.appendChild(newElement2);
      winner.appendChild(button);
      button.addEventListener("click", function () {
        bottomContainer.style.display = "flex";
        resultContainer.style.display = "none";
        nextBtn.style.display = "none";
      });
      return "You win!";
    } else {
      let newElement1 = document.createElement("p");
      let newElement2 = document.createElement("p");
      let button = document.createElement("button");
      newElement1.innerHTML = "YOU LOST";
      newElement2.innerHTML = "AGAINST PC";
      button.innerHTML = "PLAY AGAIN";
      winner.appendChild(newElement1);
      winner.appendChild(newElement2);
      winner.appendChild(button);
      button.addEventListener("click", function () {
        bottomContainer.style.display = "flex";
        resultContainer.style.display = "none";
        nextBtn.style.display = "none";
      });
      return "Computer wins!";
    }
  }

  function updateScores(userScore, computerScore) {
    document.getElementById("my-score").innerText = userScore;
    document.getElementById("com-score").innerText = computerScore;
  }

  rockButton.addEventListener("click", () => {
    toggleVisibility();
    bottomContainer.style.display = "none";
    playGame("rock");
    player.src = "assets/icons8-fist-67 1.png";
    updateComputerImage();
    playerColor.classList.remove("paper", "scissor");
    playerColor.classList.add("rock");
  });

  paperButton.addEventListener("click", () => {
    toggleVisibility();
    bottomContainer.style.display = "none";
    playGame("paper");
    player.src = "assets/icons8-hand-64 1.png";
    updateComputerImage();
    playerColor.classList.remove("rock", "scissor");
    playerColor.classList.add("paper");
  });

  scissorButton.addEventListener("click", () => {
    toggleVisibility();
    bottomContainer.style.display = "none";
    playGame("scissor");
    player.src = "assets/17911 1.png";
    updateComputerImage();
    playerColor.classList.remove("rock", "paper");
    playerColor.classList.add("scissor");
  });

  document.querySelector(".rules").addEventListener("click", () => {
    document.getElementById("rules-popup").style.display = "flex";
  });

  document.getElementById("close-button").addEventListener("click", () => {
    document.getElementById("rules-popup").style.display = "none";
  });
});
