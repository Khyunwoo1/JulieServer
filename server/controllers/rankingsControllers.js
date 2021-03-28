const db = require('../models/julieModel.js');

const rankingsControllers = {};

rankingsControllers.checkDomain = async (req, res, next) => {
  //! should really be getting full url and determining proper endpoint here
  console.log('req body check', req.body.domainName)
  // In the query, domainName cannot be undefined. A value or null has to be passed in
  let domainName;
  if (req.body.domainName === undefined) domainName = null;
  else domainName = req.body.domainName;

  const websiteCheckQuery = 'SELECT * FROM all_websites WHERE domain_name = ' + "'" + domainName + "'";

  try {
    const response = await db.query(websiteCheckQuery);
    if(response){
      // if on all websites, send back rankings from that particular table
      const webpageRankingQuery = `SELECT * FROM "${domainName}"`;
      const webpageRankingResponse = await db.query(webpageRankingQuery);
      console.log('check this', webpageRankingResponse.rows)

      // THIS WOULD BE TRIGGERED IF USERS HAVE VISITED A SITE BEFORE WITH NO ONE PREVIOUSLY CONTRIBUTING
      if(webpageRankingResponse.rows.length === 0){
        console.log('no rows here')
        // at this point, should be 
      }
      res.locals.rankings = webpageRankingResponse.rows;

      return next();
    } 

  } catch(err) { 
    // DELETE FROM all_websites WHERE domain_name='Alfreds Futterkiste';
    // DROP TABLE Shippers;
    const insertNewDomain = `INSERT INTO all_websites VALUES ('${domainName}')`;
    await db.query(insertNewDomain);
    // then creating its own table
    const createNewDomainTable = `CREATE TABLE ${domainName} (
      ranking INTEGER, 
      dom_element VARCHAR,
      name VARCHAR
    );
    `
    await db.query(createNewDomainTable);

    // should here be doing some algo here and sending to the front end an object of list of things that might be on the DOM
    return next({
      log: `ERROR in rankingsControllers.checkDomain: ${err}`,
      message: { err: 'An error occurred while trying to add an engagement to the database'}
    });
  }
}; 


rankingsControllers.updateTable = async (req, res, next) => {

  // here we get the confirmation of existing doms on the front end
  // confirmed el's should just be announced on the front end, not needing to
  // be connected to this part
  // gets added to the table of the particular endpoint
  console.log('new req.body ',req.body.newElements)

  const { newElements } = req.body
  res.locals.algoRankings = newElements;
  return next();
}

const voteCacheObj = {};
rankingsControllers.userInput = async (req, res, next) => {

  const { currentUrl, voteType } = req.body;
  const lastTableRankings = {};
  const updatedRankings = {};

  // Fetch and cache most current ranking
  const currentDomainQuery = 'SELECT * FROM "' + currentUrl +'" LIMIT 100';
  
  try {
    const response = await db.query(currentDomainQuery);
    console.log('query for current table ', response.rows)
    // response.rows is an array with each row as its own obj
    // loop through response.rows and populate lastTableRankings
    if(response){
      response.rows.forEach(row =>{
        lastTableRankings[row.name] = [row.ranking, row.dom_element];
      })
      // we also need NAME 
      // Populate voteCacheObj with upcoming votes 

      console.log('LAST TABLE RANKINGS', lastTableRankings);

      


      console.log('this is vote cache obj', voteCacheObj);
    }

    res.locals.userInputResponse = {yo: 'yoooo'}
    return next();
  } catch(err) { 
    return next({
      log: `ERROR in rankingsControllers.userInput: ${err}`,
      message: { err: 'An error occurred while trying to add an engagement to the database'}
    });
  }

  /**
    Adding and removing is easy enough for now

    How to handling voting?
    - Will ultimately rely on something like Redis
    
    But for quick and dirty for now, probably a set time interval of checking if # of votes 
    are at least > than a certain amount and then batch injecting

      I'D REMOVE THE RANKING COL COMPLETELY
      JUST DO BY VOTING SYSTEM WHERE TABLES ORGANIZED BY MOST UPVOTED AT TOP 

      - would have to fetch the current table
      - cache it somewhere as "last time table rankings"
      - say that last table was:
      Id  Dom Element   Name              Votes
      1   button        search button     20
      2   button        get coupon        19
      3   a             order online      18
      4   button        track order       14

      THIS SHOULD BE BATCHED, YOU DONT WANT THIS INFO REAL TIME

      const lastTableRankings = {
        search button: [20, button],
        get coupon: [19, button],
        order online: [18, a],
        button: [14, button],
      };

      const voteCacheObj = {
        search button: 20
        get coupon: 19
        order online: 18,
        button: 14
      };

      Every time a vote comes in:
      - if req.body should be: 
      {
        name: 1
      }
      
      or 

      {
        name: -1
      }

      Check voteCacheObj to match key to name
      - if upvote, ++
      - if downvote, --

      const updatedRankings = {};

      After set interval time, loop through lastTableRankings
      - at each key
        let rankNum = lastTableRankings[key][0];
        const domType = lastTableRankings[key][1];

        // updated rank num
        let rankNum += voteCacheObj[key];

        // put into updated Rankings
        updatedRankings[rankNum] = [key, domType]

      Loop through updatedRankings and create query

   */
  

}
 
// rankingsControllers.addDomain = async (req, res, next) => {
 
//   // in the query, domainName cannot be undefined. A value or null has to be passed in
//   let domainName;
//   if (req.body.domainName === undefined) domainName = null;
//   else domainName = req.body.domainName; 

//   const websiteCheckQuery = 'SELECT * FROM all_websites WHERE domain_name = ' + domainName;

//   // Test query works
//   const testQuery = "SELECT * FROM all_websites WHERE domain_name = 'dominos.com'";

//   try {
//     const response = await db.query(websiteCheckQuery);

//     /**
//      !!! CANT HAVE THIS FULLY FUNCTIONAL UNTIL WE'RE ABLE TO INSERT
//      VALUES FROM THE ALGO 

     
//       THIS IS WHERE THE BROWSER DOM TRAVERSING SHIT IS USEFUL


//      AND ALSO 

//      SEPARATE OUT THE INSERT STUFF IN CASE DOMAIN DOESNT EXIST IN ALL WEBSITES
//      */

//     // If domain is on all_websites table
//     if(response){
//       // Get rankings
//       const rankingsQuery = `SELECT * FROM dominos`;
//       const rankingsResponse = await db.query(rankingsQuery);
//       // Will send back an array. Each el will be an object that represent all cols of each row
//       res.locals.rankings = rankingsResponse.rows;
//     }

//     return next();
//   } catch(err) { 

//     // CREATE new table for domain root
//     const createNewDomainTable = `CREATE TABLE ${domainName} (
//       ranking INTEGER, 
//       dom_element VARCHAR,
//       name VARCHAR
//     );
//     `
//     await db.query(createNewDomainTable);
    
//     // INSERT row for domain name 
//     const insertNewDomain = `INSERT INTO all_websites VALUES ('${domainName}')`;
//     await db.query(insertNewDomain);

//     // Assign forein key to newly created table

//     return next({
//       log: `ERROR in rankingsControllers.addEngagement: ${err}`,
//       message: { err: 'An error occurred while trying to add an engagement to the database'}
//     });
//   }
// }; 


module.exports = rankingsControllers;