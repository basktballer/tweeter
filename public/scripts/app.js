/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from tweets.json

let composeDisplayed = false;

function timeDiff(time1, time2) {

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  let diff = time1 - time2;

  if (diff < msPerMinute) {
    return Math.round(diff/1000) + ' seconds ago';   
  } else if (diff < msPerHour) {
    return Math.round(diff/msPerMinute) + ' minutes ago';   
  } else if (diff < msPerDay ) {
    return Math.round(diff/msPerHour ) + ' hours ago';   
  } else if (diff < msPerMonth) {
    return Math.round(diff/msPerDay) + ' days ago';   
  } else if (diff < msPerYear) {
    return Math.round(diff/msPerMonth) + ' months ago';   
  } else {
    return Math.round(diff/msPerYear ) + ' years ago';   
  }
}


function createTweetElement(tweet) {

  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var datePosted = tweet.created_at;
  var dateNow = Date.now();
  // console.log(datePosted, datePosted.getTime(), dateNow, dateNow.getTime());
  

  // var diffDays = Math.round(Math.abs((datePosted.getTime() - dateNow.getTime())/(oneDay)));
  var diffDays = timeDiff(dateNow, datePosted);
  // console.log(diffDays);
  // let timeAgo = (tweet.created_at - Date.now())
  let $htmlOutput = $("<article>").addClass("tweet");  
  $htmlOutput.append($("</article>"));
  $htmlOutput.append($("<header>").append($(`<img src= ${tweet.user.avatars.small}>`)).append(`<h2>${tweet.user.name}</h2>`).append(`<p>${tweet.user.handle}</p>`));
  $htmlOutput.append($("<article>").append($(`<p>${escape(tweet.content.text)}</p>`)));
  $htmlOutput.append($("<footer>").append($(`<span>${diffDays}</span>`)).append($(`<span class="icons"><i class="material-icons">flag</i><i class="material-icons">cached</i><i class="material-icons">favorite</i></span>`)));
  
  return $htmlOutput;

}

function renderTweets(tweets) {
  for(var tweet of tweets) {
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
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function () {

  loadTweets();
  $("form").on("submit", function(event) {
    event.preventDefault();
    const userInput =  $(this).serialize();
    if (userInput.slice(5) === "" || userInput.slice(5) === undefined ) {
      alert("Blank entry submitted. Please enter tweet and try again.")
    } 
    else if (userInput.slice(5).length > 140) {
      alert("Tweet too long. Please ensure tweet length is 140 characters or less.")
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
  $("#compose-button").on("click", function () {
    $(".new-tweet").slideToggle("slow");
    if ($(".new-tweet").is(':visible')) 
    {
      $(".tweet-area").focus();
    }
  });
});