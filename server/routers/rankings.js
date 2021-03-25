const express = require('express');
const router = express.Router();
const rankingsControllers = require('../controllers/rankingsControllers');

router.post('/', 
  rankingsControllers.checkDomain,
  (req, res) => {
    const { rankings } = res.locals;
    console.log('AHHHHHHHHHHHHHH', res.locals.rankings)
    return res.status(200).json(rankings);
  }
)

router.post('/new', 
  rankingsControllers.addDomain,
  (req, res) => {
    console.log(res.locals.algoRankings);
    return res.status(200).json(res.locals.algoRankings); 
  }
)

router.post('/edit/', 
  rankingsControllers.userInput,
  (req, res) => {
    return res.status(200).json({});
  }
)


// router.delete('/', 
//   (req, res) => {
//     res.status(200).json({})
//   }
// )
 

module.exports = router;
