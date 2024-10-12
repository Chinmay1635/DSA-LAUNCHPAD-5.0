const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

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
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
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
