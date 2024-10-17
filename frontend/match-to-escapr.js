// const gameContainer = document.getElementById('gameContainer');
// // const scoreDisplay = document.getElementById('score');
// const restartBtn = document.getElementById('restartBtn');
// const timerDisplay = document.getElementById('timer');

// const cards = [
//     { id: 1, text: 'O(1)', pairId: 'Accessing Array Element' },
//     { id: 2, text: 'O(n)', pairId: 'Linear Search' },
//     { id: 3, text: 'O(n^2)', pairId: 'Bubble Sort' },
//     { id: 4, text: 'O(log n)', pairId: 'Binary Search' },
//     { id: 5, text: 'O(n log n)', pairId: 'Merge Sort' },
//     { id: 6, text: 'O(2^n)', pairId: 'Fibonacci Sequence' },
//     { id: 7, text: 'O(n!)', pairId: 'Traveling Salesman Problem' },
//     { id: 8, text: 'Accessing Array Element', pairId: 'O(1)' },
//     { id: 9, text: 'Linear Search', pairId: 'O(n)' },
//     { id: 10, text: 'Bubble Sort', pairId: 'O(n^2)' },
//     { id: 11, text: 'Binary Search', pairId: 'O(log n)' },
//     { id: 12, text: 'Merge Sort', pairId: 'O(n log n)' },
//     { id: 13, text: 'Fibonacci Sequence', pairId: 'O(2^n)' },
//     { id: 14, text: 'Traveling Salesman Problem', pairId: 'O(n!)' },
//     { id: 15, text: 'O(sqrt(n))', pairId: 'Prime Factorization' },
//     { id: 16, text: 'O(n^3)', pairId: 'Matrix Multiplication' },
//     { id: 17, text: 'O(2^n)', pairId: 'Tower of Hanoi' },
//     { id: 18, text: 'Prime Factorization', pairId: 'O(sqrt(n))' },
//     { id: 19, text: 'Matrix Multiplication', pairId: 'O(n^3)' },
//     { id: 20, text: 'Tower of Hanoi', pairId: 'O(2^n)' },
// ];

// let firstCard, secondCard;
// let lockBoard = false;
// let score = 0;
// let timer;
// let timeElapsed = 0;
// let matchedPairs = 0;

// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]]; // Swap elements
//     }
// }

// function startTimer() {
//     timeElapsed = 0;
//     timer = setInterval(() => {
//         timeElapsed++;
//         timerDisplay.innerText = `Time: ${timeElapsed} sec`;
//     }, 1000);
// }

// function stopTimer() {
//     clearInterval(timer);
// }

// function createCards() {
//     shuffle(cards);
//     cards.forEach(card => {
//         const cardElement = document.createElement('div');
//         cardElement.classList.add('card');
//         cardElement.dataset.id = card.id;
//         cardElement.innerText = card.text;
//         cardElement.addEventListener('click', flipCard);
//         gameContainer.appendChild(cardElement);
//     });
//     startTimer(); // Start the timer when the cards are created
// }

// function flipCard() {
//     if (lockBoard) return;

//     this.classList.add('flipped');

//     if (!firstCard) {
//         firstCard = this;
//         return;
//     }

//     secondCard = this;
//     lockBoard = true; // Lock the board to prevent clicking on other cards

//     checkMatch();
// }

// function checkMatch() {
//     const firstCardId = firstCard.dataset.id;
//     const secondCardId = secondCard.dataset.id;

//     if (cards[firstCardId - 1].pairId === cards[secondCardId - 1].text) {
//         matchedPairs++;
//         resetBoard();
        // if (matchedPairs === cards.length / 2) {
        //     stopTimer(); // Stop the timer when all pairs are matched
        //     calculateScore();
        //     alert(`Game Over! Your score is ${score}`);
        // }
//     } else {
//         setTimeout(() => {
//             firstCard.classList.remove('flipped');
//             secondCard.classList.remove('flipped');
//             resetBoard();
//         }, 1000);
//     }
// }

// function calculateScore() {
//     score = 100 - timeElapsed; // Adjust the score based on the time taken
//     if (score < 0) score = 0; // Ensure score doesn't go below zero
//     scoreDisplay.innerText = `Score: ${score}`;
// }

// function resetBoard() {
//     [firstCard, secondCard, lockBoard] = [null, null, false];
// }

