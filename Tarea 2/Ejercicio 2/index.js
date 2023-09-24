//

class MyCardComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const template = document.querySelector("#my-card");

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("my-card", MyCardComponent);
