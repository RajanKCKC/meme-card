const memes = [
    { id: 'skibidi', emoji: '🚽', name: 'Skibidi' },
    { id: 'sigma', emoji: '🐺', name: 'Sigma' },
    { id: 'rizz', emoji: '💫', name: 'Rizz' },
    { id: 'sussy', emoji: '📮', name: 'Sussy' },
    { id: 'doge', emoji: '🐕', name: 'Doge' },
    { id: 'pepe', emoji: '🐸', name: 'Pepe' },
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
    document.getElementById('win-message').classList.add('hidden');

    cards = [];
    memes.forEach(meme => {
        cards.push({ ...meme });
        cards.push({ ...meme });
    });
    shuffle(cards);

    cards.forEach((card, index) => {
        const el = document.createElement('div');
        el.classList.add('card');
        el.dataset.index = index;
        el.textContent = '❓';
        el.addEventListener('click', () => flipCard(el, index));
        board.appendChild(el);
    });

    matchedPairs = 0;
    moves = 0;
    flippedCards = [];
    isLocked = false;
    document.getElementById('status').textContent = 'Playing';
    updateStats();
}

function flipCard(el, index) {
    if (isLocked || el.classList.contains('flipped') || el.classList.contains('matched')) return;

    el.classList.add('flipped');
    el.textContent = cards[index].emoji;
    flippedCards.push({ element: el, index });

    if (flippedCards.length === 2) {
        moves++;
        updateStats();
        checkMatch();
    }
}

function checkMatch() {
    isLocked = true;
    const [c1, c2] = flippedCards;

    if (cards[c1.index].id === cards[c2.index].id) {
        c1.element.classList.add('matched');
        c2.element.classList.add('matched');
        matchedPairs++;
        updateStats();
        flippedCards = [];
        isLocked = false;

        if (matchedPairs === memes.length) {
            document.getElementById('status').textContent = 'Won!';
            document.getElementById('win-message').classList.remove('hidden');
            document.getElementById('win-details').textContent = 
                'Completed in ' + moves + ' moves!';
        }
    } else {
        setTimeout(() => {
            c1.element.classList.remove('flipped');
            c2.element.classList.remove('flipped');
            c1.element.textContent = '❓';
            c2.element.textContent = '❓';
            flippedCards = [];
            isLocked = false;
        }, 800);
    }
}

function updateStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('matches').textContent = matchedPairs + ' / ' + memes.length;
}

document.getElementById('restart-btn').addEventListener('click', createBoard);
document.getElementById('play-again-btn').addEventListener('click', createBoard);

createBoard();
