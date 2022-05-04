const res = require('express/lib/response');
const { Thought , User } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find([])
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(400).json(err);
        });
    
},
// one thought by id
getThoughtsById({ params}, res) {
    Thought.findOne({ _id:params.id})
    .then(dbData => { 
        if (!dbData) {
            res.status(404).json({ message: 'No thought is found here'});
            return;
        }
            res.json(dbThoughtData)
    });
},
// create a thought
createThought({ params, body}, res) {
    Thought.create(body)
    .then(({ _id }) => { 
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true, runValidators: true }
        );
    })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'User not found with this id'});
                return;
            }
            res.json(dbData);

        })
        .catch(err => res.status(404).json(err));

    },

updateThought({ params, body }, res ) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id'});
            return;
        }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(404).json(err));

    },

deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.ThoughtsById})
    .then(dbData => {
        if (!dbData) {
            return res.status(404).json({ message: 'Thought is deleted'});
        }
            return User.findOneAndUpdate({ id: params.ThoughtsById},
           { $pull: { thoughts: params.ThoughtsById } },
           { new: true, runValidators: true} 
           );
        
    })
    .then(dbUserData => { 
        if (!dbUserData) {
        res.status(404).json({ message: 'No user found with id'});
        return;
    }
    res.json(dbUserData);
    })
    .catch(err => res.status(404).json(err));
},

addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { replies: body } },
      { new: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  },

  // delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { replies: { replyId: params.reactionId } } },
      { new: true }
    )
      .then(dbData => res.json(dbData))
      .catch(err => res.json(err));
  },
};

module.exports = thoughtController;
