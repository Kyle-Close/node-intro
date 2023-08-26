const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer(function (req, res) {
    const myURL = new URL(req.url, `http://${req.headers.host}`);
    const path = "." + myURL.pathname + ".html";
    ReadFile(path, res);
  })
  .listen(8080);

function ReadFile(path, res) {
  fs.readFile(path, (err, data) => {
    if (err) {
      HandleError(res);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    }
  });
}

function HandleError(res) {
  fs.readFile("404.html", (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("Internal Server Error");
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
}
