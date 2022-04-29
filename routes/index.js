const express = require('express');
const router = express.Router();
const path = require("path");

const noteRoutes = require("./notesRoutes")
router.use("/notes", noteRoutes)

// const noteRoutes = require("./htmlRoutes")
// router.use("/html", htmlRoutes)

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
})

module.exports = router;