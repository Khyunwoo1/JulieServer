const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userControllers');

router.get('/', 
  usersController.getUser,
  (req, res) => {
    res.status(200).json({})
  }
)

module.exports = router;