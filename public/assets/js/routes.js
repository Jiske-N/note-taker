const fs = require("fs/promises");
const express = require("express");
const uuid = require("uuid");
const router = express.Router();
// const path = require("path");
const db = require("../../../db/db.json");
// const { title } = require("process");

// get all notes
router.get("/", (req, res) => {
  res.json(db);
});

// create note
router.post("/", async (req, res) => {
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  };

  if (!newNote.title || !newNote.text) {
    return res
      .status(400)
      .json({ msg: "Please include a title and description" });
  }

  const dbContents = await fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
  });

  const notes = JSON.parse(dbContents);

  notes.push(newNote);

  await fs.writeFile("./db/db.json", JSON.stringify(notes));

  res.json(db);
});

// delete note
router.delete("/:id", async (req, res) => {
  console.log("string", req.params.id);

  const dbContents = await fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
  });

  let notes = JSON.parse(dbContents);

  const idMatch = notes.some((note) => note.id === req.params.id);

  if (idMatch) {
    const updatedArray = notes.filter((note) => note.id !== req.params.id);

    notes = updatedArray;
  }

  await fs.writeFile("./db/db.json", JSON.stringify(notes));

  res.json(db);
});

// {
//     "title":"Test Title",
//     "text":"Test text"
// }

// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../../db/", "db.json"));
// });

module.exports = router;
