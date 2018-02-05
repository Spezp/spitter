$("document").ready( function() {

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

  // Checks for empty tweet or over 140 chars. Open tingle modul with message
  $("#post-tweet").click( function( event ) {
    event.preventDefault();
    let tweetString = $("#tweet-form").serialize();
    let count = $(".counter").text() - 140;
    let isContent = $("textarea").val();
    
    if(count === 0 || !isContent.trim()) {
      modal.setContent("<h2 id='venomModal'>Cotton mouthed? Say something!</h2>");
      modal.open();
      return null;
    }
    if(Math.sign(count + 140) === -1) {
      modal.setContent("<h2 id='venomModal'>Over 140 characters!</h2>");
      modal.open();
      return null;
    }
    
    $.post( "/tweets", $( "#tweet-form" ).serialize(), function() {
      loadNewTweet();
    });
      
    

  });

  $(".compose").click( function( event ) {
    $(".new-tweet").slideToggle();
    $("#tweet-form").focus();
  });
  
  $("#mobile-compose").click(function (event) {
    $(".new-tweet").slideToggle();
  });

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

      date = date / 30;

      if(date > 1) {
        return `${date} months ago`;
      } else {
        return `${date} month ago`;
      }

    } else if( date >= 7) {

      date / 7;

      if(date > 1) {
        return `${date} weeks ago`;
      } else {
        return `${date} week ago`;
      }

    } else if( date >= 1 ) {
      
      if(date > 1) {
        return `${date} days ago`;
      } else {
        return `${date} day ago`;
      }
    } else if (date < 1) {
      return `Today`;
    }
  };

  // Creates new Tweet based off of template var
  const createTweetElement = function(tweetDB) {
    
    let template = [

      `<section class="tweet-article">`,

        `<header>`,
          `<img class="avatar" alt="${tweetDB.user.handle}" src="${tweetDB.user.avatars.small}">`,
          `<h2>${tweetDB.user.name}</h2>`,
          `<p class="handle">${tweetDB.user.handle}</p>`,
        `</header>`,

        `<article>`,
          `<p id="tweet-string" ></p>`,
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
  function renderTweets(tweets, newtweet) {
    let contentAll = '';

    if(newtweet) {
      $(createTweetElement(tweets)).prependTo('.tweet-container').hide().slideDown();
      contentAll = tweets.content.text
      $("#tweet-string").text(contentAll);
    } else {
      tweets.forEach( function(tweet) {
        $(createTweetElement(tweet)).prependTo('.tweet-container');
        
        contentAll = tweet.content.text;
        $("#tweet-string").text(contentAll);
      });
    }
    // Hover effect called after all tweets rendered
    hoverEffect();
    contentAll = String(contentAll);
    $("#tweet-string").text(contentAll);
  }

  let loadTweets = () => {
    $.getJSON("/tweets", (json) => {
      renderTweets(json, false);
    });
  };

  let loadNewTweet = () => {
    $.getJSON("/tweets", (json) => {
      renderTweets(json[json.length - 1], true);
    });
  };

  // function call to load initial tweets
  loadTweets();

  // Tingle Modal
  //
  var modal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close"
  });

  
});
