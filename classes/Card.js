export default class Card {
  constructor(value) {
      this.value = value;
      this.visibility = false;
  }

  show = () => {
      this.visibility = true;
      const front = this.element.querySelector('.front');
      front.style.display = "block"
      const back = this.element.querySelector('.back');
      back.style.display = "none"
  }

  hide = () => {
      this.visibility = false;
      const front = this.element.querySelector('.front');
      front.style.display = "none"
      const back = this.element.querySelector('.back');
      back.style.display = "block"
  }
}