const express = require('express');
const router = express.Router();
const rankingsControllers = require('../controllers/rankingsControllers');

router.post('/', 
  rankingsControllers.checkDomain,
  (req, res) => {
    const { rankings } = res.locals;
    console.log(res.locals.rankings)
    return res.status(200).json(rankings);
  }
)

// router.post('/', 
//   rankingsControllers.addDomain,
//   (req, res) => {
//     const { rankings } = res.locals;
//     return res.status(200).json(rankings);
//   }
// )

// router.delete('/', 
//   (req, res) => {
//     res.status(200).json({})
//   }
// )
 

module.exports = router;
