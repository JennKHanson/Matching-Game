/**
//TODO: Make game accessible
//TODO: Add animation to flipping cards
//TODO: Make Refresh Button work when 1 card is flipped.
*/

const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
const deckdiv = document.querySelector('.deckdiv');
const noMatch = document.querySelectorAll('.hidden');
const movesNum = document.querySelector('.moves');
const refresh = document.querySelector('.restart');
const time = document.querySelector('.timer');


let flippedCards = [];
let matchedCards = [];

let moves = 0;
let sec = 1;

//UDACITY SHUFFLE FUNCTION from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//SHUFFLE CARDS FUNCTION
function shuffleCards() {
    const cardsArray = Array.from(document.querySelectorAll('.deck li'));
    const cardsRandom = shuffle(cardsArray);
    for (card of cardsRandom) {
        deck.appendChild(card);
    };
}

//CARD FLIPPING FUNCTION
/** CARD FLIPPING RESOURCE
 * https://matthewcranford.com
 * (I had 99% of this correct before using resource.
 * I got ES6 arrow function idea plus "!" from Matthew.)
 */
function flipCards() {
    deck.addEventListener('click', event => {
        const clickTarget = event.target;
        if (
            clickTarget.classList.contains('card') &&
            flippedCards.length < 2 &&
            !flippedCards.includes(clickTarget) &&
            !clickTarget.classList.contains('match')
        ) {
            // Push two flipped cards into flippedCards array in order to compare
            flippedCards.push(clickTarget);
            clickTarget.classList.toggle('open');
            clickTarget.classList.toggle('show');
            compareCards();
        }
    });
}

//COMPARE TWO CARD IN FLIPPED CARDS ARRAY
function compareCards() {
    if (
        flippedCards[0].firstElementChild.className ===
        flippedCards[1].firstElementChild.className
    ) {
        flippedCards[0].classList.toggle('match');
        flippedCards[1].classList.toggle('match');

        matchedCards.push(flippedCards[0]);
        matchedCards.push(flippedCards[1]);

        flippedCards = [];
    } else {
        //if cards don't match, flip them over after 1 second
        setTimeout(function() {
            flippedCards.forEach(function(card) {
                card.classList.remove('open', 'show');

                flippedCards = [];
            });
        }, 1000);
    }
    movesCounter();
}

//STARS SCORE -- LOSE 1 STAR AFTER 10 MOVES, LOSE 1 STAR AFTER 20 MOVES
function movesStars() {
    const stars = document.querySelectorAll('.stars li');
    const moves = movesNum.innerHTML;

    if (moves === '10') {
        stars[1].style.display = 'none';
    }

    if (moves === '15') {
        stars[2].style.display = 'none';
    }
}

//MOVES COUNTER
/** COUNTER RESOURCE
 *https://www.w3schools.com/jsref/met_node_removechild.asp
 */
function movesCounter() {
    moves++;
    movesNum.innerHTML = moves;
    movesStars();
}

//TIMER
/** TIMER RESOURCES
 *https://www.w3schools.com/js/js_arithmetic.asp
 *https://developer.mozilla.org/en-     US/docs/Mozilla/JavaScript_code_modules/Timer.jsm
 *https://stackoverflow.com/questions/31559469/how-to-create-a-simple-javascript-timer
 *http://api.jquery.com/one/
 */
function startTimer() {
    $('.deckdiv').one('click', function() {
        let sec = 0;
        let min = 0;
        let timer = setInterval(function() {

            time.innerHTML = min + ':' + 0 + sec;
            sec++;

            if (sec <= 9) {
                time.innerHTML = min + ':' + 0 + sec;
            }

            if (sec > 9) {
                time.innerHTML = min + ':' + sec;
            }

            if (sec === 60) {
                min++;
                sec = 0;
                time.innerHTML = min + ':' + 0 + sec;
            }

            if (matchedCards.length == 16) {
                clearInterval(timer);
                modal();
                displayModal();
                modalClick(); //
            }
            $('.restart').on('click', function() {
                clearInterval(timer);
                let min = 0;
                let sec = 0;
                time.innerHTML = min + ':' + 0 + sec;
                sec++;
            });
        }, 1000);
    });

}

//MODAL FOR DISPLAYING NUMBER OF STARS, NUMBER OF MOVES, TOTAL TIME
function modal() {
    const starsScore = document.querySelector('.stars-modal');
    const movesScore = document.querySelector('.moves-modal');
    const timeScore = document.querySelector('.time-modal');
    const starsData = document.querySelector('.stars').children.length;
    const movesData = moves;
    const timeData = document.querySelector('.timer').innerHTML;

    starsScore.innerHTML = starsData;
    movesScore.innerHTML = movesData;
    timeScore.innerHTML = timeData;
}

//MODAL DISPLAY FUNCTION
function displayModal() {
    const modalShow = document.querySelector('.modal');
    const modalBoxShow = document.querySelector('.modal-box');
    modalShow.classList.toggle('modal-display');
    modalBoxShow.classList.toggle('modal-display');
}

//MODAL CLICK EVENTS
function modalClick() {
    const yesButton = document.querySelector('.yes');
    const noButton = document.querySelector('.no');

    yesButton.addEventListener('click', function() {
        resetAll();
        displayModal();
        //location.reload() is the cheater function :)
    });

    noButton.addEventListener('click', function() {
        displayModal();
    });
}

//REFRESH BUTTON CLICK EVENT
function refreshButton() {
    refresh.addEventListener('click', function() {
        resetAll();
    });
}

//GAME RESET FUNCTION
function resetAll() {
    refreshStars();
    refreshMoves();
    startTimer();
    refreshMatched();
    let flippedCards = [];
    matchedCards.length = 0;
    shuffleCards();
}

//RESETS STARS TO THREE
function refreshStars() {
    const stars = document.querySelectorAll('.stars li');

    if (stars[1].style.display = 'none') {
        stars[1].style.display = 'inline-block';
    }
    if (stars[2].style.display = 'none') {
        stars[2].style.display = 'inline-block';
    }
}

//RESET MOVES TO 0
function refreshMoves() {
    moves = 0;
    movesNum.innerHTML = 0;
    flipCards();
}

//RESET MATCHED CARDS TO START NEW GAME
function refreshMatched() {
    const matched = document.querySelectorAll('.deck li');
    matched.forEach(function(item) {
        if (item.classList.contains('match')) {
            item.classList.remove('match');
            item.classList.remove('open');
            item.classList.remove('show');
        }
    });
}

//FUNCTIONS
displayModal();
refreshButton();
//shuffleCards();
startTimer();
flipCards();
