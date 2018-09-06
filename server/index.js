const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

class Server {
  constructor() {
    this.port = process.env.PORT1 || 1337;
    this.app = express();
    this.init();
  }

  init() {
    this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    this.app.listen(this.port);
    console.log(`server listening on port ${this.port}...`);
  }
}

const server = new Server();
