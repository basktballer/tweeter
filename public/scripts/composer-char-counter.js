// console.log("Character counter connected.")
$(document).ready(function() {
  // --- our code goes here ---
  // console.log("DOM Ready.")
  $(".tweet-area").on("input", function(ev) {
    // --- our code goes here ---
    
    let elm = $(this);
    let counter = elm.siblings("span");
    let charRemain = 140;
    
    if (elm.val().length === 0) {
      charRemain = 140;
    } else {
      charRemain = charRemain - elm.val().length;
    }

    if (charRemain > 0) {
      counter.css("color", "#244751");
    } else {
      counter.css("color", "red");
    }
    
    counter.text(charRemain.toString());
    // console.log( elm.val(), counter.innerText, charRemain );
    // console.log( counter );
  });

});

