var buttonArray = ["red", "green", "blue", "yellow"];

var gamePattern  = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
    if(started === false)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel)
{   
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function startOver()
{
    started = false;
    gamePattern = [];
    level = 0;
}

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonArray[randomNumber];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
}


$(".btn").click( function(){
    
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});



function playSound(randomChosenColour)
{
    var audio =  new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function animatePress(userChosenColour)
{
    $("#"+userChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+userChosenColour).removeClass("pressed");
    },150);
}

// test3
// lol lol lol