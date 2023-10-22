//

class GuestLogComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const template = document.querySelector("#guest-log-template");

    if (template) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}

customElements.define("guest-log", GuestLogComponent);

class Log {
  constructor(guest_name, guest_email, comment, date) {
    this.guest_name = guest_name;
    this.guest_email = guest_email;
    this.comment = comment;
    this.date = date;
  }

  static fromJson(json) {
    const { guest_name, guest_email, comment, date } = json;

    return new Log(guest_name, guest_email, comment, date);
  }

  render() {
    const element = document.createElement("guest-log");

    const guest_name_element = document.createElement("span");
    guest_name_element.setAttribute("slot", "guest-name");
    guest_name_element.textContent = this.guest_name;

    const guest_email_element = document.createElement("span");
    guest_email_element.setAttribute("slot", "guest-email");
    guest_email_element.textContent = this.guest_email;

    const comment_element = document.createElement("span");
    comment_element.setAttribute("slot", "comment");
    comment_element.textContent = this.comment;

    const date_element = document.createElement("span");
    date_element.setAttribute("slot", "date");

    const date = new Date(this.date).toLocaleDateString("es-cr", {
      dateStyle: "long",
    });

    const time = new Date(this.date).toLocaleTimeString('es-cr', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h12'
    });

    date_element.textContent = `${date}, ${time}`;

    element.appendChild(guest_name_element);
    element.appendChild(guest_email_element);
    element.appendChild(comment_element);
    element.appendChild(date_element);

    return element;
  }
}

const add_logs_form_element = document.querySelector("#add-log-form");

const logs_element = document.querySelector("#logs");

const getLogs = async () => {
  const response = await fetch("/get-logs");

  const json = await response.json();

  for (const log_json_object of json.logs) {
    const log = Log.fromJson(log_json_object);

    const log_element = log.render();

    logs_element?.appendChild(log_element);
  }
};

const addLog = async (event) => {
  event.preventDefault();

  const data = new FormData(add_logs_form_element);

  const guest_name = data.get("guest-name");
  const guest_email = data.get("guest-email");
  const comment = data.get("comment");

  const response = await fetch("/add-log", {
    method: "POST",
    body: JSON.stringify({
      guest_name,
      guest_email,
      comment,
    }),
  });

  if (response.status === 200) {
    window.alert("Comentario agregado.");
    window.location.reload();
  } else {
    window.alert(`Error: ${response.status}`);
  }
};

add_logs_form_element?.addEventListener("submit", addLog);

getLogs();
