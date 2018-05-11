//Array that holds all cards
const card = document.getElementsByClassName("card");
let cardList = [...card];
console.log(cardList);

//Card Status
const cardFaceDown = document.getElementsByClassName("card");
const cardFaceUp = document.getElementsByClassName("card open show");
const matchedCard = document.getElementsByClassName("card match");

//All cards
const deck = document.querySelector(".deck");

//Moves
let moves = 0;
const counter = document.querySelector(".moves");

//Stars
const stars = document.querySelectorAll(".fa-star");

// array for opened cards
let openedCards = [];


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

//Shuffle cards on page load
document.body.onload = startGame();

//Shuffel and Start game 
function startGame(){
    cardList = shuffle(cardList);
    //Loop to remove classes cards
    for (let i = 0; i < cardList.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cardList, function(item) {
            deck.appendChild(item);
        });
        cardList[i].classList.remove("show", "open", "match");
    }
}





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
