export class Popup {
  constructor() {
    this.options = {
      attributeOpen: 'data-open-popup',
      attributeParams: 'data-params-popup',
      contentClass: 'popup-content',
      containerClass: 'popup-container',
      contentOpenClass: 'is-open',
      contentClosingClass: 'is-closing'
    };

    this.listeners = [];

    this.container = this.createContainer();

    this.container.addEventListener('click', this.close.bind(this));

    document.body.appendChild(this.container);
  }

  createContainer() {
    const container = document.createElement('div');
    container.classList.add(this.options.containerClass);

    const content = document.createElement('div');
    content.classList.add(this.options.contentClass);

    container.appendChild(content);

    return container;
  }

  attach(item) {
    const type = item.getAttribute(this.options.attributeOpen);
    const params = item.getAttribute(this.options.attributeParams);

    if (!type) {
      return false;
    }

    if (params) {
      try {
        const data = JSON.parse(params);
        item.addEventListener('click', this.open.bind(this, type, data));
      } catch (err) {
        throw new Error(err);
      }
      return false;
    }

    item.addEventListener('click', this.open.bind(this, type, null));
  }

  open(type, data) {
    // TODO Add more cases later, after discuss
    switch (type) {
      case 'text':
        return this.addContent(data.content);
      case 'html':
        return fetch(data.url)
          .then(resp => {
            return resp.text();
          })
          .then(content => this.addContent(content));
      default:
        break;
    }
  }

  close(e) {
    if (this.container === e.target) {
      this.container.classList.add(this.options.contentClosingClass);
      this.container.classList.remove(this.options.contentOpenClass);

      setTimeout(() => {
        this.container.classList.remove(this.options.contentClosingClass);
      }, 550);
    }
  }

  addContent(body) {
    this.container.classList.add(this.options.contentOpenClass);
    this.container.querySelector(
      `.${this.options.contentClass}`
    ).innerHTML = body;

    return true;
  }
}

export default new Popup();
