$(document).ready(function() {
  // on input into tweet-area, count characters entered
  $(".tweet-area").on("input", function(ev) {   
    let elm = $(this);
    let counter = elm.siblings("span");
    let charRemain = 140;
    
    if (elm.val().length === 0) {
      charRemain = 140;
    } else {
      charRemain = charRemain - elm.val().length;
    }

    if (charRemain >= 0) {
      counter.css("color", "#244751");
    } else {
      counter.css("color", "red");
    }
    
    counter.text(charRemain.toString());
  });

});

