import Game from "./classes/Game.js";
import {
  ALL_CHARACTERS,
  ALL_DIFICULTIES,
  DEFAULT_DIFFICULTY
} from "./constants.js";

const body = document.querySelector('body');
const display = document.querySelector('.display');
const counter = document.querySelector('.counter');
const selectDifficulty = document.querySelector('#difficulty');
const buttonTheme = document.querySelector('.theme-switcher');
const historyButton = document.querySelector('.history-button');

const Confetti = () => {
  const confettiConfig = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  }

  confetti(confettiConfig);
}

const ResultHandler = (result) => {
  if (result) {
    Confetti()
    gameHistory.wins[currentDifficulty.mode] += 1
  } else {
    gameHistory.loses[currentDifficulty.mode] += 1
  }

  Swal.fire({
    icon: `${result ? "success" : "error"}`,
    title: `You ${result ? "won! 🤗" : "lost! 😔"}`,
  }).then(() => {
    // Save game history data to localStorage
    localStorage.setItem("history", JSON.stringify(gameHistory))

    // Reset 
    ClearDisplay();
    Run();
  })
}

const GetCharacters = (amount) => {
  const copyAllCharacters = [...ALL_CHARACTERS];
  const randomCharacters = [];

  while (randomCharacters.length < amount) {
    const randomIndex = Math.floor(Math.random() * copyAllCharacters.length);
    const selectedCharacter = copyAllCharacters.splice(randomIndex, 1)[0];
    randomCharacters.push(selectedCharacter);
  }

  return randomCharacters;
}

const SwitchTheme = () => {
  const currentTheme = body.getAttribute("data-theme");
  body.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
}

const ClearDisplay = () => {
  display.innerHTML = ''
}

const GenerateDOM = (cards) => {
  cards.forEach((card, index) => {
    card.element.style.animation = `fadeInRight ${(index + 1) * 100}ms ease-in-out`
    display.appendChild(card.element)
  })
}

const ChangeDifficulty = () => {
  currentDifficulty = ALL_DIFICULTIES[selectDifficulty.value];
  display.setAttribute("data-difficulty", selectDifficulty.value)
  ClearDisplay();
  Run();
}

const GetGameHistory = () => {
  let history = JSON.parse(localStorage.getItem("history"))

  if (!history) {
    history = {
      wins: { easy: 0, normal: 0, hard: 0, xD: 0 },
      loses: { easy: 0, normal: 0, hard: 0, xD: 0 },
    }

    localStorage.setItem("history", JSON.stringify(history))
  }

  return history;
}

const GameHistoryModal = () => {
  Swal.fire({
    titleText: "History",
    html: `
      <div style="display: flex">
        <div style="text-align: left">
          ${Object.values(ALL_DIFICULTIES)
        .map(({ mode }) => `✔️ Wins on ${mode}: ${gameHistory.wins[mode]} <br>`)
        .join("")
      }
        </div>
        <hr>
        <div style="text-align: left">
          ${Object.values(ALL_DIFICULTIES)
        .map(({ mode }) => `❌ Loses on ${mode}: ${gameHistory.loses[mode]} <br>`)
        .join("")
      }
        </div>
      </div>
    `,
    showCloseButton: true,
  })
}

const Run = () => {
  const characters = GetCharacters(currentDifficulty.val);
  const game = new Game(characters);

  counter.textContent = game.movements;
  GenerateDOM(game.cards);

  game.cards.forEach((card) => {
    card.element.onclick = () => {
      game.showCard(card)
      counter.textContent = game.movements;

      if (game.allVisibles() && game.movements >= 0) {
        ResultHandler(true)
      }

      if (!game.allVisibles() && game.movements <= 0) {
        ResultHandler(false)
      }
    }
  })

}

// Global Variables 

let currentDifficulty = DEFAULT_DIFFICULTY;
let gameHistory = GetGameHistory();

Run();

buttonTheme.addEventListener('click', SwitchTheme);
historyButton.addEventListener('click', GameHistoryModal);
selectDifficulty.addEventListener('change', ChangeDifficulty);