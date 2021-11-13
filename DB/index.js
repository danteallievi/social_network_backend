/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const debug = require("debug")("socialNetwork:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const initializeDB = (stringDB) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", false);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
      },
    });

    mongoose.connect(stringDB, (error) => {
      if (error) {
        debug(chalk.red("The database could not be started", error.message));
        reject();
        return;
      }
      debug(chalk.green("The database is connected"));
      resolve();
    });

    mongoose.connection.on("close", () => {
      debug(chalk.yellow("DB disconnected"));
    });
  });

module.exports = initializeDB;
