const memes = [
    { id: 'skibidi', emoji: '🚽' },
    { id: 'sigma', emoji: '🐺' },
    { id: 'rizz', emoji: '💫' },
    { id: 'sussy', emoji: '📮' },
    { id: 'doge', emoji: '🐕' },
    { id: 'pepe', emoji: '🐸' },
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let isLocked = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';

    // Create pairs
    cards = [];
    memes.forEach(meme => {
        cards.push({ ...meme });
        cards.push({ ...meme });
    });
    shuffle(cards);

    cards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.dataset.index = index;
        cardEl.textContent = '❓';
        cardEl.addEventListener('click', () => flipCard(cardEl, index));
        board.appendChild(cardEl);
    });

    // Reset stats
    matchedPairs = 0;
    moves = 0;
    flippedCards = [];
    isLocked = false;
    updateStats();
}

function flipCard(cardEl, index) {
    if (isLocked) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    cardEl.classList.add('flipped');
    cardEl.textContent = cards[index].emoji;
    flippedCards.push({ element: cardEl, index: index });

    if (flippedCards.length === 2) {
        moves++;
        updateStats();
        checkMatch();
    }
}

function checkMatch() {
    isLocked = true;
    const [card1, card2] = flippedCards;

    if (cards[card1.index].id === cards[card2.index].id) {
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        matchedPairs++;
        updateStats();
        flippedCards = [];
        isLocked = false;

        if (matchedPairs === memes.length) {
            setTimeout(() => alert('🎉 You won in ' + moves + ' moves!'), 300);
        }
    } else {
        setTimeout(() => {
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
            card1.element.textContent = '❓';
            card2.element.textContent = '❓';
            flippedCards = [];
            isLocked = false;
        }, 800);
    }
}

function updateStats() {
    document.getElementById('moves').textContent = 'Moves: ' + moves;
    document.getElementById('matches').textContent = 'Matches: ' + matchedPairs + ' / ' + memes.length;
}

document.getElementById('restart-btn').addEventListener('click', createBoard);

createBoard();
