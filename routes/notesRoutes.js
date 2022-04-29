const express = require('express');
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err
        } else {
            const newNote = JSON.parse(data);
            res.json(newNote)
        }
    })
})

router.post("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            throw err
        } else {

            const newNote = JSON.parse(data);
            console.log(req.body)
            newNote.push(req.body)
            fs.writeFile("./db/db.json", JSON.stringify(newNote, null, 2), (err, data) => {
                if (err) {
                    throw err
                }
                else {
                    res.json(newNote)
                }
            })
        }
    })
})

module.exports = router;