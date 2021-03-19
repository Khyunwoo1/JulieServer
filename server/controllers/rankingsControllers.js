const db = require('../models/julieModel.js');

const rankingsControllers = {};

// Copied over from stay on track
rankingsControllers.addUser = async (req, res, next) => {
  // creating the encrypted version of the password received from client
  const hash = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);

  // query to the database, will create a new instance under users table, then store username, and encrypted password
  const addUserQuery = 'INSERT INTO users (username, password, first_name, last_name, interval) ' +
  'VALUES ($1, $2, $3, $4, $5) RETURNING username, first_name, last_name';

  // in the query, interval cannot be undefined. A value or null has to be passed in
  let interval;
  if (req.body.interval === undefined) interval = null;
  else interval = req.body.interval;

  const userValues = [
    req.body.username,
    hash,
    req.body.first_name,
    req.body.last_name,
    interval
  ];

  // taking the query template on line 11 and combining it with post data from client on lines 19-25
  try {
    const response = await db.query(addUserQuery, userValues);
    
    // assume response will be an obj with an array as a value
    res.locals.response = {
      user: response.rows[0],
      result: true
    }

    return next();
  } catch(err) {
    return next({
      log: `ERROR in rankingsControllers.addUser: ${err}`,
      message: { err: 'An error occurred while trying to add a user to the database'}
    });
  }
};


// I made some changes on this, should check original to make sure query is correct
rankingsControllers.findSomething = async (req, res, next) => {
  const addEngagementQuery = 'SELECT *';
  
  // in the query, notes cannot be undefined. A value or null has to be passed in
  let notes;
  if (req.body.notes === undefined) notes = null;
  else notes = req.body.notes;

  // const engagementValues = [
  //   req.body.username,
  //   req.body.contact_id,
  //   req.body.method,
  //   notes
  // ];

  try {
    const response = await db.query(addEngagementQuery);
    // need to get the first and last name of contact person
    const contactId = response.rows[0].contact_id;
    // safe to insert since getting contactId directly back from database
    const contactee = await db.query(`SELECT * FROM contacts WHERE contact_id=${contactId}`);

    // add the contact person's first and last name onto the response
    res.locals.newEngagement = Object.assign(response.rows[0], {
      contact_first_name: contactee.rows[0].first_name,
      contact_last_name: contactee.rows[0].last_name
    });

    return next();
  } catch(err) {
    return next({
      log: `ERROR in rankingsControllers.addEngagement: ${err}`,
      message: { err: 'An error occurred while trying to add an engagement to the database'}
    });
  }
};

module.exports = rankingsControllers;