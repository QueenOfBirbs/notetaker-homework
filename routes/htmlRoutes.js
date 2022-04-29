const express = require('express');
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
    fs.readFile("./public/notes.html", "utf-8", (err, data) => {
        if (err) {
            throw err
        } else {
            const HTML = JSON.parse(data);
            res.json(HTML)
        }
    })
})

// router.post("/", (req, res) => {
//     fs.readFile("./public/notes.html", "utf-8", (err, data) => {
//         if (err) {
//             throw err
//         } else {

//             const HTML = JSON.parse(data);
//             console.log(req.body)
//             HTML.push(req.body)
//             fs.writeFile("./public/notes.html", JSON.stringify(HTML, null, 2), (err, data) => {
//                 if (err) {
//                     throw err
//                 }
//                 else {
//                     res.json(HTML)
//                 }
//             })
//         }
//     })
// })

module.exports = router;