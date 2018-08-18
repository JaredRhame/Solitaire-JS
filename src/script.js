const myDiv = document.getElementById('my-div');
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

const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
const cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J','Q', 'K'];

let board = [pile1, pile2, pile3, pile4, pile5, pile6, pile7];

let deck = [];

let pile1Arr = deck.slice(0,1);
let pile2Arr = deck.slice(1,3);
let pile3Arr = deck.slice(3,6);
let pile4Arr = deck.slice(6,10);
let pile5Arr = deck.slice(10,15);
let pile6Arr = deck.slice(15,21);
let pile7Arr = deck.slice(21,28);
let startArr = deck.slice(28);

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

  // if (board.hasChildNodes()) {
  //   startDeck.appendChild(div);
  // }
}
