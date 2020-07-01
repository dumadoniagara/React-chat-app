var express = require('express');
var router = express.Router();
const moment = require('moment');
const Chat = require('../models/chat');

/* GET chat listing. */
router.get('/', function (req, res, next) {
  Chat.find().sort({ createdAt: -1 })
    .then(result => {
      let data = result.map(item => {
        return {
          _id: item._id,
          name: item.name,
          message: item.message,
          day: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss").split(" ")[0],
          hour: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss").split(" ")[1]
        }
      })
      res.json({
        error: false,
        data: data
      })
    })
    .catch(err => {
      res.json({
        error: true,
        message: err
      })
    })
});

/* Post new message */
router.post('/', function (req, res, next) {
  Chat.create({ name: req.body.name, message: req.body.message })
    .then(data => {
      res.json({
        error: false,
        chat: data
      })
    })
    .catch(err => {
      res.json({
        error: true,
        message: err
      })
    })
});

/* Delete Message */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Chat.findByIdAndRemove({ _id: id })
    .then((result) => {
      res.json({
        error: false,
        delete: result
      })
    })
})

module.exports = router;
