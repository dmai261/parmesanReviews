const { Pool, Client } = require('pg');
const redisClient = require('../psql_cache.js');
//ec2-54-159-217-184.compute-1.amazonaws.com
var connectionString = {
  user: 'power_user',
  host: 'ec2-54-159-217-184.compute-1.amazonaws.com',
  database: 'postgres',
  password: 'poweruser!@#',
  port: 5432,
};

class Database {
  constructor() {
    this.pool = new Pool(connectionString);
  }

  getReviews(productId, cb) {
    const search = { productId };
    var queryString = `SELECT reviewsInfo.*, productinfo.productname FROM reviewsInfo INNER JOIN productinfo ON (reviewsInfo.productid = productinfo.productid AND productinfo.productid = ${search.productId})`;

    this.pool.query(queryString, (err, res) => {
      if (err) return console.error({err});
      redisClient.setex(productId, 10, JSON.stringify(res.rows));
      return cb(null, res.rows);
    });

//     redisClient.get(productId, function (err, result) {
//       if (err) {
//         console.log('err');
//         console.error(err);
//       } else if (!result) {
//         console.log('!result');
//         pool.query(queryString, (err, res) => {
//           if (err) return console.error({err});
//           redisClient.setex(productId, 100, JSON.stringify(res.rows));
//           return cb(null, res.rows);
//         });
//       } else {
//         console.log('else');
//         return cb(null, JSON.parse(result));
//       }
//     });
    
//     this.Review.find(search).sort({ numHelpful: -1 }).exec((err, reviews) => {
//       if (err) return console.error(err);
//       return cb(null, reviews);
//     });
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
