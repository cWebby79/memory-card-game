//Array that holds all cards
const card = document.getElementsByClassName("card");
let cardList = [...card];

//Card Status
const matchedCard = document.getElementsByClassName("card match");

//All cards
const deck = document.querySelector(".deck");

//Moves
let moves;
const moveCount = document.querySelector(".moves");

//Timer
let second;
const timer = document.querySelector(".timer");
let interval;


//Stars
const stars = document.querySelectorAll(".fa-star");
let starList = [...stars];

// array for opened cards
let openCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

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
function startGame() {
	cardList = shuffle(cardList);
	//Loop to remove classes cards
	for (let i = 0; i < cardList.length; i++) {
		deck.innerHTML = "";
		[].forEach.call(cardList, function(item) {
			deck.appendChild(item);
		});
		cardList[i].classList.remove("show", "open", "match", "lock");
	}
	// reset moves
	moves = 0;
	moveCount.innerHTML = moves;
	//reset time
	second = 0;
	timer.innerHTML = "Time: 0 secs";
	clearInterval(interval);
    //reset stars
    starList[1].style.display = "inline-block";
    starList[2].style.display = "inline-block";
};

/*
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Show/hide card toggle
function toggleCard() {
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
	if (numCards === 2) {
		moveCounter();
		if (openCards[0].type === openCards[1].type) {
			matched();
		} else {
			unmatched();
		}
	}
};

//Change class if openCards match and remove from array
function matched() {
	openCards[0].classList.remove("show", "open", "lock");
	openCards[1].classList.remove("show", "open", "lock");
	openCards[0].classList.add("match");
	openCards[1].classList.add("match");
	openCards = [];
};

//Change class if openCards do not match and remove from array
//Also set time out to allow 2nd card to be shown
//Add "lock" to prevent more than 2 cards being opened
function unmatched() {
	for (let i = 0; i < cardList.length; i++) {
		cardList[i].classList.add("lock");

		setTimeout(function() {
			cardList[i].classList.remove("lock");
			openCards[0].classList.remove("show", "open", "lock");
			openCards[1].classList.remove("show", "open", "lock");
			openCards = [];
		}, 500);
	}
};

//Move Counter
function moveCounter() {
	moves++;
	moveCount.innerHTML = moves;
	if (moves === 1) {
		startTimer();
	}
    //Star rating counter
    if (moves > 9 && moves <15) {
        starList[2].style.display = "none";
    }else if (moves > 15) {
        starList[1].style.display = "none";
    }
};

//Timer
function startTimer() {
	interval = setInterval(function() {
		timer.innerHTML = "Time: " + second + " secs";
		second++;
	}, 1000);
};



//Restart game event listener
const restart = document.querySelector(".fa-repeat");
restart.addEventListener('click', startGame);