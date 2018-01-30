/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const db = require("../../server/lib/in-memory-db.js");
const DataHelpers = require("../../server/lib/data-helpers.js")(db);

$("document").ready( function() {

  DataHelpers.getTweets(db).forEach( function() {
    console.log(tweet);
  });
});