// function restartGame() {
//     gameContainer.innerHTML = '';
//     score = 0;
//     matchedPairs = 0;
//     timeElapsed = 0;
//     scoreDisplay.innerText = `Score: ${score}`;
//     timerDisplay.innerText = `Time: ${timeElapsed} sec`;
//     createCards();
//     stopTimer(); // Reset the timer when the game restarts
// }

// restartBtn.addEventListener('click', restartGame);
// createCards();


////////////////////////////////

const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const timerDisplay = document.getElementById('timer');

const cards = [
    { id: 1, text: 'O(1)', pairId: 'Accessing Array Element' },
    { id: 2, text: 'O(n)', pairId: 'Linear Search' },
    { id: 3, text: 'O(n^2)', pairId: 'Bubble Sort' },
    { id: 4, text: 'O(log n)', pairId: 'Binary Search' },
    { id: 5, text: 'O(n log n)', pairId: 'Merge Sort' },
    { id: 6, text: 'O(2^n)', pairId: 'Fibonacci Sequence' },
    { id: 7, text: 'O(n!)', pairId: 'Traveling Salesman Problem' },
    { id: 8, text: 'Accessing Array Element', pairId: 'O(1)' },
    { id: 9, text: 'Linear Search', pairId: 'O(n)' },
    { id: 10, text: 'Bubble Sort', pairId: 'O(n^2)' },
    { id: 11, text: 'Binary Search', pairId: 'O(log n)' },
    { id: 12, text: 'Merge Sort', pairId: 'O(n log n)' },
    { id: 13, text: 'Fibonacci Sequence', pairId: 'O(2^n)' },
    { id: 14, text: 'Traveling Salesman Problem', pairId: 'O(n!)' },
    { id: 15, text: 'O(sqrt(n))', pairId: 'Prime Factorization' },
    { id: 16, text: 'O(n^3)', pairId: 'Matrix Multiplication' },
    { id: 17, text: 'O(2^n)', pairId: 'Tower of Hanoi' },
    { id: 18, text: 'Prime Factorization', pairId: 'O(sqrt(n))' },
    { id: 19, text: 'Matrix Multiplication', pairId: 'O(n^3)' },
    { id: 20, text: 'Tower of Hanoi', pairId: 'O(2^n)' },
];



let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let finalScore = 0;
let timer;
let timeElapsed = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }

    // Update IDs based on new order
    array.forEach((card, index) => {
        card.id = index + 1; // Assign new ID based on new index
    });
}

function startTimer() {
    timeElapsed = 0;
    timer = setInterval(() => {
        timeElapsed++;
        timerDisplay.innerText = `Time: ${timeElapsed} sec`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function createCards() {
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.innerText = card.text;
        cardElement.addEventListener('click', flipCard);
        gameContainer.appendChild(cardElement);
    });
    startTimer();
}

function flipCard() {
    if (lockBoard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkMatch();
}

function checkMatch() {
    const firstCardId = firstCard.dataset.id;
    const secondCardId = secondCard.dataset.id;

    if (cards[firstCardId - 1].pairId === cards[secondCardId - 1].text) {
        score++;
        scoreDisplay.innerText = score;
        resetBoard();

        if (score === 10) {
            stopTimer(); // Stop the timer when all pairs are matched
            calculateScore();
            completeLevel(finalScore, 1, 'Match-to-escape');
            alert(`Game Over! Your score is ${finalScore}`);
            home();
        }

    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function calculateScore() {
    finalScore = 120 - timeElapsed; // Adjust the score based on the time taken
    if (finalScore < 0) finalScore = 10; // Ensure score doesn't go below zero
    scoreDisplay.innerText = `Score: ${finalScore}`;
}

function completeLevel(score, level, game) {
    const email = localStorage.getItem('email');

    fetch('https://dsa-launchpad-5-0.vercel.app/update-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score: score, level: level, game: game, email: email }) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Score updated successfully:", data.newScore);
        } else {
            console.error("Failed to update score:", data.message);
        }
    })
    .catch(error => console.error("Error updating score:", error));
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartGame() {
    gameContainer.innerHTML = '';
    score = 0;
    scoreDisplay.innerText = score;
    createCards();
}

restartBtn.addEventListener('click', restartGame);
createCards();

function home() {
    window.location.href = '/home.html';
}