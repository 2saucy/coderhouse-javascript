export default class Card {
  constructor(value) {
    this.value = value;
    this.visibility = false;
    this.element = this.createElement();
  }

  createImageElement = (src, className) => {
    const imageElement = document.createElement('img');
    imageElement.src = src;
    imageElement.classList.add(className);

    if (className === "front") {
      imageElement.style.display = "none";
    }

    return imageElement
  }

  createElement = () => {
    const cardElement = document.createElement('div')
    cardElement.classList.add('card')

    const frontCard = this.createImageElement(this.value.img, "front")
    cardElement.appendChild(frontCard)

    const backCard = this.createImageElement("../assets/reverse.webp", "back")
    cardElement.appendChild(backCard)

    return cardElement
  }

  toggleVisibility = () => {
    this.visibility = !this.visibility

    if (this.visibility) {
      this.element.querySelector('.front').style.display = "block"
      this.element.querySelector('.back').style.display = "none"
    } else {
      this.element.querySelector('.front').style.display = "none"
      this.element.querySelector('.back').style.display = "block"
    }
  }
}