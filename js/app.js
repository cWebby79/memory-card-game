//Array that holds all cards
const card = document.getElementsByClassName("card");
let cardList = [...card];

//Card Status
const matchedCard = document.getElementsByClassName("card match");

//All cards
const deck = document.querySelector(".deck");

//Moves
let moves = 0;
const moveCount = document.querySelector(".moves");

//Stars
const stars = document.querySelectorAll(".fa-star");

// array for opened cards
let openCards = [];

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
        cardList[i].classList.remove("show", "open", "match", "lock");
    }
    // reset moves
    moves = 0;
    moveCount.innerHTML = moves;
};



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

//Show/hide card toggle
function toggleCard(){
    this.classList.toggle("open");
    this.classList.toggle("show");
    
};

for (let i = 0; i < cardList.length; i++) {
    cardList[i].addEventListener('click', toggleCard);
    cardList[i].addEventListener('click', cardOpen);
    
};

//Add open cards to new array and compare
function cardOpen() {
    openCards.push(this);
    let numCards = openCards.length;
    if (numCards === 2){
        moveCounter();
        if (openCards[0].type === openCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

//Change class if openCards match and remove from array
function matched(){
    openCards[0].classList.remove("show", "open", "lock");
    openCards[1].classList.remove("show", "open", "lock");
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");
    openCards = [];
};

//Change class if openCards do not match and remove from array
//Also set time out to allow 2nd card to be shown
//Add "lock" to prevent more than 2 cards being opened
function unmatched(){
    for (let i = 0; i < cardList.length; i++){
        cardList[i].classList.add("lock");
        setTimeout(function(){        
            cardList[i].classList.remove("lock");
            openCards[0].classList.remove("show", "open", "lock");
            openCards[1].classList.remove("show", "open", "lock");
            openCards = [];
        }, 500);
    }
};

//Move Counter
function moveCounter(){
    moves++;
    moveCount.innerHTML = moves;
};



//Restart game event listener
const restart = document.querySelector(".fa-repeat");
restart.addEventListener('click', startGame);
