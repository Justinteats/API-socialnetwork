const router =require('express').Router();
const {
    getThoughts,
    getSingleThoughts,
    createThought,
    updateThoughtById,
    deleteThougtsById,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtcontroller.js');
const { update } = require('../../models/user');
//api thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThoughts)
    .put(updateThoughtById)
    .delete(deleteThougtsById);

router
    .route('/:thoughtId')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;
