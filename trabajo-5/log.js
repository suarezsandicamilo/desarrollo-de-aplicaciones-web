//

class Log {
  constructor(guest_name, guest_email, comment) {
    this.guest_name = guest_name;
    this.guest_email = guest_email;
    this.comment = comment;
    this.date = new Date();
  }

  /**
   * Returns a new instance of Log from a json string.
   * 
   * @param {string} json
   * @returns 
   */
  static fromJson(json) {
    const data = JSON.parse(json);

    const { guest_name, guest_email, comment } = data;

    return new Log(guest_name, guest_email, comment);
  }
}

export { Log };
