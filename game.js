var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
   animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});



function nextSequence() {
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);

userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);



}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

  $(document).addClass("game-over");
  setTimeout(function () {
    $(document).removeClass("game-over");
  }, 200);

  $(document).keypress(function() {
    if (!started) {
      $("#level-title").text("level" + level);
      nextSequence();
      started = true;
    }
  });

  function checkAnswer(currentLevel) {

      //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){

          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);

        }

      } else {

        console.log("wrong");
          playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game over, Press any key to restart")
  startOver();
      }

  }


function startOver() {
  level = 0;
 gamePattern = [];
 started = false;
}
