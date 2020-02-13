require('dotenv').config();
const nr = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const url = require('url');
const db = require('../database/index.js');
const redisClient = require('../psql_cache.js');

class Server {
  constructor() {
    this.port = process.env.PORT || 1337;
    this.proxyPort = process.env.PROXYPORT || 3000;
    this.serverAddress = `http://localhost:${this.port}`;
    this.app = express();
    this.init();
  }

  init() {
    this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));
    this.app.listen(this.port);
    console.log(`AVH component server listening on ${this.serverAddress}...`);

    this.app.use(express.static('public'));
    console.log(`AVH component server serving static react from /public on ${this.serverAddress}...`);

    this.handleGets();
    this.handlePosts();
    this.handleOptions();
    this.handlePuts();
    this.handleDelete();
  }

  handleOptions() {
    this.app.options(`/reviews/*`, (req, res) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.status(202).send();
    });
  }

  handleGets() {
    // return reviews with posted productId
    this.app.get(`/loaderio-db029dc468852e8be779b4ef13f90966`, bodyParser.json(), (req, res) => {
      res.send('loaderio-db029dc468852e8be779b4ef13f90966');
    });

    this.app.get(`/reviews/*`, bodyParser.json(), (req, res) => {
      const productId = req.originalUrl.split('/')[2]; // get productId from from url
      redisClient.get(productId, function (err, result) {
        if (result) {
          console.log(result);
          res.status(202).send(JSON.parse(result));
        } else {
          db.getReviews(productId, (err, data) => {
            if (err) res.statusCode(404).send(err);
            res.status(202).send(data);
          });
        }
      });
    });

    // increment helpfullness
    this.app.get(`/helpful/*`, bodyParser.json(), (req, res) => {
      const reviewId = req.originalUrl.split('/')[2]; // get reviewId from from url
      db.incrementHelpfulness(reviewId, (err, data) => {
        if (err) return console.error(err);
        res.status(202).send();
      });
    });
  }

  handlePosts() {
    // increment the helpfulness of a review
    this.app.post(`/reviews/*/helpful`, bodyParser.json(), (req, res) => {
      // TBD do stuff
      // console.log("POST to helpful");
      res.status(202).send();
    });

    // create a new review
    this.app.post(`/reviews/new`, bodyParser.json(), (req, res) => {
      // TBD do stuff
      // console.log("POST to new review");
      db.createReviews(req.body);
      res.status(202).send('Review Saved');
    });
  }

  handlePuts() {
    this.app.put(`/reviews/update/:reviewID/:productId`, bodyParser.json(), (req, res) => {
      let reviewId = req.params.reviewID;
      let productId = req.params.productId;
      let data = req.body;
      console.log(data);
      db.updateReviews(data, reviewId, productId, (err, data) => {
        if (err) return console.error(err);
        res.status(202).send(data);
      });
    });
  }
  
  handleDelete() {
    this.app.delete(`/reviews/delete/:reviewID/:productId`, bodyParser.json(), (req, res) => {
      let reviewId = req.params.reviewID;
      let productId = req.params.productId;
      db.deleteReviews(reviewId, productId, (err, data) => {
        if (err) return console.error(err);
        res.status(202).send(data);
      });
    });
  }
}

const server = new Server();
