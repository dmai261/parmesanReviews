const mongoose = require('mongoose');

class Database {
  constructor() {
    this.dburi = process.env.DBURI;
    this.init();
  }

  init() {
    // TBD do stuff
  }
}

const database = new Database();
