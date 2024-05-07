const express = require("express");
const path = require("path");
const app = express();

// connect to html pages
app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to routes page for get, post and delete requests.
app.use("/api/notes", require("./lib/routes"));

// get html files
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// control ports
const port = process.env.port || 3001;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
