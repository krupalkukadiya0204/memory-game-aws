document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    const levelSelect = document.getElementById('level');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    
    const cardImages = [
        { name: 'distracted', img: 'images/distracted.png' },
        { name: 'drake', img: 'images/drake.png' },
        { name: 'fine', img: 'images/fine.png' },
        { name: 'rollsafe', img: 'images/rollsafe.png' },
        { name: 'success', img: 'images/success.png' },
        { name: 'yelling-cat', img: 'images/yelling-cat.png' },
        { name: 'one-does-not-simply', img: 'images/one-does-not-simply.png' },
        { name: 'futurama-fry', img: 'images/futurama-fry.png' },
        { name: 'disaster-girl', img: 'images/disaster-girl.png' },
        { name: 'philosoraptor', img: 'images/philosoraptor.png' },
        // Add more card images as needed
    ];

    let cardArray = [];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        const level = levelSelect.value;
        setupCards(level);
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function setupCards(level) {
        cardArray = [];
        let pairs = 0;
        if (level === 'easy') {
            pairs = 4; // Increase the number of pairs for easy level
        } else if (level === 'medium') {
            pairs = 8; // Increase the number of pairs for medium level
        } else if (level === 'hard') {
            pairs = 12; // Increase the number of pairs for hard level
        }
        const selectedImages = cardImages.slice(0, pairs);
        cardArray = selectedImages.concat(selectedImages); // Duplicate images to create pairs
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});
