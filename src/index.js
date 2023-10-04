const express = require('express');
const proxy = require('express-http-proxy');

require('dotenv').config();

const app = express();
const port = 3000;

app.use('/user', proxy(`${process.env.USERS_API_URL}`));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});