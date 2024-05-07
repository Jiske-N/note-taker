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
  // console.log(1, notes);

  notes.push(newNote);

  // console.log(2, notes);

  await fs.writeFile("./db/db.json", JSON.stringify(notes));
  // fs.writeFile("./db/db.json", JSON.stringify(notes)).then(() => {
  //   res.send(notes);
  // });

  // res.json(JSON.stringify(notes));
  // res.json(JSON.stringify(notes));
  res.json(notes);
  // res.json(notes);
  // res.json(db);
  // res.json(db);
});

// delete note from ask BCS
router.delete("/:id", async (req, res) => {
  console.log("string", req.params.id);
  try {
    const dbContents = await fs.readFile("./db/db.json", "utf8");
    let notes = JSON.parse(dbContents);
    const idMatch = notes.some((note) => note.id === Number(req.params.id)); // Assuming IDs are numbers and converting params.id to number
    if (idMatch) {
      const updatedArray = notes.filter(
        (note) => note.id !== Number(req.params.id)
      );
      notes = JSON.stringify(updatedArray);
      await fs.writeFile("./db/db.json", notes);
    }
    res.json(notes); // Sending response once
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing your request");
  }
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

    notes = JSON.stringify(updatedArray);

    await fs.writeFile("./db/db.json", notes);
  }

  // await fs.writeFile("./db/db.json", JSON.stringify(notes));

  res.json(notes);
  res.json(notes);
  // res.json(notes);
  // res.json(JSON.stringify(notes));
  // res.json(db);
});

// {
//     "title":"Test Title",
//     "text":"Test text"
// }

// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../../db/", "db.json"));
// });

module.exports = router;
