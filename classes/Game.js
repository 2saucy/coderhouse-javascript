import Card from './Card.js'

export default class Game {
  constructor(characters) {
    this.cards = [];
    this.activeCards = [];
    this.movements = characters.length * 2;
    this.initializeCards(characters);
    this.shuffleCards();
  }

  initializeCards = (characters) => {
    characters.forEach((character) => {
      this.cards.push(new Card(character))
      this.cards.push(new Card(character))
    })
  }

  shuffleCards = () => {
    //Metodo Fisher Yates Shuffle
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this.cards;
  }

  showCard = (card) => {
    if (!card.visibility && this.activeCards.length < 2) {
      card.toggleVisibility();
      this.activeCards.push(card);

      if (this.activeCards.length === 2) {
        this.movements--;
        setTimeout(() => {
          if (this.activeCards[0].value.name !== this.activeCards[1].value.name) {
            this.activeCards.forEach(card => card.toggleVisibility());
          }
          this.activeCards = [];
        }, 1000)
      }
    }
  }

  allVisibles = () => {
    return this.cards.every(card => card.visibility)
  }
}