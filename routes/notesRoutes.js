const express = require('express');
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
    fs.readFile("./data/notes.json", "utf-8", (err, data) => {
        if (err) {
            throw err
        } else {
            const notes = JSON.parse(data);
            res.json(notes)
        }
    })
})

router.post("/", (req, res) => {
    fs.readFile("./data/notes.json", "utf-8", (err, data) => {
        if (err) {
            throw err
        } else {

            const notes = JSON.parse(data);
            console.log(req.body)
            notes.push(req.body)
            fs.writeFile("./data/notes.json", JSON.stringify(notes, null, 2), (err, data) => {
                if (err) {
                    throw err
                }
                else {
                    res.json(notes)
                }
            })
        }
    })
})

module.exports = router;