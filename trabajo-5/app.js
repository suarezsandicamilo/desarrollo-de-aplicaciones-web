//

import fs from "fs";
import http from "http";
import path from "path";

import { Log } from "./log.js";

const PROJECT_DIRECTORY = path.resolve("");

const LOGS_FILE_PATH = "./data/logs.json";

const DEFAULT_CONTENT_TYPE = "application/octet-stream";

const CONTENT_TYPES = {
  ".txt": "text/plain",
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
};

class App {
  constructor() {
    this.createLogsFile();
  }

  /**
   * Creates the logs file it it doesn't exist.
   */
  createLogsFile() {
    const real_file_path = path.join(PROJECT_DIRECTORY, LOGS_FILE_PATH);

    if (!fs.existsSync(real_file_path)) {
      const data = JSON.stringify(
        {
          logs: [],
        },
        null,
        2
      );

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
    // index
    if (req.url == "/") {
      this.serveIndex(res);
      return true;
    }

    if (req.url == "/logs") {
      this.servePage(res, "./pages/logs.html");
      return true;
    }

    // public
    if (this.serveStatic(req, res)) {
      return true;
    }

    if (req.url.startsWith("/add-log") && req.method == "POST") {
      this.addLog(req, res);
      return true;
    }

    if (req.url.startsWith("/get-logs") && req.method == "GET") {
      this.getLogs(res);
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
   * Adds a log to the list of logs and saves it.
   *
   * @param {http.IncomingMessage} req An http request.
   * @param {http.ServerResponse<http.IncomingMessage>} res An http response.
   */
  addLog(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      // Read the logs from the logs file
      const host = req.headers.host;

      const response = await fetch(`http://${host}/get-logs`, {
        method: "GET",
      });

      const data = await response.json();

      const logs = data.logs;

      // Add a new log
      const log = Log.fromJson(body);

      logs.push(log);

      // Write logs to the log file
      const real_file_path = path.join(PROJECT_DIRECTORY, LOGS_FILE_PATH);

      fs.writeFileSync(
        real_file_path,
        JSON.stringify(
          {
            logs,
          },
          null,
          2
        ),
        "UTF-8"
      );

      res.end();
    });
  }

  /**
   * Serves a json with all of the logs.
   *
   * @param {http.ServerResponse<http.IncomingMessage>} res An http response.
   */
  getLogs(res) {
    const real_file_path = path.join(PROJECT_DIRECTORY, LOGS_FILE_PATH);

    const data = fs.readFileSync(real_file_path, "UTF-8");

    res.setHeader("Content-Type", "application/json");
    res.write(data);
  }
}

export { App };
