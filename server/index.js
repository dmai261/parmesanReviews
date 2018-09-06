require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
var url = require('url');
const db = require('../database/index.js');

class Server {
  constructor() {
    this.port = process.env.PORT1 || 1337;
    this.app = express();
    this.init();
  }

  init() {
    this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));
    this.app.listen(this.port);
    console.log(`server listening on port ${this.port}...`);
    this.handleGets();
    this.handlePosts();
  }

  handleGets() {
    // return reviews with posted productId
    this.app.get('/reviews/*', bodyParser.json(), (req, res) => {
      const productId = req.originalUrl.split('/')[2]; // get productId from from url
      db.getReviews(productId, (err, data) => {
        if (err) return console.error(err);
        console.log(data);
        res.status(202).send(data);
      });
    });
  }

  handlePosts() {
    // increment the helpfulness of a review
    this.app.post('/reviews/*/helpful', bodyParser.json(), (req, res) => {
      // TBD do stuff
      // console.log("POST to helpful");
      res.status(202).send();
    });

    // create a new review
    this.app.post('/reviews/new', bodyParser.json(), (req, res) => {
      // TBD do stuff
      // console.log("POST to new review");
      res.status(202).send();
    });
  }
}

const server = new Server();
