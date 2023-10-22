//

import http from "http";

const PORT = 0;
const HOSTNAME = "0.0.0.0";

import { App } from "./app.js";

const my_app = new App();

const server = http.createServer((req, res) => {
  if (my_app.route(req, res)) {
    res.statusCode = 200;
    res.end();
    return;
  }

  res.statusCode = 404;
  res.end();
});

server.listen(PORT, HOSTNAME, () => {
  console.log(
    `Server running at http://${server.address().address}:${
      server.address().port
    }`
  );
});
