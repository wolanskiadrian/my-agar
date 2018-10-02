export class Popup {
  constructor() {
    this.listeners = [];

    this.container = this.createContainer();
    
    // this.container.querySelector(:not(.popup-content)').addEventListener('click', this.close);
    console.log(document.querySelector('.popup-container:not(.popup-content)'));
    document.body.appendChild(this.container);
    this.i = 0;
  }

  createContainer() {
    const container = document.createElement("div");
    container.classList.add("popup-container");

    const content = document.createElement("div");
    content.classList.add("popup-content");

    container.appendChild(content);

    return container;
  }

  attach(item) {
    const type = item.getAttribute("data-open-popup");
    const params = item.getAttribute("data-params-popup");

    if (!type) {
      return false;
    }

    if (params) {
      try {
        const data = JSON.parse(params);
        item.addEventListener("click", this.open.bind(this, type, data));
      } catch (err) {
        throw new Error(err);
      }
      return false;
    }

    item.addEventListener("click", this.open.bind(this, type, null));
  }

  open(type, data) {
    switch (type) {
      case "instruction":
        return this.addContent(
          "Lorem ipsum dolor sit amet",
          `Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
        officia deserunt mollit anim id est laborum.`
        );
      case "question":
        return this.question(data);
      case "answer":
        return this.answer(data);
      default:
        break;
    }
  }
  
  close() {
    console.log(lorem, this.i++);
  }

  question() {}

  answer() {}

  addContent(title, body) {
    this.container.classList.add("is-open");
    this.container.querySelector('.popup-content').innerHTML = body;
  }
}

export default new Popup();
