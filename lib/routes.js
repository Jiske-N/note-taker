const fs = require("fs/promises");
const express = require("express");
const uuid = require("uuid");
const router = express.Router();

// get all notes
router.get("/", async (req, res) => {
  const dbContents = await fs.readFile("./db/db.json", "utf8");

  let notes = JSON.parse(dbContents);

  res.json(notes);
});

// create new note
router.post("/", async (req, res) => {
  const newNote = {
    // randomly generate id to add to new note
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  };

  // not actually necessary because the same thing is checked in index.js
  if (!newNote.title || !newNote.text) {
    return res
      .status(400)
      .json({ msg: "Please include a title and description" });
  }

  const dbContents = await fs.readFile("./db/db.json", "utf8");

  const notes = JSON.parse(dbContents);

  notes.push(newNote);

  await fs.writeFile("./db/db.json", JSON.stringify(notes));

  res.json(notes);
});

// delete note
router.delete("/:id", async (req, res) => {
  const dbContents = await fs.readFile("./db/db.json", "utf8");

  let notes = JSON.parse(dbContents);

  const idMatch = notes.some((note) => note.id === req.params.id);

  if (idMatch) {
    const updatedArray = notes.filter((note) => note.id !== req.params.id);

    notes = JSON.stringify(updatedArray);

    await fs.writeFile("./db/db.json", notes);
  }

  res.json(notes);
});

module.exports = router;