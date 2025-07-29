

//SIMON GAME


//array declaration for checking patterns

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];





//nextSequence Function
//function for gamepattern array

var level = 0;
function nextSequence() {
  var randomChosenColour;
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playsound(randomChosenColour);
}



//function for playing sound
function playsound(id) {
  var audio = new Audio("sounds/" + id + ".mp3");
  audio.play();
}




//click detect
//it checks for clicks and power sound and animate
var activeid;
$(".btn").click(function () {
  activeid = this.id;
  handler();
  playsound(activeid);
  animatepress(activeid);
});
//handler function(user pattern) 
function handler() {
  var userChosenColour = activeid;
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}




//function for animation change (on clicking button)
function animatepress(color) {
  var button = "." + color;
  $(button).addClass("pressed");
  setTimeout(function () {
    $(button).removeClass("pressed");
  }, 100);
}



//press detect
//if any key get pressed once  then game starts and second time it cant work until game-over.

let firstKeyPressed = false;

$("html").on("keydown", function (event) {
  if (!firstKeyPressed) {
    nextSequence();
    firstKeyPressed = true;
    console.log("First key pressed:", event.key);
  }
});


//CheckAnswer funtion
//at every instance the user click any button we need to check its answer by this function
//and if he is right then run nextsequence() function else startover() function
function checkAnswer(currlevel) {
  if (userClickedPattern[currlevel] === gamePattern[currlevel]) {
    if (currlevel == gamePattern.length - 1) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//StartOver Function
//if the game is over then restart the intial values by startover

function startOver() {
  level = 0;
  firstKeyPressed = false;
  gamePattern = [];
  userClickedPattern = [];
}
