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

class GuestLog {
  constructor(name, email, comment, date) {
    this.name = name;
    this.email = email;
    this.comment = comment;
    this.date = date;
  }

  static fromJson(json) {
    const { name, email, comment, date } = json;

    return new GuestLog(name, email, comment, date);
  }

  render() {
    const element = document.createElement("guest-log");

    const name_element = document.createElement("span");
    name_element.setAttribute("slot", "name");
    name_element.textContent = this.name;

    const email_element = document.createElement("span");
    email_element.setAttribute("slot", "email");
    email_element.textContent = this.email;

    const comment_element = document.createElement("span");
    comment_element.setAttribute("slot", "comment");
    comment_element.textContent = this.comment;

    const date_element = document.createElement("span");
    date_element.setAttribute("slot", "date");

    const date = new Date(this.date).toLocaleDateString("es-cr", {
      dateStyle: "long",
    });

    const time = new Date(this.date).toLocaleTimeString("es-cr", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h12",
    });

    date_element.textContent = `${date}, ${time}`;

    element.appendChild(name_element);
    element.appendChild(email_element);
    element.appendChild(comment_element);
    element.appendChild(date_element);

    return element;
  }
}

const add_guest_logs_form_element = document.querySelector(
  "#add-guest-log-form"
);

const guest_logs_element = document.querySelector("#guest-logs");

const getGuestLogs = async () => {
  const response = await fetch("/get-guest-logs");

  const json = await response.json();

  for (const guest_log_json_object of json.values) {
    const guest_log = GuestLog.fromJson(guest_log_json_object);

    const guest_log_element = guest_log.render();

    guest_logs_element?.appendChild(guest_log_element);
  }
};

const addGuestLog = async (event) => {
  event.preventDefault();

  const data = new FormData(add_guest_logs_form_element);

  const name = data.get("name");
  const email = data.get("email");
  const comment = data.get("comment");

  const response = await fetch("/add-guest-log", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
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

add_guest_logs_form_element?.addEventListener("submit", addGuestLog);

getGuestLogs();
