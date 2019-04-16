console.log("Character counter connected.")
$(document).ready(function() {
  // --- our code goes here ---
  console.log("DOM Ready.")
  // let counterVal = parseInt(counterText.innerText);
  $(".tweetArea").on("input", function(ev) {
    // --- our code goes here ---
    
    let elm = $(this);
    let counter = elm.nextUntil("span").last().next()['0'];
    // let counter = this.nextElementSibling.nextElementSibling;
    let charRemain = 140;
    
    if (elm.val().length === 0) {
      charRemain = 140;
    } else {
      charRemain = charRemain - elm.val().length;
    }

    if (charRemain > 0) {
      counter.style.color = "#244751";
    } else {
      counter.style.color = "red";
    }
    
    counter.innerText = charRemain.toString();
    // console.log( elm.val(), counter.innerText, charRemain );
    // console.log( counter );
  });

});



$("input").blur(function(){
  $(this).css("background-color", "#ffffff");
});
