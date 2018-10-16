// require('dotenv').config();
// const mongoose = require('mongoose');
// const faker = require('faker');
// const helpers = require('../server/helpers/helpers.js');
const { Pool, Client } = require('pg');
const redisClient = require('../psql_cache.js');

var connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
};

// var client = new Client(connectionString);

class Database {
  constructor() {
    // this.usingMLab = false;
    // this.dburi = process.env.DBURI;
    // this.user = process.env.DBUSER;
    // this.pw = process.env.DBPW;
    // if (this.usingMLab) {
      //   this.dburi = `mongodb://${this.user}:${this.pw}${this.dburi}`;
      // } else {
        //   this.dburi = `mongodb://localhost:${process.env.DBPORT}/reviews`;
        // }
        
    this.pool = new Pool(connectionString);
    // this.Schema = mongoose.Schema;
    // this.reviewsSchema = new this.Schema({
    //   productId: Number,
    //   reviewId: Number,
    //   username: String,
    //   stars: Number,
    //   title: String,
    //   text: String,
    //   timestamp: Date,
    //   numHelpful: Number,
    //   verifiedPurchase: Boolean,
    //   imageUrl: String,
    // });
    // this.Review = mongoose.model('Review', this.reviewsSchema);

    // this.init();
  }

  // createFakeData() {
  //   console.log("creating fake data...");
  //   let productIdCounter = 1;
  //   let reviewsCounter = 0;

  //   const recursivelyCreateFakeDocs = () => {
  //     if (reviewsCounter === 1000) {
  //       return;
  //     }

  //     const reviewObj = {
  //       productId: productIdCounter,
  //       reviewId: reviewsCounter,
  //       username: faker.internet.userName(),
  //       stars: helpers.getRandomInt(6),
  //       title: faker.lorem.sentence(),
  //       text: faker.lorem.paragraphs(),
  //       timestamp: faker.date.past(),
  //       numHelpful: helpers.getRandomInt(1000),
  //       verifiedPurchase: Math.random() < 0.5,
  //       imageUrl: faker.image.imageUrl(),
  //     };

  //     const review = new this.Review(reviewObj);

  //     review.save((err) => {
  //       if (err) return console.error(err);
  //       console.log("creating review " + reviewsCounter);
  //       reviewsCounter += 1;
  //       if (reviewsCounter % 10 === 0) {
  //         productIdCounter += 1;
  //       }
  //       return recursivelyCreateFakeDocs();
  //     });
  //   };
  //   recursivelyCreateFakeDocs();
  // }

  getReviews(productId, cb) {
    const search = { productId };
    // console.log(search);
    var queryString = `SELECT reviewsData.*, productinfo.productname FROM reviewsData INNER JOIN productinfo ON (reviewsData.productid = productinfo.productid AND productinfo.productid = ${search.productId})`;

    this.pool.query(queryString, (err, res) => {
      if (err) return console.error({err});
      redisClient.setex(productId, 10, JSON.stringify(res.rows));
      return cb(null, res.rows);
    });

    // redisClient.get(productId, function (err, result) {
    //   if (err) {
    //     console.log('err');
    //     console.error(err);
    //   } else if (!result) {
    //     console.log('!result');
    //     pool.query(queryString, (err, res) => {
    //       if (err) return console.error({err});
    //       redisClient.setex(productId, 100, JSON.stringify(res.rows));
    //       return cb(null, res.rows);
    //     });
    //   } else {
    //     console.log('else');
    //     return cb(null, JSON.parse(result));
    //   }
    // });
    // this.Review.find(search).sort({ numHelpful: -1 }).exec((err, reviews) => {
    //   if (err) return console.error(err);
    //   return cb(null, reviews);
    // });
  }

  // incrementHelpfulness(reviewId, cb) {
  //   const search = { reviewId };
  //   this.Review.find(search).exec((err, review) => {
  //     if (review) {
  //       const incrementedObj = review[0];
  //       incrementedObj.numHelpful += 1;
  //       const incrementedReview = new this.Review(incrementedObj);
  //       incrementedReview.save((err) => {
  //         if (err) return console.error(err);
  //         return cb(null, review);
  //       });
  //     }
  //   });
  // }

  createReviews(reviewObj) {
    var queryString = ``;

    this.pool.query(queryString, (err, res) => {
      if (err) return console.error({err});
      console.log(res.rows);
      return cb(null, res.rows);
    });
    // const newReview = new this.Review(reviewObj);
    // this.Review.find({reviewId: reviewObj.reviewId, productId: reviewObj.productId}).exec((err, review) => {
    //   if (review.length) {
    //     newReview.save((err)=>{
    //       return console.error(err);
    //     });
    //   }
    // });
  }

  // updateReviews(reviewObj, reviewId, productId, cb) {
  //   // const {reviewId, productId} = id;
  //   this.Review.findOneAndUpdate({productId, reviewId}, reviewObj, (err, product) => {
  //     if (err) console.error(err);
  //     cb(null, product);
  //   });
  // }

  // deleteReviews(reviewId, productId, cb) {
  //   this.Review.findOneAndDelete({reviewId, productId}, (err, product) => {
  //     if (err) console.error(err);
  //     cb(null, product);
  //   });
  // }

  // init() {
  //   mongoose.connect(this.dburi, { useNewUrlParser: true });
  //   this.db = mongoose.connection;
  //   this.db.on('error', console.error.bind(console, 'db connection error:'));
  //   this.db.once('open', () => {
  //     console.log("connected to mongo...");
  //   });
  // }

  // // TBD refactor in a DRY way with above
  // initAndSeed() {
  //   mongoose.connect(this.dburi, { useNewUrlParser: true });
  //   this.db = mongoose.connection;
  //   this.db.on('error', console.error.bind(console, 'db connection error:'));
  //   this.db.once('open', () => {
  //     console.log("connected to mongo...");
  //     this.createFakeData();
  //   });
  // }
}

const database = new Database();
module.exports = database;

/*
example data
{"_id":"5b918722d4a71c1897abb02f","productId":37,"reviewId":368,"username":"Parker_Nader66","stars":1,"title":"est dolore ducimus","text":"Vel molestias consequatur voluptatum vero labore dicta repellendus aut corporis. Et cupiditate minus nam. Perspiciatis dolorem omnis provident.","timestamp":"2018-02-01T17:26:28.993Z","numHelpful":965,"verifiedPurchase":true,"imageUrl":"http://lorempixel.com/640/480","__v":0}
*/
