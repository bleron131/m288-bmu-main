const API_URL = 'https://6853b5aba2a37a1d6f4986bb.mockapi.io/scores';

document.addEventListener('DOMContentLoaded', () => {
    const wordLengthSelect = document.getElementById('word-length');
    const startGameButton = document.getElementById('start-game');
    const gameBoard = document.getElementById('game-board');
    const keyboardDiv = document.getElementById('keyboard');
    const messageDisplay = document.getElementById('message');
    const leaderboardDiv = document.getElementById('leaderboard');
    const leaderboardList = document.getElementById('leaderboard-list');
    const showLeaderboardButton = document.getElementById('show-leaderboard');
    const closeLeaderboardButton = document.getElementById('close-leaderboard');

    let currentWordLength = parseInt(wordLengthSelect.value);
    let solution = '';
    let currentRow = 0;
    let currentGuess = [];
    const maxAttempts = 6;
    let gameEnded = false;
    let gameStartTime = null;

    const POINTS = { 1: 100, 2: 80, 3: 60, 4: 40, 5: 20, 6: 10 };

    const savedUser = localStorage.getItem('username');
    if (!savedUser) {
        window.location.href = 'login.html';
        return;
    }

    initializeGame();

    function initializeGame() {
        currentWordLength = parseInt(wordLengthSelect.value);
        solution = getRandomWord(currentWordLength);
        currentRow = 0;
        currentGuess = [];
        gameEnded = false;
        gameStartTime = new Date();
        messageDisplay.textContent = '';
        gameBoard.innerHTML = '';
        keyboardDiv.innerHTML = '';
        createGameBoard();
        createKeyboard();
        document.addEventListener('keydown', handlePhysicalKeyPress);
    }

    function getRandomWord(length) {
        const words = WORDS[length];
        if (!words || words.length === 0) return 'FEHLER';
        return words[Math.floor(Math.random() * words.length)].toUpperCase();
    }

    function isValidWord(word) {
        return VALID_WORDS[word.toUpperCase()] === true;
    }

    function createGameBoard() {
        gameBoard.style.gridTemplateColumns = `repeat(${currentWordLength}, 60px)`;
        for (let i = 0; i < maxAttempts; i++) {
            for (let j = 0; j < currentWordLength; j++) {
                const box = document.createElement('div');
                box.classList.add('letter-box');
                box.dataset.row = i;
                box.dataset.col = j;
                gameBoard.appendChild(box);
            }
        }
    }

    startGameButton.addEventListener('click', () => {
    initializeGame();
});

    function createKeyboard() {
        const keyboardLayout = [
            'QWERTZUIOP'.split(''),
            'ASDFGHJKLÖ'.split(''),
            ['Enter', ...'YXCVBNMÄÜ'.split(''), 'Backspace']
        ];

        keyboardLayout.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('keyboard-row');
            row.forEach(key => {
                const keyButton = document.createElement('button');
                keyButton.classList.add('key');
                keyButton.textContent = key === 'Backspace' ? '⌫' : key;
                keyButton.dataset.key = key;
                if (key === 'Enter' || key === 'Backspace') {
                    keyButton.classList.add('large');
                }
                keyButton.addEventListener('click', () => handleKeyPress(key));
                rowDiv.appendChild(keyButton);
            });
            keyboardDiv.appendChild(rowDiv);
        });
    }

    function handleKeyPress(key) {
        if (gameEnded || solution === '') return;

        if (key === 'Backspace') {
            if (currentGuess.length > 0) {
                currentGuess.pop();
                updateGameBoard();
            }
        } else if (key === 'Enter') {
            if (currentGuess.length === currentWordLength) {
                const guessString = currentGuess.join('');
                if (isValidWord(guessString)) {
                    checkGuess();
                } else {
                    showMessage('Wort ungültig!', 'error');
                    setTimeout(clearMessage, 2000);
                }
            } else {
                showMessage(`Wort muss ${currentWordLength} Buchstaben haben!`, 'warning');
                setTimeout(clearMessage, 2000);
            }
        } else if (currentGuess.length < currentWordLength && isValidLetter(key)) {
            currentGuess.push(key.toUpperCase());
            updateGameBoard();
        }
    }

    function isValidLetter(char) {
        return /^[A-ZÄÖÜa-zäöü]$/.test(char);
    }

    function updateGameBoard() {
        for (let i = 0; i < currentWordLength; i++) {
            const box = gameBoard.querySelector(`[data-row="${currentRow}"][data-col="${i}"]`);
            if (box) {
                box.textContent = currentGuess[i] || '';
            }
        }
    }

    function checkGuess() {
        const guessString = currentGuess.join('');
        const solutionLetters = solution.split('');
        const guessLetters = guessString.split('');
        const feedback = Array(currentWordLength).fill('');
        const solutionMap = {};

        solutionLetters.forEach(letter => {
            solutionMap[letter] = (solutionMap[letter] || 0) + 1;
        });

        for (let i = 0; i < currentWordLength; i++) {
            if (guessLetters[i] === solutionLetters[i]) {
                feedback[i] = 'correct';
                solutionMap[guessLetters[i]]--;
            }
        }

        for (let i = 0; i < currentWordLength; i++) {
            if (feedback[i] === '') {
                if (solutionMap[guessLetters[i]] > 0) {
                    feedback[i] = 'present';
                    solutionMap[guessLetters[i]]--;
                } else {
                    feedback[i] = 'absent';
                }
            }
        }

        for (let i = 0; i < currentWordLength; i++) {
            setTimeout(() => {
                const box = gameBoard.querySelector(`[data-row="${currentRow}"][data-col="${i}"]`);
                if (box) {
                    box.classList.add(feedback[i]);
                }
                updateKeyboardFeedback(guessLetters[i], feedback[i]);
            }, i * 100);
        }

        setTimeout(() => {
            if (guessString === solution) {
                const attempts = currentRow + 1;
                const points = POINTS[attempts] || 0;
                const gameTime = Math.round((new Date() - gameStartTime) / 1000);
                showMessage(`🎉 ${attempts} Versuche – ${points} Punkte`, 'success');
                saveScore(attempts, points, gameTime, currentWordLength);
                gameEnded = true;
                disableInput();
            } else if (currentRow === maxAttempts - 1) {
                showMessage(`❌ Das Wort war: ${solution}`, 'error');
                gameEnded = true;
                disableInput();
            } else {
                currentRow++;
                currentGuess = [];
                clearMessage();
            }
        }, currentWordLength * 100 + 200);
    }

    function updateKeyboardFeedback(letter, feedback) {
        const keyButton = keyboardDiv.querySelector(`[data-key="${letter}"]`);
        if (!keyButton) return;

        if (feedback === 'correct') {
            keyButton.classList.remove('present', 'absent');
            keyButton.classList.add('correct');
        } else if (feedback === 'present' && !keyButton.classList.contains('correct')) {
            keyButton.classList.remove('absent');
            keyButton.classList.add('present');
        } else if (feedback === 'absent' && !keyButton.classList.contains('correct') && !keyButton.classList.contains('present')) {
            keyButton.classList.add('absent');
        }
    }

    function showMessage(text, type = 'info') {
        messageDisplay.textContent = text;
        messageDisplay.className = '';
        messageDisplay.classList.add('message', type);
    }

    function clearMessage() {
        messageDisplay.textContent = '';
        messageDisplay.className = '';
    }

    function disableInput() {
        document.removeEventListener('keydown', handlePhysicalKeyPress);
        keyboardDiv.querySelectorAll('.key').forEach(btn => {
            btn.style.opacity = '0.6';
            btn.style.pointerEvents = 'none';
        });
    }

    function handlePhysicalKeyPress(event) {
        event.preventDefault();
        const key = event.key;
        if (key === 'Backspace') {
            handleKeyPress('Backspace');
        } else if (key === 'Enter') {
            handleKeyPress('Enter');
        } else if (isValidLetter(key)) {
            handleKeyPress(key.toUpperCase());
        }
    }

    async function saveScore(attempts, points, gameTime, wordLength) {
        const username = localStorage.getItem('username') || 'Unbekannt';
        const scoreData = {
            name: username,
            attempts,
            points,
            gameTime,
            wordLength,
            date: new Date().toLocaleDateString('de-DE'),
            time: new Date().toLocaleTimeString('de-DE')
        };

        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scoreData)
            });
        } catch (err) {
            console.error('Fehler beim Speichern:', err);
        }
    }

    async function getScores() {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            return data.sort((a, b) => b.points - a.points || a.attempts - b.attempts).slice(0, 10);
        } catch (err) {
            console.error('Fehler beim Laden:', err);
            return [];
        }
    }

    async function displayLeaderboard() {
        const scores = await getScores();
        leaderboardList.innerHTML = '';

        if (scores.length === 0) {
            leaderboardList.innerHTML = '<p style="text-align: center; color: #6b7280;">Noch keine Spiele!</p>';
            return;
        }

        scores.forEach((score, i) => {
            const entry = document.createElement('div');
            entry.classList.add('leaderboard-entry');
            if (i === 0) entry.classList.add('top-score');

            entry.innerHTML = `
                <div class="leaderboard-rank">#${i + 1}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-score">${score.points} Punkte</div>
                    <div class="leaderboard-details">
                        ${score.name} • ${score.attempts} Versuche • ${score.wordLength} Buchstaben • ${score.gameTime}s
                    </div>
                    <div class="leaderboard-details" style="font-size: 0.8em;">
                        ${score.date} ${score.time}
                    </div>
                </div>
            `;
            leaderboardList.appendChild(entry);
        });
    }

    showLeaderboardButton.addEventListener('click', () => {
        displayLeaderboard();
        leaderboardDiv.classList.remove('hidden');
    });

    closeLeaderboardButton.addEventListener('click', () => {
        leaderboardDiv.classList.add('hidden');
    });

});



