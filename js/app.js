/*
 * Create a list that holds all of your cards
 */


let card = $(".card");

let cards = [...card];

let deck = $(".deck");

let plays = 0;

let counter = $(".moves");

let stars = $(".fa-star");

let matchedCards = [];

let seconds, minutes, hours = 0;
let timer = $(".timer");
timer.html("0mins 0secs");
var interval;

let cardsPicked = [];

let clicks = [];



$(document).ready(gameOn());



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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



function gameOn(){

  cards = $(shuffle(cards));

  deck.html("");

  cards.each(function(){
    deck.append(this);
    $(this).removeClass("show open match disabled");
  });

  plays = 0;

  counter.html(plays);

  stars.each(function(){
    $(this).css({
      "color" : "#faff00",
      "visibility" : "visible"
      });
    });

  seconds = 0;
  minutes = 0;
  hours = 0;
  timer.html("0mins 0secs")
  clearInterval(interval);

}


function timerOn(){
    interval = setInterval(function(){
        timer.html(minutes+"mins "+seconds+"secs") ;
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds=0;
        }
        if(minutes == 60){
            hours++;
            minutes = 0;
        }
    },1000);
}

let showCard = function(){
  $(this).toggleClass("open show disabled");
}

function openCard(){
  clicks.push(this);
  cardsPicked.push(this);
  let long = cardsPicked.length;
  if (clicks.length === 1){
    timerOn();
}
  if (long === 2){
    playsCounter();
    if (cardsPicked[0].type === cardsPicked[1].type){
      matchCards();
    } else {
      unmatchCards();
    }
  }
}

function playsCounter(){
  plays++;
  counter.html(plays)

  if (plays > 9 && plays <= 13){
        $(".fa-star:last").css("visibility", "collapse");

  } else if (plays > 13){
        $(".middle").css("visibility", "collapse");
    }

}

function matchCards(){
  $(cardsPicked[0]).removeClass("show open no-event").addClass("match disabled");
  $(cardsPicked[1]).removeClass("show open no-event").addClass("match disabled");
  matchedCards.push(cardsPicked[0]);
  matchedCards.push(cardsPicked[1]);
  cardsPicked = [];
}

function unmatchCards(){
  $(cardsPicked[0]).addClass("unmatch");
  $(cardsPicked[1]).addClass("unmatch");
  setTimeout(function(){
    $(cardsPicked[0]).removeClass("show open no-event unmatch");
    $(cardsPicked[1]).removeClass("show open no-event unmatch");
    cardsPicked = [];
  }, 750);
}

function gameOver(){
  if (matchedCards.length === 16){
    clearInterval(interval);
    let timeMade = timer.html();
    let scoreMade = $(".stars").html();
    $(".modal").css("display", "block");

    if ($(".fa-star:last").css("visibility") === "collapse" && $(".middle").css("visibility") === "collapse" ){
      $(".message").html("You did it, but I guess you can do it better than that.");
    } else if ($(".fa-star:last").css("visibility") === "collapse"){
        $(".message").html("Well done!!! Do you dare to go for a perfect score?");
    } else {
        $(".message").html("Amazing. You've rated the highest score");
    }

    $(".playsMade").html(plays);
    $(".timeMade").html(timeMade);
    $(".scoreMade").html(scoreMade);

    playAgain();
  };

}

function playAgain() {
  $(".modalRestart").click(function(){
    $(".modal").css("display", "none");
    matchedCards = [];
    location.reload();
  });

}

cards.each(function(){
  $(this).click(showCard);
  $(this).click(openCard);
  $(this).click(gameOver);

})

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
