require('dotenv').config();
const app = require('./app');
const { name } = require("./package.json");

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`**** ApplicationServer ${name.toUpperCase()} started running on port ${port}****`);
});

