const express = require('express');
const app = express();

app.use(express.static('./public'));

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Listening on port ${port}`);
})