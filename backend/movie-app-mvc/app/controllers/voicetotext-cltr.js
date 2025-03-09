import mongoose from 'mongoose'
// Define Note Schema
const noteSchema = new mongoose.Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model('Note', noteSchema);

const notesCltr={}
notesCltr.get=async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

notesCltr.post= async (req, res) => {
  const { content } = req.body;
  const newNote = new Note({
    content,
  });
  await newNote.save();
  res.json(newNote);
};


export default notesCltr
