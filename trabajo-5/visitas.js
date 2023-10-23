//

const fs = require("fs");
const http = require("http");
const path = require("path");

// Server settings

const PORT = 0;

const HOSTNAME = "0.0.0.0";

// Data settings

const PROJECT_DIRECTORY = path.resolve("");

const DATA_FILE = "./data/guest_logs.json";

const DEFAULT_CONTENT_TYPE = "text/plain";

const CONTENT_TYPES = {
  ".txt": "text/plain",
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
};

// Classes

class GuestLog {
  constructor(name, email, comment) {
    this.name = name;
    this.email = email;
    this.comment = comment;
    this.date = new Date();
  }

  /**
   * Returns a new instance of GuestLog from a json string.
   *
   * @param {string} json The input.
   * @returns A new instance of GuestLog.
   */
  static fromJson(json) {
    const data = JSON.parse(json);

    const { name, email, comment } = data;

    return new GuestLog(name, email, comment);
  }
}

class GuestLogsApp {
  constructor() {
    this.createDataFile();
  }

  /**
   * Creates the data file it it doesn't exist.
   */
  createDataFile() {
    const real_file_path = path.join(PROJECT_DIRECTORY, DATA_FILE);

    if (!fs.existsSync(real_file_path)) {
      const data = JSON.stringify({ values: [] }, null, 2);

      fs.writeFileSync(real_file_path, data, "UTF-8");
    }
  }

  /**
   * Handles the routes.
   *
   * @param {http.IncomingMessage} req An http request.
   * @param {http.ServerResponse<http.IncomingMessage>} res An http response.
   * @returns {boolean} true if app handles a route.
   */
  route(req, res) {
    if (req.url == "/") {
      this.serveIndex(res);
      return true;
    }

    if (req.url == "/list-guest-logs") {
      this.servePage(res, "./pages/list-guest-logs.html");
      return true;
    }

    if (this.serveStatic(req, res)) {
      return true;
    }

    if (req.url.startsWith("/add-guest-log") && req.method == "POST") {
      this.addGuestLog(req, res);
      return true;
    }

    if (req.url.startsWith("/get-guest-logs") && req.method == "GET") {
      this.getGuestLogs(res);
      return true;
    }

    return false;
  }

  /**
   * Serves the index page.
   *
   * @param {http.ServerResponse<http.IncomingMessage>} res An http response.
   */
  serveIndex(res) {
    this.servePage(res, "./pages/index.html");
  }

  /**
   * Serves the index page.
   *
   * @param {http.ServerResponse<http.IncomingMessage>} res An http response.
   */
  servePage(res, file_path) {
    const data = this.readFile(file_path);

    if (data.length === 0) {
      res.statusCode = 500;
      return;
    }

    res.setHeader("Content-Type", "text/html");
    res.write(data);
  }

  /**
   * Serves the static files in the public directory.
   *
   * @param {http.IncomingMessage} req An http request.
   * @param {http.ServerResponse<http.IncomingMessage>} res An http response.
   * @returns {boolean} true if the file is served.
   */
  serveStatic(req, res) {
    const file_path = `./public/${req.url}`;

    const data = this.readFile(file_path);

    if (data.length === 0) {
      return false;
    }

    const extension = path.extname(file_path);

    const contentType = CONTENT_TYPES[extension] ?? DEFAULT_CONTENT_TYPE;

    res.setHeader("Content-Type", contentType);
    res.write(data);

    return true;
  }

  /**
   * Reads a file and returns the data of the file.
   *
   * @param {string} file_path The relative path of the file.
   * @returns {string} A string with the data of the file if found, or an empty string if not found.
   */
  readFile(file_path) {
    const real_file_path = path.join(PROJECT_DIRECTORY, file_path);

    if (!fs.existsSync(real_file_path)) {
      return "";
    }

    return fs.readFileSync(real_file_path, "UTF-8");
  }

  /**
   * Adds a guest log to the list of guest logs and saves it.
   *
   * @param {http.IncomingMessage} req An http request.
   * @param {http.ServerResponse<http.IncomingMessage>} res An http response.
   */
  addGuestLog(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      // Read the guest logs from the data file
      const host = req.headers.host;

      const response = await fetch(`http://${host}/get-guest-logs`, {
        method: "GET",
      });

      const data = await response.json();

      const values = data.values;

      // Add a new guest log
      const guest_log = GuestLog.fromJson(body);

      values.push(guest_log);

      // Write the guest logs to the data file
      const real_file_path = path.join(PROJECT_DIRECTORY, DATA_FILE);

      fs.writeFileSync(
        real_file_path,
        JSON.stringify({ values }, null, 2),
        "UTF-8"
      );

      res.end();
    });
  }

  /**
   * Serves a json with all of the guest logs.
   *
   * @param {http.ServerResponse<http.IncomingMessage>} res An http response.
   */
  getGuestLogs(res) {
    const real_file_path = path.join(PROJECT_DIRECTORY, DATA_FILE);

    const data = fs.readFileSync(real_file_path, "UTF-8");

    res.setHeader("Content-Type", "application/json");
    res.write(data);
  }
}

const app = new GuestLogsApp();

const server = http.createServer((req, res) => {
  if (app.route(req, res)) {
    res.statusCode = 200;
    res.end();
    return;
  }

  res.statusCode = 404;
  res.end();
});

server.listen(PORT, HOSTNAME, () => {
  const address = server.address();

  console.log(`Server running at http://${address.address}:${address.port}`);
});
