let card = $(".card");

let cards = [...card];

let deck = $(".deck");

let plays = 0;

let counter = $(".moves");

let stars = $(".fa-star");

let matchedCards = [];

let seconds, minutes = 0;

let timer = $(".timer");

timer.html("0mins 0secs");

var interval;

let pickedCards = [];

let clicks = [];


$(document).ready(gameOn());


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

let showCard = function() {
    clicks.push(this);

    if (clicks.length === 1){
        timerOn();
    };

    $(this).toggleClass("open show disabled");
}

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

function playsCounter() {
    plays++;
    counter.html(plays)

    if (plays > 10 && plays <= 15) {
        $(".fa-star:last").css("visibility", "collapse");

    } else if (plays > 15) {
        $(".middle").css("visibility", "collapse");
      };
}

function matchCards() {
    $(pickedCards[0]).removeClass("show open").addClass("match disabled");
    $(pickedCards[1]).removeClass("show open").addClass("match disabled");
    matchedCards.push(pickedCards[0]);
    matchedCards.push(pickedCards[1]);
    pickedCards = [];
}

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

function blockCard() {
    Array.prototype.filter.call(cards, function() {
        card.addClass("disabled");
    });
}

function unblockCard() {
    Array.prototype.filter.call(cards, function() {
        card.removeClass("disabled");

        $(".match").each(function() {
            $(this).addClass("disabled");
          });
      });
}

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

function playAgain() {
  $(".modalRestart").click(function() {
      $(".modal").css("display", "none");
      matchedCards = [];
      location.reload();
    });
}

$(".restart").click(function() {
  location.reload();
})

cards.each(function() {
  $(this).click(showCard);
  $(this).click(openCard);
  $(this).click(gameOver);
})
