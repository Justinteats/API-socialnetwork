const res = require('express/lib/response');
const { process_params } = require('express/lib/router');
const userController = require('../../../../18-NoSQL/02-Challenge/Main/controllers/user-controller');
const { User, Thought} = require ('../models');
const { db } = require('../models/user');
const thoughtController = require('./thoughts-controller');

const userController = {
    getUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},

getUsersById({ params}, res){
    User.findOne({ _id: params.id })
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .populate({
        path: 'friends',
        select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'user not found with id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},

createUser({ body}, res) {
    User.create({ _id: params.id}, body, {
        new:true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                return;
                    res.status(404).json({ message: 'no user found'});
                
            }
            res.json(dbUserData);

        
        })
        .catch((err) =>{
            console.log(err);
            res.status(500).json(err);
        });
    
},

updateUser (req, res) {
    User.findOneAndUpdate(
        {id: params.id} , 
        body, { new:true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
               return res.status(404).json ({message: ' no user found'});
            }
            res.json(dbUserData);
        });

deleteUser (req, res) 
    User.findByIdAndUpdate(
        {_id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
          }
        res.json(dbUserData);
      })
      .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

},

};
module.exports = userController;