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
  // Checks for empty tweet or over 140 chars. Open tingle modul with message
  $(":submit").click( function( event ) {
    event.preventDefault();
    let tweetString = $("#tweet-form").serialize();
    let count = $(".counter").text() - 140;
    if(count === 0) {
      modal.setContent("<h2 id='venomModal'>Empty tweet. Say something damnit</h2>");
      modal.open();
      return null;
    }
    console.log(Math.sign(count + 140));
    console.log(count + 140);
    if(Math.sign(count + 140) === -1) {
      modal.setContent("<h2 id='venomModal'>Over 140 characters!</h2>");
      modal.open();
      return null;
    }
    $.post( "/tweets", $( "#tweet-form" ).serialize() );
    loadNewTweet();

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
  function renderTweets(tweets, newtweet) {
    if(newtweet) {
         $(createTweetElement(tweets)).prependTo('.tweet-container').hide().slideDown();
    } else {
      tweets.forEach( function(tweet) {
        $(createTweetElement(tweet)).prependTo('.tweet-container');
      });
    }
    // Hover effect called after all tweets rendered
    hoverEffect();
  }

  let loadTweets = () => {
    $.getJSON("/tweets", (json) => {
      renderTweets(json, false);
    });
  };

  let loadNewTweet = () => {
    $.getJSON("/tweets", (json) => {
      console.log(json[json.length -1]);
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
    // cssClass: ['custom-class-1', 'custom-class-2'],
    // onOpen: function() {
    //     console.log('modal open');
    // },
    // onClose: function() {
    //     console.log('modal closed');
    // },
    // beforeClose: function() {
    //     // here's goes some logic
    //     // e.g. save content before closing the modal
    //     return true; // close the modal
    //   return false; // nothing happens
    // }
  });


});
