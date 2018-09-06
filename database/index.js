const mongoose = require('mongoose');

class Database {
  constructor() {
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
      timestamp: Date,
      numHelpful: Number,
      verifiedPurchase: Boolean,
      imageUrl: String,
    });

    this.init();
  }

  init() {
    console.log(`mongodb://${this.user}:${this.pw}${this.dburi}`);
    mongoose.connect(`mongodb://${this.user}:${this.pw}${this.dburi}`);
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'db connection error:'));
    this.db.once('open', function () {
      console.log("connected to mLab...");
      // we're connected!

      //TBD do stuff
    });
  }

}

const database = new Database();
module.exports = database;
