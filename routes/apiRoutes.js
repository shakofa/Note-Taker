
const store = require('./db/store');
const router = require('express').Router();


router.get('/notes', (req, res) => {
    store
    getNote().then((notes) => {return res.json(notes);
    }).catch((err) => res.status(500).json(err));

});



router.post('/notes', (req, res) => {
    store
    addNote().then((notes) => {return res.json(notes);
    }).catch((err) => res.status(500).json(err));
});


//deleting with id
router.delete('/notes/:id', (req, res) => {
    store
    deleteNote(req.params.id).then(() => res.json({ok: true})).catch((err) => res.status(500).json(err));
});

module.exports = router;

