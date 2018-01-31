// Jquery ------

$("document").ready( function() {

  // Hover Effect
  // Tweet elements become fully opaque
  let hoverEffect = () => {
    $(".tweet-article").hover( function() {

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
  };

  // Prevents newtweet from default event behaviour(sic)
  // POST tweet new tweet as string
  $(":submit").click( function( event ) {
    event.preventDefault();
    let tweetString = $("#tweet-form").serialize();
    $.post( "/tweets", $( "#tweet-form" ).serialize() );
  });

  // Determines how many days, or months, or years ago a post was made
  // and returns a relevant string
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
    return dateStr;
  };

  // Creates new Tweet based off of template. The array is for visual
  // organization. It is joined before befor being returned.
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

  // loops through tweets and calls creatTweeElemt for each tweet.
  // Takes return value and appends it to the tweets container.
  function renderTweets(tweets) {
    tweets.forEach( function(tweet) {
      $('.tweet-container').append(createTweetElement(tweet));
    });
    hoverEffect();
  }

  let loadTweets = () => {
    $.getJSON("/tweets", (json) => {
      renderTweets(json);
    });
  };

  loadTweets();

});
