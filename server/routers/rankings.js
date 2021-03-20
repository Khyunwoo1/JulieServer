const express = require('express');
const router = express.Router();
const rankingsControllers = require('../controllers/rankingsControllers');

router.post('/', 
  rankingsControllers.checkDomain,
  (req, res) => {
    const { rankings } = res.locals;
    return res.status(200).json(rankings);
  }
)

// router.get('/', 
//   (req, res) => {
//     res.status(200).json({})
//   }
// )

// router.delete('/', 
//   (req, res) => {
//     res.status(200).json({})
//   }
// )


module.exports = router;
