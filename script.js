// ============================================
// FULL MEME POOL - Different memes every game!
// ============================================
const FULL_MEME_POOL = [
    { id: 'skibidi', emoji: '🚽', name: 'Skibidi Toilet' },
    { id: 'sigma', emoji: '🐺', name: 'Sigma Male' },
    { id: 'rizz', emoji: '💫', name: 'W Rizz' },
    { id: 'sussy', emoji: '📮', name: 'Sussy Baka' },
    { id: 'doge', emoji: '🐕', name: 'Doge' },
    { id: 'pepe', emoji: '🐸', name: 'Pepe' },
    { id: 'npc', emoji: '🤖', name: 'NPC' },
    { id: 'chad', emoji: '💪', name: 'GigaChad' },
    { id: 'skull', emoji: '💀', name: "I'm Dead" },
    { id: 'moai', emoji: '🗿', name: 'Moai' },
    { id: 'cap', emoji: '🧢', name: 'No Cap' },
    { id: 'fire', emoji: '🔥', name: "It's Lit" },
    { id: 'brain', emoji: '🧠', name: 'Galaxy Brain' },
    { id: 'clown', emoji: '🤡', name: 'Clown Moment' },
    { id: 'grimace', emoji: '🟣', name: 'Grimace Shake' },
    { id: 'hawk', emoji: '🦅', name: 'Hawk Tuah' },
    { id: 'mewing', emoji: '🤫', name: 'Mewing' },
    { id: 'aura', emoji: '✨', name: '+1000 Aura' },
    { id: 'gyatt', emoji: '😱', name: 'GYATT' },
    { id: 'fanum', emoji: '💰', name: 'Fanum Tax' },
    { id: 'ratio', emoji: '📉', name: 'Ratio + L' },
    { id: 'bussin', emoji: '🍔', name: 'Bussin' },
    { id: 'sheesh', emoji: '🥶', name: 'SHEESH' },
    { id: 'sus', emoji: '🔴', name: 'Among Us' },
    { id: 'nyan', emoji: '🌈', name: 'Nyan Cat' },
    { id: 'troll', emoji: '😈', name: 'Trollface' },
    { id: 'wojak', emoji: '😐', name: 'Wojak' },
    { id: 'vine', emoji: '📱', name: 'Vine Boom' },
    { id: 'edge', emoji: '😤', name: 'Edging' },
    { id: 'ohio', emoji: '🌽', name: 'Only in Ohio' },
];

const PAIRS_COUNT = 8; // 8 pairs = 16 cards (4x4 grid)

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let isLocked = false;

// Fisher-Yates shuffle
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Pick random memes from the pool each game
function getRandomMemes(count) {
    const shuffled = shuffle(FULL_MEME_POOL);
    return shuffled.slice(0, count);
}

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    document.getElementById('win-overlay').classList.add('hidden');

    // Pick random memes for this game
    const selectedMemes = getRandomMemes(PAIRS_COUNT);

    // Create pairs
    cards = [];
    selectedMemes.forEach(meme => {
        cards.push({ ...meme });
        cards.push({ ...meme });
    });
    cards = shuffle(cards);

    // Render cards
    cards.forEach((card, index) => {
        const el = document.createElement('div');
        el.classList.add('card');
        el.dataset.index = index;
        el.innerHTML = '❓';
        el.addEventListener('click', () => flipCard(el, index));
        board.appendChild(el);
    });

    // Reset state
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
    el.innerHTML = `${cards[index].emoji}<span class="card-name">${cards[index].name}</span>`;
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
        // Match found!
        c1.element.classList.add('matched');
        c2.element.classList.add('matched');
        matchedPairs++;
        updateStats();
        flippedCards = [];
        isLocked = false;

        if (matchedPairs === PAIRS_COUNT) {
            document.getElementById('status').textContent = '🏆 Won!';
            setTimeout(() => showWin(), 500);
        }
    } else {
        // No match
        setTimeout(() => {
            c1.element.classList.remove('flipped');
            c2.element.classList.remove('flipped');
            c1.element.innerHTML = '❓';
            c2.element.innerHTML = '❓';
            flippedCards = [];
            isLocked = false;
        }, 900);
    }
}

function showWin() {
    document.getElementById('win-overlay').classList.remove('hidden');
    document.getElementById('win-details').textContent =
        `You found all ${PAIRS_COUNT} pairs in ${moves} moves! 🔥`;
}

function updateStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('matches').textContent = `${matchedPairs} / ${PAIRS_COUNT}`;
}

document.getElementById('restart-btn').addEventListener('click', createBoard);
document.getElementById('play-again-btn').addEventListener('click', createBoard);

// Start the game!
createBoard();
