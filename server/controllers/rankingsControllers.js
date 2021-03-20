const db = require('../models/julieModel.js');

const rankingsControllers = {};

rankingsControllers.checkDomain = async (req, res, next) => {
 
  // in the query, domainName cannot be undefined. A value or null has to be passed in
  let domainName;
  if (req.body.domainName === undefined) domainName = null;
  else domainName = req.body.domainName;

  const websiteCheckQuery = 'SELECT * FROM all_websites WHERE domain_name = ' + domainName;

  // Test query works
  const testQuery = "SELECT * FROM all_websites WHERE domain_name = 'dominos.com'";

  try {
    const response = await db.query(testQuery);

    /**
     !!! CANT HAVE THIS FULLY FUNCTIONAL UNTIL WE'RE ABLE TO INSERT
     VALUES FROM THE ALGO 

     
      THIS IS WHERE THE BROWSER DOM TRAVERSING SHIT IS USEFUL


     AND ALSO

     SEPARATE OUT THE INSERT STUFF IN CASE DOMAIN DOESNT EXIST IN ALL WEBSITES
     */

    // If domain is on all_websites table
    if(response){
      // Get rankings
      const rankingsQuery = `SELECT * FROM dominos`;
      const rankingsResponse = await db.query(rankingsQuery);
      // Will send back an array. Each el will be an object that represent all cols of each row
      res.locals.rankings = rankingsResponse.rows;
    }

    return next();
  } catch(err) { 

    // CREATE new table for domain root
    const createNewDomainTable = `CREATE TABLE ${domainName} (
      _id INTEGER PRIMARY KEY, 
      ranking INTEGER, 
      dom_element VARCHAR,
      name VARCHAR
    );
    `
    await db.query(createNewDomainTable);
    
    // INSERT row for domain name 
    const insertNewDomain = `INSERT INTO all_websites VALUES ('${domainName}')`;
    await db.query(insertNewDomain);

    // Assign forein key to newly created table

    return next({
      log: `ERROR in rankingsControllers.addEngagement: ${err}`,
      message: { err: 'An error occurred while trying to add an engagement to the database'}
    });
  }
}; 


module.exports = rankingsControllers;