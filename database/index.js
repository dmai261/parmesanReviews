const mongoose = require('mongoose');
const faker = require('faker');
const helpers = require('../server/helpers.js');

class Database {
  constructor() {
    this.creatingFakeData = false;
    this.dburi = process.env.DBURI;
    this.user = process.env.DBUSER;
    this.pw = process.env.DBPW;
    this.Schema = mongoose.Schema;
    this.reviewsSchema = new this.Schema({
      productId: Number,
      reviewId: Number,
      username: String,
      stars: Number,
      title: String,
      text: String,
      timestamp: Date,
      numHelpful: Number,
      verifiedPurchase: Boolean,
      imageUrl: String,
    });
    this.Review = mongoose.model('Review', this.reviewsSchema);

    this.init();
  }

  createFakeData() {
    if (this.creatingFakeData) {
      console.log("creating fake data...");
      let productIdCounter = 1;
      let reviewsCounter = 0;

      const recursivelyCreateFakeDocs = () => {
        if (reviewsCounter === 1000) {
          return;
        }

        const reviewObj = {
          productId: productIdCounter,
          reviewId: reviewsCounter,
          username: faker.internet.userName(),
          stars: helpers.getRandomInt(6),
          title: faker.lorem.words(),
          text: faker.lorem.paragraph(),
          timestamp: faker.date.past(),
          numHelpful: helpers.getRandomInt(1000),
          verifiedPurchase: Math.random() < 0.5,
          imageUrl: faker.image.imageUrl(),
        };

        const review = new this.Review(reviewObj);

        review.save((err) => {
          if (err) return console.error(err);
          reviewsCounter += 1;
          if (reviewsCounter % 10 === 0) {
            productIdCounter += 1;
          }
          return recursivelyCreateFakeDocs();
        });
      };

      recursivelyCreateFakeDocs();
    }
  }

  init() {
    mongoose.connect(`mongodb://${this.user}:${this.pw}${this.dburi}`);
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'db connection error:'));
    this.db.once('open', () => {
      console.log("connected to mLab...");
      this.createFakeData();
    });
  }
}

const database = new Database();
module.exports = database;
