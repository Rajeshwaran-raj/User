require('dotenv').config();

const app = require("./app");

const port = process.env.PORT || 80;

app.listen(port, async () => {
  try {
    const startMessage = console.log(`Server is running on port ${port}`);
    console.info(startMessage);
  } catch (error) {
    console.error('ApplicationServer Error ', error);
    process.exit(-1);
  }
});
