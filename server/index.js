require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');
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

    this.app.use(express.static('public'));
    console.log('server serving static react from /public...');

    this.handleGets();
    this.handlePosts();
    this.handleOptions();
  }

  handleOptions() {
    this.app.options('/reviews/*', (req, res) => {
      res.status(200).send();
    });
  }

  handleGets() {
    // return reviews with posted productId
    this.app.get('/reviews/*', bodyParser.json(), (req, res) => {
      const productId = req.originalUrl.split('/')[2]; // get productId from from url
      db.getReviews(productId, (err, data) => {
        if (err) return console.error(err);
        res.status(202).send(data);
      });
    });

    // increment helpfullness
    this.app.get('/helpful/*', bodyParser.json(), (req, res) => {
      const reviewId = req.originalUrl.split('/')[2]; // get reviewId from from url
      db.incrementHelpfulness(reviewId, (err, data) => {
        if (err) return console.error(err);
        res.status(202).send();
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
