const path = require('path'); //to get the correct file path for our html
const router = require('express').Router();

//(note) route responding with notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});


// all other routes responding with index.html file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;