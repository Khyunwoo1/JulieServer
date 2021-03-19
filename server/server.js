const express = require('express');
const path = require('path');
const app = express();
const router = require('./router');
const PORT = 3333;

// Json Parse
app.use(express.json());

// Flow Check
app.use((req, res, next) =>{
  console.log(`*** FLOW METHOD ***\n
    URL: ${req.url}\n
    BODY: ${req.body}\n
    METHOD: ${req.method}\n`);
  return next();
});

app.use('/', router);


// Catch All
app.use('*', (res, req) => {
  res.status(400).send('Page Not Found');
});

// GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown middleware error',
    status: 500,
    message: { err: 'Internal Server Error'}
  };
  const errObj = {...defaultErr, ...err};
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}`);
}); 