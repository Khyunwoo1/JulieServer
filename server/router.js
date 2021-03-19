const express = require('express');
const router = express.Router();
const pgController = require('./controllers/pgControllers');


router.get('/', 
  pgController.findSomething,
  (req, res) => {
    res.status(200).json({})
  }
)

router.post('/', 
  (req, res) => {
    res.status(200).json({})
  }
)

router.delete('/', 
  (req, res) => {
    res.status(200).json({})
  }
)


module.exports = router;
