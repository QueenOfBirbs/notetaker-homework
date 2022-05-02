const fs = require('fs');
const path = require('path');

module.exports = app => {

    // notes variable
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // api/notes get setup
        app.get("/api/notes", function(req, res) {
            res.json(notes);
        });

        //api/notes post setup
        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            res.json(notes); 
        });

        //picks specific note with id
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });
       
        // shows notes.html when on /notes
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // shows index.html 
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //adds notes to db file whenever there's a new one
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}