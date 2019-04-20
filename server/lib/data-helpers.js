"use strict";
const ObjectID      = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the mongodb`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to mongodb
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet,(err) => {
        if (err) throw err;
        callback(null,true);
      });
    },

    // Get all tweets in mongodb, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweets").find().toArray( (err, tweets) => {
        if(err) throw err;
        callback(null, tweets.sort(sortNewestFirst));
      });
      
    },

    // find Tweet by TweetID and update like counter, pass back new like count
    processLike: function(tweetID, action, callback) {
     
      db.collection("tweets").findOneAndUpdate(
        {_id: new ObjectID(tweetID)},
        { $inc: {likes: action}}, 
        {returnOriginal: false},
         (err, updatedtweet) => {
        if (err) throw err
        callback(null, updatedtweet.value.likes)
      });

      

    }

  };
}
