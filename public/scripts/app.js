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
      $(".new-tweet").effect("shake");
      setTimeout( function() {
        $(".warning").slideToggle();
      }, 1000);
      $('#tweet-form').attr("placeholder", "Cotton mouthed? Say something!");
      return null;
    } else if(Math.sign(count + 140) === -1) {
      $(".new-tweet").effect("shake");
      setTimeout(function () {
        $(".warning").slideToggle();
      }, 1000);
      $('#tweet-form').attr("placeholder", "140 Characters Max!");
      return null;
    } else {
      $(".warning").hide();
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
    let postDate = new Date(ms);
    return moment(postDate).fromNow();
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
