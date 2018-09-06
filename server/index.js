require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

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
    this.handleGets();
    this.handlePosts();
  }

  handleGets() {
    this.app.get('/reviews', (req, res) => {
      // TBD do stuff
      res.status(202).send();
    });
  }

  handlePosts() {
    // TBD this.app.post
    this.app.post('/reviews/helpful', (req, res) => {
      // TBD do stuff
      res.status(202).send();
    });

    this.app.post('/reviews/new', (req, res) => {
      // TBD do stuff
      res.status(202).send();
    });
  }
}

const server = new Server();
