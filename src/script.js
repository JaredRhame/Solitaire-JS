const startDeck = document.getElementById('starting-deck');
const completed1 = document.getElementById('completed-1');
const completed2 = document.getElementById('completed-2');
const completed3 = document.getElementById('completed-3');
const completed4 = document.getElementById('completed-4');
const pile1 = document.getElementById('pile-1');
const pile2 = document.getElementById('pile-2');
const pile3 = document.getElementById('pile-3');
const pile4 = document.getElementById('pile-4');
const pile5 = document.getElementById('pile-5');
const pile6 = document.getElementById('pile-6');
const pile7 = document.getElementById('pile-7');
let playingBoard =  document.querySelector('#playing-board');


const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
const cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J','Q', 'K'];

let board = [pile1, pile2, pile3, pile4, pile5, pile6, pile7];

let deck = [];

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

//Shuffles the array that's given
Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

//loops through suits and values and creates new card objects for each
//suite,value set
//changed to pushing each suit/value pair into the deck array

for(let j = 0; j < suits.length; j++){

  for(let i = 0; i < cardValues.length; i++){
    //newCard.value = cardValues[i];
    let newCard = [cardValues[i], suits[j]].join(' ');
    deck.push(newCard);

  }
}

deck.shuffle();
deck.forEach(displayCards);

function displayCards(cards) {

  let div = document.createElement('div');
  //let iconHeart = '<i class="fas fa-heart"></i>';
  let para = document.createElement('p');
  //let icon = document.createElement('i');
  div.classList.add('card');
  // Checks for suit of cards and gives them the right color
  if (cards.includes("clubs") || cards.includes("spades")){
    div.style.borderColor = 'black';
  } else{
    div.style.borderColor = 'red';
  }
  para.textContent = cards;

  div.appendChild(para);


  let boardPile = Math.floor(Math.random() * 8);

// Checks the amount of cards(children nodes) a pile has and appends a new card if conditions are met. Each pile has a limit to the amount of cards that can be initially added. Any remaining cards go to startDeck
  for (var i = 0; i < board.length; i++) {
    if (board[i].hasChildNodes() < 1) {
      board[i].appendChild(div);
    }else if (board[i].childElementCount == 1 && board[i] !== board[0]) {
      board[i].appendChild(div);
    }else if (board[i].childElementCount == 2 && board[i] !== board[0,1]) {
      board[i].appendChild(div);
    }else if (board[i].childElementCount == 3 && board[i] !== board[0,1,2]){
      board[i].appendChild(div);
    }else if (board[i].childElementCount == 4 && board[i] !== board[0,1,2,3]){
      board[i].appendChild(div);
    }else if (board[i].childElementCount == 5 && board[i] !== board[0,1,2,3,4]){
      board[i].appendChild(div);
    }else if (board[i].childElementCount == 6 && board[i] !== board[0,1,2,3,4,5]){
      board[i].appendChild(div);
    }else if (board[i].childElementCount == 1) {
      startDeck.appendChild(div);

    }
  }
}
//Event handlers for touch (fingers/stylus)
playingBoard.addEventListener("touchstart", dragStart, false);
playingBoard.addEventListener("touchend", dragEnd, false);
playingBoard.addEventListener("touchmove", drag, false);
//Event handlers for mouse
playingBoard.addEventListener("mousedown", dragStart, false);
playingBoard.addEventListener("mouseup", dragEnd, false);
playingBoard.addEventListener("mousemove", drag, false);
let playingCards =  document.querySelectorAll('.card');

function dragStart(e) {
  //Checks if event was made by touch.
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }
  //Checks if the event was called on a playing card instead of just the playingBoard
  //Maybe add an && here for checking if card is face-up
  if (e.target === board) {
    active = true;
    //board[0].lastChild worked. Figure out how to do this witout writing it 100 times, probably a loop?
  }
}

function drag(e) {
  if (active) {
    if (e.type === "touchmove") {
      e.preventDefault();

      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, board);
  }

}
function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}
