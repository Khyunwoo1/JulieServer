const express = require('express');
const router = express.Router();
const rankingsControllers = require('../controllers/rankingsControllers');


router.get('/', 
  rankingsControllers.findSomething,
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
