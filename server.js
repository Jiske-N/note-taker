const express = require("express");
const path = require("path");
// const uuid = require("uuid");
const app = express();

// // getting started from the express documentation
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use(express.static(path.join(__dirname, "public")));
// starter code below
// ___________________________________________________________________________________________________________________
// Getting Started
// On the back end, the application should include a db.json file that will be used to store and retrieve notes using the fs module.

// The following HTML routes should be created:

// GET /notes should return the notes.html file.
// app.get("/notes", (req, res) => res.sendFile("notes.html", {}));

// GET * should return the index.html file.
// app.get("*", (req, res) => res.sendFile("index.html", {}));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/notes", require("./public/assets/js/routes"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
// ___________________________________________________________________________________________________________________
// starter code above

const port = process.env.port || 3001;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
