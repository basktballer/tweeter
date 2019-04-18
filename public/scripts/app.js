/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweet) {

  const diffDays = moment(tweet.created_at).fromNow();
  let $htmlOutput = $("<article>").addClass("tweet");  
  $htmlOutput.append($("</article>"));
  // $htmlOutput.append($("<header>").append($(`<img src= ${tweet.user.avatars.small}>`)).append(`<h2>${tweet.user.name}</h2>`).append(`<p>${tweet.user.handle}</p>`));
  $htmlOutput.append($("<article>").append($(`<p>${escape(tweet.content.text)}</p>`)));
  $htmlOutput.append($("<article>").append($("<p>").text(tweet.content.text)));

  $htmlOutput.append($("<footer>").append($(`<span>${diffDays}</span>`)).append($(`<span class="icons"><i class="material-icons">flag</i><i class="material-icons">cached</i><i class="material-icons">favorite</i></span>`)));
  
  return $htmlOutput;

}

function renderTweets(tweets) {
  for(const tweet of tweets) {
    $('#tweet-container').append(createTweetElement(tweet));
  }
}

function autoRenderNewTweet() {
  $.ajax({
    type: 'GET',
    url: "/tweets",
    dataType: 'JSON'})
  .done( response => {
    response.sort((a, b) => (a.created_at - b.created_at) ? -1 : 1);
    $('#tweet-container').prepend(createTweetElement(response[0]));    
  })
}

function loadTweets() {
  $.ajax({
    type: 'GET',
    url: "/tweets",
    dataType: 'JSON'})
  .done( response => {
    response.sort((a, b) => (a.created_at - b.created_at) ? -1 : 1);
    renderTweets(response);
  })
}

function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function enterKeyPress(e) {
  if (e.which == 13) {
    $("form").submit();
    return false;
  }
}

$(document).ready(function () {

  loadTweets();
  $("form").on("submit", function(event) {
    event.preventDefault();
    $(".input-error").slideUp("fast");
    $(".input-error").text("");
    const userInput =  $(this).serialize();
    if (userInput.slice(5) === "" || userInput.slice(5) === undefined ) {
      $(".input-error").slideToggle("fast", () => {
        $(".input-error").text("Blank entry submitted. Please enter tweet and try again.");
      });
    } 
    else if (userInput.slice(5).length > 140) {
      $(".input-error").slideToggle("fast", () => {
        $(".input-error").text("Tweet too long. Please ensure tweet length is 140 characters or less.");
      });
    }  
    else {
      $.ajax({
        type: 'POST',
        url: "/tweets",
        data: userInput
      })
      .done ( () => {
        console.log("Tweet uploaded");
        $(".tweet-area").val("");
        $( ".tweet-area" ).trigger( "input", [ "" ] );
        autoRenderNewTweet();
      })
      .fail ( () => {
        console.log("Tweet upload failed.");
      })
  
      // $.post("/tweets", tweet, function() {
      //   console.log("Tweet uploaded");
      // })    
    }
  });
  $("html").keypress(function (e) {
    if (e.which == 13) {
      // $("form").submit();
      return false;
    }
  });
  $(".tweet-area").keypress(function (e) {
    if (e.which == 13) {
      $("form").submit();
      return false;
    }
  });
  $("#compose-button").on("click", function () {
    $(".new-tweet").slideToggle("fast");
    if ($(".new-tweet").is(':visible')) 
    {
      $(".tweet-area").focus();
    }
  });
});