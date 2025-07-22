var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;

//function for gamepattern

function nextSequence() {
 var level=0;
 level++;
  $("h1").text("Level "+ level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = arr[randomNumber];
  gamePattern.push(randomChosenColour);
  $("."+randomChosenColour);.fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);
}

//function for playing sound

function playsound(id) {
  var audio = new Audio("sounds/" + id + ".mp3");
  audio.play();
}

//handler function(user pattern)// //click detect
var activeid;
$(".btn").click(function () {
  activeid = this.id;
  handler();
  playsound(activeid);
  animatepress(activeid);
});
function handler() {
  var userChosenColour = activeid;
  userClickedPattern.push(userChosenColour);
}

//function for animation change (on click)
function animatepress(color) {
  var button = "." + color;
  $(button).addClass("pressed");
  setTimeout(function () {
    $(button).removeClass("pressed");
  }, 100);
}
// //press detect
let firstKeyPressed = false;

$("html").on("keydown", function(event) {
  if (!firstKeyPressed) {
    
    nextSequence();
    firstKeyPressed = true;
    console.log('First key pressed:', event.key);
    // Optional: Unbind the event if you only want it once
    // $(document).off('keydown');
  }
});

