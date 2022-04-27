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
exports.getNoteById = async (req, res) =>{
    try {
        const noteById = await kemerNoteModel.findById({_id: req.params.id});
        res.json(noteById);
    } catch (error) {
        res.json({message: error});
    }
}

// Update note
exports.updateNote = async(req, res) => {
    try {
        const {noteContent, noteArchiveStatus, notePinStatus} = req.body;
        const updatedNote = await kemerNoteModel.updateOne({_id: req.params.id}, {$set: {noteContent: noteContent, noteArchiveStatus: noteArchiveStatus, notePinStatus: notePinStatus}});
        res.json(updatedNote);
    } catch (error) {
        res.json({message: error});
    }
}

// Delete note
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await kemerNoteModel.remove({_id: req.params.id});
    res.json(deletedNote)
  } catch (error) {
    res.json({message: error});
  }
}
