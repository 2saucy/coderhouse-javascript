import { characters, difficulties } from "./data.js";
import Game from "./classes/Game.js";
const body = document.querySelector('body');
const select = document.querySelector('#difficulty')
const display = document.querySelector('.display');
const counter = document.querySelector('.counter')
const buttonTheme = document.querySelector('.theme-switcher');
const winCounterSpan = document.querySelector('.wins-counter');
const loseCounterSpan = document.querySelector('.loses-counter');

let currentDifficulty = [difficulties.easy];

const handleWin = (currentRecord) => {
    setTimeout(() => {
        alert("You Win")
        currentRecord.wins++
        localStorage.setItem("record", JSON.stringify(currentRecord))
        reset(currentDifficulty)
    }, 1000)
}

const handleLose = (currentRecord) => {
    setTimeout(() => {
        alert("You Lose")
        currentRecord.loses++
        localStorage.setItem("record", JSON.stringify(currentRecord))
        reset(currentDifficulty)
    }, 1000)
}

const getRecordGames = () => {
    return JSON.parse(localStorage.getItem("record"))
}

const setRecordGames = (object) => {
    localStorage.setItem("record", JSON.stringify(object))
}

const setAOS = (element, effect, duration, ease) => {
    element.setAttribute("data-aos", effect);
    element.setAttribute("data-aos-duration", duration);
    element.setAttribute("data-aos-easing", ease)
}

const reset = (difficulty) => {
    clearDisplay();
    const newCharacters = getCharacters(characters, difficulty);
    run(newCharacters);
}

const getCharacters = (characters, amount) => {
    const allCharacters = [...characters];
    const randomCharacters = [];

    while(randomCharacters.length < amount){
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        const selectedCharacter = allCharacters.splice(randomIndex, 1)[0];
        randomCharacters.push(selectedCharacter);
    }

    return randomCharacters;
}

const SwitchTheme = () => {
    const currentTheme = body.getAttribute("data-theme");
    body.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
}

const clearDisplay = () => {
    display.innerHTML = ''
}

const generateDOM = (cards) => {
    cards.forEach((card, index) => {
        const div = document.createElement('div')
        div.classList.add('card')
        setAOS(div, "fade-up", (index + 2) * 100, "ease-out")


        const frontCard = document.createElement('img')
        frontCard.src = card.value.img
        frontCard.classList.add('front')
        frontCard.style.display = "none"

        const backCard = document.createElement('img')
        backCard.classList.add('back')
        backCard.src = "../assets/reverse.webp"

        div.appendChild(frontCard)
        div.appendChild(backCard)

        card.element = div

        display.appendChild(card.element)
    })
}

const changeDifficulty = () => {
    currentDifficulty = difficulties[select.value];
    display.setAttribute("data-difficulty", select.value)
    reset(currentDifficulty);
}

const run = (characters) => {
    let currentRecord = getRecordGames();

    if(!currentRecord) {
        setRecordGames({
            wins: 0,
            loses: 0,
        })
        currentRecord = getRecordGames();
    }

    winCounterSpan.textContent = currentRecord.wins;
    loseCounterSpan.textContent = currentRecord.loses;

    const game = new Game(characters);

    counter.textContent = game.movements;

    generateDOM(game.cards);

    game.cards.forEach((card) => {
        card.element.onclick = () => {
            game.showCard(card)
            counter.textContent = game.movements;

            // Si todas las cartas estan visibles y la cantidad de movimientos es mayor o igual a 0 se gana
            if(game.allVisibles() && game.movements >= 0){
                handleWin(currentRecord);
            }
            
            // Si no todas las cartas estan visibles y la cantidad de movimientos es menor o igual a 0 se pierde
            if(!game.allVisibles() && game.movements <= 0){
                handleLose(currentRecord);
            }
        }
    })
}

select.addEventListener('change', changeDifficulty);
buttonTheme.addEventListener('click', SwitchTheme);

const newCharacters = getCharacters(characters, currentDifficulty)
run(newCharacters)




