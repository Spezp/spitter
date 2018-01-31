/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

// Determines how many days, or months, or years ago a post was made and returns a relevant string
const datePosted = function(ms) {
  var date = Math.floor((Date.now() - ms) / 86400000);
  if(date >= 365) {
    date = Math.floor(date / 365);
    if(date > 1) {
      return `${date} years ago`;
    } else {
      return `${date} year ago`;
    }

  } else if( date >= 30) {
    if(date > 1) {
      return `${date} months ago`;
    } else {
      return `${date} month ago`;
    }
  } else if( date >= 7) {
    if(date > 1) {
      return `${date} days ago`;
    } else {
      return `${date} day ago`;
    }
  } else if( date < 1 ) {
    return `Today`;
  }
};
// loops through tweets and calls creatTweeElemt for each tweet.
// Takes return value and appends it to the tweets container.
function renderTweets(tweets) {

}


// Creates new Tweet based off of template. The array is for visual organization. It is joined before befor being returned.
const createTweetElement = function(tweetDB) {

  let template = [
    `<section class="tweet-article">`,

      `<header>`,
        `<img class="avatar" src="${tweetDB.user.avatars.small}">`,
        `<h2>${tweetDB.user.name}</h2>`,
        `<p class="handle">${tweetDB.user.handle}</p>`,
      `</header>`,

      `<article>`,
        `<p>${tweetDB.content.text}</p>`,
      `</article>`,

        `<footer>`,
          `<p class="whenPosted">${datePosted(tweetDB.created_at)}</p>`,
          `<div class="social">`,
            `<a href="#"><i class="far fa-flag"></i></a>`,
            `<a href="#"><i class="fas fa-retweet"></i></a>`,
            `<a href="#"><i class="fas fa-heart"></i></a>`,
          `</div">`,
        `</footer>`,

      `</section>`

  ];

  return template.join('');
};

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


$("document").ready( function() {
  $(".tweet-article").hover( function() {

    // On hover .tweet elements become fully opaque
    $(this).animate({
      opacity: 1
    }, 200 );
    $($(this).children("footer").children(".social")).animate({
      opacity: 1
    }, 200 );
  }, function() {
    $(this).animate({
      opacity: 0.75
    }, 200 );
    $($(this).children("footer").children(".social")).animate({
      opacity: 0
    }, 200 );

  });
});