// Require the model
const { set } = require("express/lib/response");
const res = require("express/lib/response");
const kemerNoteModel = require("./model");

// Create note
exports.createNote = (req, res) => {
  const kemerNote = new kemerNoteModel({
    noteContent: req.body.noteContent,
    noteImage: req.body.noteImage,
    noteArchiveStatus: req.body.noteArchiveStatus,
    notePinStatus: req.body.notePinStatus,
  });

  kemerNote
    .save()
    .then((data) => {
      res.json(data);
      console.log("Note saved successfully");
    })
    .catch((err) => {
      console.log(`Erro when save note: ${err}`);
      res.json({ message: err });
    });
};

// Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const allNotes = await kemerNoteModel.find();
    res.json(allNotes);
  } catch (error) {
    res.json({ message: error });
  }
};

// Get note by id
exports.getNoteById = async (req, res) => {
  try {
    const noteById = await kemerNoteModel.findById({ _id: req.params.id });
    res.json(noteById);
  } catch (error) {
    res.json({ message: error });
  }
};

// Update note
exports.updateNote = async (req, res) => {
  try {
    const body = req.body;
    // Update only note content
    if (
      body.noteContent != null &&
      body.noteArchiveStatus == null &&
      body.notePinStatus == null
    ) {
      const updatedNote = await kemerNoteModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            noteContent: body.noteContent,
            // noteArchiveStatus: body.noteArchiveStatus,
            // notePinStatus: body.notePinStatus,
          },
        }
      );
      res.json(updatedNote);
    }

    // Update only archive
    else if (
      body.noteContent == null &&
      body.noteArchiveStatus != null &&
      body.notePinStatus == null
    ) {
      const updatedNote = await kemerNoteModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            // noteContent: body.noteContent,
            noteArchiveStatus: body.noteArchiveStatus,
            // notePinStatus: body.notePinStatus,
          },
        }
      );
      res.json(updatedNote);
    }
    // Update pin status
    else if (
      body.noteContent == null &&
      body.noteArchiveStatus == null &&
      body.notePinStatus != null
    ) {
      const updatedNote = await kemerNoteModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            // noteContent: body.noteContent,
            // noteArchiveStatus: body.noteArchiveStatus,
            notePinStatus: body.notePinStatus,
          },
        }
      );
      res.json(updatedNote);
    } else {
      res.json({
        message: "You can not edit pin and archive status at the same time",
      });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete note
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await kemerNoteModel.remove({ _id: req.params.id });
    res.json(deletedNote);
  } catch (error) {
    res.json({ message: error });
  }
};
