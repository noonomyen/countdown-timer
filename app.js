const Express = require("express");
const FS = require("fs");
const port = process.env.PORT || 3000;

var app = Express();

const index_html = FS.readFileSync("index.html", { flag: "r" }).toString();
const index_css = FS.readFileSync("index.css", { flag: "r" }).toString();
const index_js = FS.readFileSync("index.js", { flag: "r" }).toString();

app.get("/", (req, res) => { res.contentType("text/html"); res.send(index_html); });
app.get("/index.css", (req, res) => { res.contentType("text/css"); res.send(index_css); });
app.get("/index.js", (req, res) => { res.contentType("text/javascript"); res.send(index_js); });

app.listen(port, "localhost", () => { console.log(`Server started at http://localhost:${port}`); });

module.exports = app;