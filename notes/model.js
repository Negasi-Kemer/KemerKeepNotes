// Require mongoose
const mongoose = require("mongoose");

// Create schema
const KemerNoteSchema = mongoose.Schema({
    noteContent:{
        type: String,
        required: true
    },
    noteCreatedAtDate:{
        type: Date,
        default: Date.now
    },
    noteImage:{
        type: String,
        default: null
    },
    noteArchiveStatus:{
        type: Boolean,
        default: false
    },
    notePinStatus:{
        type: Boolean,
        default: false
    }
})

// Export the schema
module.exports = mongoose.model("KemerNotes", KemerNoteSchema);