// Modules needed to project
const fs = require('fs');
const express = require('express');
const { nanoid } = require('nanoid');
const id = nanoid();

// array for new notes created
const notes = [];

const PORT = process.env.PORT || 3001;
const app = express();

// parses incoming requests
// then it will recognize the incoming object request as json object
// lastly it will look up the files relative to static directory so its not in URL
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// get info and if info is not available error will occur
app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err,data) => {
      const noteParse = JSON.parse(data);
        if (err) throw err;
    
    return res.json(noteParse);
    });
  });

// will post new note
app.post("/api/notes", (req, res) => {
    
    const notesInfo = req.body;
        notes.push(notesInfo);
    req.body.id = id;
    fs.writeFileSync('db/db.json', JSON.stringify(notes), 'utf-8')
    res.json(notes);

   });


// app.delete('/api/notes', (req, res) => {

// });

app.get("*", (req, res) => {
     res.sendFile(path.join(__dirname, "./public/index.html"));
   });


app.get("/notes", (req, res) => {
     res.sendFile(path.join(__dirname, "./public/notes.html"));
   });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
