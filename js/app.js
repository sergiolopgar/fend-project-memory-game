// Cards variables
let card = $(".card");
let cards = [...card];
let deck = $(".deck");
let pickedCards = [];
let clicks = [];
let matchedCards = [];

// Plays variables
let plays = 0;
let counter = $(".moves");

// Rating variable
let stars = $(".fa-star");

// Timer variables
let seconds, minutes = 0;
let timer = $(".timer");
timer.html("0mins 0secs");
var interval;

// Start the game with white balls
$(document).ready(whiteBall);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Function to start the game
function gameOn() {
    cards = $(shuffle(cards));

    deck.html("");

    cards.each(function() {
        deck.append(this);
        $(this).removeClass("show open match disabled");
      });

    plays = 0;
    counter.html(plays);

    stars.each(function() {
        $(this).css({
                    "color" : "#faff00",
                    "visibility" : "visible"
                  });
                });

    seconds = 0;
    minutes = 0;
    timer.html("0mins 0secs")
    clearInterval(interval);
}

// Function to start the timer
function timerOn() {
    interval = setInterval(function() {
        timer.html(minutes+"mins "+seconds+"secs");
        seconds++;
        if(seconds == 60) {
            minutes++;
            seconds=0;
        }
    },1000);
}

// Function to flip the cards and call timerOn to start timer
let showCard = function() {
    clicks.push(this);

    if (clicks.length === 1){
        timerOn();
    };

    $(this).toggleClass("open show disabled");
}

// Function to determinate wether is a match or not
function openCard() {
  pickedCards.push(this);

  let long = pickedCards.length;

  if (long === 2) {
    playsCounter();
    if (pickedCards[0].type === pickedCards[1].type){
      matchCards();
    } else {
      unmatchCards();
    }
  }
}

// Function to increase number of plays made and rate according to them
function playsCounter() {
    plays++;
    counter.html(plays)

    if (plays > 10 && plays <= 15) {
        $(".fa-star:last").css("visibility", "collapse");

    } else if (plays > 15) {
        $(".middle-star").css("visibility", "collapse");
      };
}

// Function to block cards when match
function matchCards() {
    $(pickedCards[0]).removeClass("show open").addClass("match disabled");
    $(pickedCards[1]).removeClass("show open").addClass("match disabled");
    matchedCards.push(pickedCards[0]);
    matchedCards.push(pickedCards[1]);
    pickedCards = [];
}

// Function to flip over the cards unmatched after checked
function unmatchCards() {
    $(pickedCards[0]).addClass("unmatch");
    $(pickedCards[1]).addClass("unmatch");

    blockCard();

    setTimeout(function() {
        $(pickedCards[0]).removeClass("show open disabled unmatch");
        $(pickedCards[1]).removeClass("show open disabled unmatch");
        unblockCard();
        pickedCards = [];
      }, 750);
}

// Function to avoid cards for flipping over
function blockCard() {
    Array.prototype.filter.call(cards, function() {
        card.addClass("disabled");
    });
}

// Function to allow cards to flip over
function unblockCard() {
    Array.prototype.filter.call(cards, function() {
        card.removeClass("disabled");

        $(".match").each(function() {
            $(this).addClass("disabled");
          });
      });
}

// Function to display congratulation modal
function gameOver() {
    if (matchedCards.length === 16) {
        clearInterval(interval);
        let timeMade = timer.html();
        let scoreMade = $(".stars").html();
        $(".modal").css("display", "block");

        if ($(".fa-star:last").css("visibility") === "collapse" && $(".middle").css("visibility") === "collapse" ) {
            $(".message").html("You did it, but I guess you can do it better than that.");

        } else if ($(".fa-star:last").css("visibility") === "collapse") {
            $(".message").html("Well done!!! Do you dare to go for a perfect score?");

        } else {
            $(".message").html("Amazing. You've rated the highest score");
          };

        $(".playsMade").html(plays);
        $(".timeMade").html(timeMade);
        $(".scoreMade").html(scoreMade);

        playAgain();
    };
}

// Function to restart the game
function playAgain() {
  $(".modalRestart").click(function() {
      $(".modal").css("display", "none");
      matchedCards = [];
      clicks = [];
      gameOn();
      clickOnCards();
    });
}

// Also function to restart the game
$(".restart").click(function() {
    clicks = [];
    gameOn();
    clickOnCards();
});

// Bind each card of the deck with different functions after click
function clickOnCards() {
    cards.each(function() {
        $(this).click(showCard);
        $(this).click(openCard);
        $(this).click(gameOver);
      });
}

// Open dropdown on click
function myFunction() {
  $("#myDropdown").toggleClass("show");
}

// Close the dropdown menu if the clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {

      let dropdowns = $(".dropdown-content");

      dropdowns.each(function() {
          let openDropdown = $(this);
          if (openDropdown.hasClass("show")) {
            openDropdown.removeClass("show");
          }
      });

    }
}

// Change cards background depending on click in dropdown
$(".eightBall-dropdown").click(eightBall);
$(".stripes-dropdown").click(stripes);
$(".solids-dropdown").click(solids);

// Change cards and dropdown background to white ball
function whiteBall() {
    $(".deck .card").addClass("whiteBall");
}

// Change cards and dropdown background to eight ball
function eightBall() {
    clicks = [];
    gameOn();
    clickOnCards();

    $(".dropbtn").css({
                       "background" : "#000",
                       "color" : "#fff"
                    });

    $(".deck .card").addClass("eightBall").removeClass("whiteBall stripes solids").hasClass("whiteBall stripes solids");
}

// Change cards and dropdown background to stripes balls
function stripes() {
    clicks = [];
    gameOn();
    clickOnCards();

    $(".dropbtn").css({
                        "background" : "#632323",
                        "color" : "#fff"
                      });

    $(".deck .card").addClass("stripes").removeClass("whiteBall eightBall solids").hasClass("whiteBall eightBall solids");
}

// Change cards and dropdown background to solids balls
function solids() {
    clicks = [];
    gameOn();
    clickOnCards();

    $(".dropbtn").css({
                        "background" : "#632323",
                        "color" : "#fff"
                      });

    $(".deck .card").addClass("solids").removeClass("whiteBall eightBall stripes").hasClass("whiteBall eightBall stripes");
}
