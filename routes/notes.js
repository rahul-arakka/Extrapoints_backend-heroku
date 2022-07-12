const express = require('express');
const router =  express.Router();
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser');
const { validationResult, body } = require('express-validator');



// fetch all notes of a user using GET 'api/notes/fetchnotes'. Login required 
router.get('/fetchnotes',fetchuser,  async(req, res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("some error occurred");
}
})

// Add a note in database in name of a particuler loggedIn user POST: 'api/notes/addnote'. Login required.
router.post('/addnote', fetchuser, [
    // Adding an Array for validation
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description','Description should not be empty').isLength({min:3})],async(req, res)=>{

    try {
    // Destructuring title,description,tag from our req.body in a single line rather then extracting individually as an object 
    const {title, description,tag} = req.body;
    // If there are errors return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
  }
//   Notes.create({Object}) will also do same thing as we have used in User.create in user.js File.
  const note = new Notes({
    title,description, tag, user:req.user.id
  })
  const saveNote = await note.save();
  res.json(saveNote);

  }catch (error) {
        console.error(error.message);
        res.status(500).send("some error occurred");
}
})

// router.get('/fetchnotes',fetchuser,  async(req, res)=>{
//     try {
//         const notes = await Notes.find({user:req.user.id});
//         res.json(notes);
//     }catch (error) {
//         console.error(error.message);
//         res.status(500).send("some error occurred");
// }
// })

// Updating an existing note using PUT:'api/note/updatenote. login Required.
router.put('/updatenote/:id', fetchuser, [
    // Adding an Array for validation
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description','Description should not be empty').isLength({min:3})],async(req, res)=>{

    try {
    // Destructuring title,description,tag from our req.body in a single line rather then extracting individually as an object 
    const {title, description, tag} = req.body;
    // If there are errors return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
  }

  const newNote = {};
  if(title){newNote.title = title}
  if(description){newNote.description = description}
  if(tag){newNote.tag = tag}

  // Find note to be updated
  let note = await Notes.findById(req.params.id)
  if(!note){
    return res.status(404).send("Note not found");
  }

  // checking for the correct user requested to update the note or not.
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
  }

  // Once we are done verify the right user we will finally find and update the note.
  note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true});
  res.json(note);

  }catch (error) {
        console.error(error.message);
        res.status(500).send("some error occurred");
}
})


// Deleting an existing note using DELETE:'/api/notes/deletenote'. Login Required.
router.delete('/deletenote/:id', fetchuser, async(req,res)=>{
  try {
    let note = await Notes.findById(req.params.id);

    // Checking if the note is present in database or not.
    if(!note){
      return res.status(404).send("Note not found")
    }

    // Checking, is the right user want to delete to note
    if(req.user.id !== note.user.toString()){
      return res.status(401).send("Not Allowed");
    }

    // If everything is fine, find note and delete it.
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({note});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occurred");
}
})

module.exports = router;