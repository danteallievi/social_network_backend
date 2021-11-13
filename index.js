require("dotenv").config();

const { initializeServer } = require("./server/index");
const initializeDB = require("./DB/index");

const PORT = process.env.PORT ?? 5000;

(async () => {
  try {
    await initializeDB(process.env.DB_STRING);
    await initializeServer(PORT);
  } catch (error) {
    process.exit(1);
  }
})();
