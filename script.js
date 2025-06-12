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
    const resetScoresButton = document.getElementById('reset-scores');
 
    let currentWordLength = parseInt(wordLengthSelect.value);
    let solution = '';
    let currentRow = 0;
    let currentGuess = [];
    const maxAttempts = 6;
    let gameEnded = false;
    let gameStartTime = null;
 
    // Scoring system
    const POINTS = {
        1: 100,  // 1 attempt = 100 points
        2: 80,   // 2 attempts = 80 points
        3: 60,   // 3 attempts = 60 points
        4: 40,   // 4 attempts = 40 points
        5: 20,   // 5 attempts = 20 points
        6: 10    // 6 attempts = 10 points
    };
 
    // Initialize game
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
        
        // Re-enable event listeners
        document.addEventListener('keydown', handlePhysicalKeyPress);
        
        console.log('Solution:', solution); // For debugging - remove in production
    }
 
    // Get a random word from the WORDS object based on length
    function getRandomWord(length) {
        const words = WORDS[length];
        if (!words || words.length === 0) {
            console.error(`No words found for length ${length}`);
            return 'FEHLER';
        }
        return words[Math.floor(Math.random() * words.length)].toUpperCase();
    }
 
    // Validate if a word exists in our word list
    function isValidWord(word) {
        return VALID_WORDS[word.toUpperCase()] === true;
    }
 
    // Create the game board (grid of letter boxes)
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
 
    // Create the on-screen keyboard
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
 
    // Handle key presses (physical and on-screen keyboard)
    function handleKeyPress(key) {
        if (gameEnded || solution === '') return; // Game not initialized or ended
 
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
                    showMessage('Dieses Wort ist nicht in unserem Wörterbuch!', 'error');
                    setTimeout(() => clearMessage(), 2000);
                }
            } else {
                showMessage(`Das Wort muss ${currentWordLength} Buchstaben haben!`, 'warning');
                setTimeout(() => clearMessage(), 2000);
            }
        } else if (currentGuess.length < currentWordLength && isValidLetter(key)) {
            currentGuess.push(key.toUpperCase());
            updateGameBoard();
        }
    }
 
    // Check if a character is a valid letter (including German umlauts)
    function isValidLetter(char) {
        return /^[A-ZÄÖÜa-zäöü]$/.test(char);
    }
 
    // Update the display of the current guess on the game board
    function updateGameBoard() {
        for (let i = 0; i < currentWordLength; i++) {
            const box = gameBoard.querySelector(`[data-row="${currentRow}"][data-col="${i}"]`);
            if (box) {
                box.textContent = currentGuess[i] || '';
                if (currentGuess[i]) {
                    box.style.borderColor = '#6b7280';
                    box.style.transform = 'scale(1.05)';
                } else {
                    box.style.borderColor = '#d1d5db';
                    box.style.transform = 'scale(1)';
                }
            }
        }
    }
 
    // Check the guessed word against the solution
    function checkGuess() {
        const guessString = currentGuess.join('');
        const solutionLetters = solution.split('');
        const guessLetters = guessString.split('');
        const feedback = Array(currentWordLength).fill('');
 
        // Create a frequency map for solution letters
        const solutionMap = {};
        solutionLetters.forEach(letter => {
            solutionMap[letter] = (solutionMap[letter] || 0) + 1;
        });
 
        // First pass: check for correct position (green)
        for (let i = 0; i < currentWordLength; i++) {
            if (guessLetters[i] === solutionLetters[i]) {
                feedback[i] = 'correct';
                solutionMap[guessLetters[i]]--;
            }
        }
 
        // Second pass: check for correct letter, wrong position (yellow) and absent (gray)
        for (let i = 0; i < currentWordLength; i++) {
            if (feedback[i] === '') { // Only process if not already marked as correct
                if (solutionMap[guessLetters[i]] > 0) {
                    feedback[i] = 'present';
                    solutionMap[guessLetters[i]]--;
                } else {
                    feedback[i] = 'absent';
                }
            }
        }
 
        // Apply feedback to boxes with animation delay
        for (let i = 0; i < currentWordLength; i++) {
            setTimeout(() => {
                const box = gameBoard.querySelector(`[data-row="${currentRow}"][data-col="${i}"]`);
                if (box) {
                    box.classList.add(feedback[i]);
                }
                updateKeyboardFeedback(guessLetters[i], feedback[i]);
            }, i * 100);
        }
 
        // Check win/lose conditions after animation
        setTimeout(() => {
            if (guessString === solution) {
                const attempts = currentRow + 1;
                const points = POINTS[attempts] || 0;
                const gameTime = Math.round((new Date() - gameStartTime) / 1000);
                
                showMessage(`🎉 Herzlichen Glückwunsch! Du hast das Wort in ${attempts} Versuchen erraten! (+${points} Punkte) 🎉`, 'success');
                saveScore(attempts, points, gameTime, currentWordLength);
                gameEnded = true;
                disableInput();
            } else if (currentRow === maxAttempts - 1) {
                showMessage(`😔 Leider verloren! Das Wort war: ${solution}`, 'error');
                gameEnded = true;
                disableInput();
            } else {
                currentRow++;
                currentGuess = [];
                clearMessage();
            }
        }, currentWordLength * 100 + 200);
    }
 
    // Update keyboard key feedback
    function updateKeyboardFeedback(letter, feedback) {
        const keyButton = keyboardDiv.querySelector(`[data-key="${letter}"]`);
        if (keyButton) {
            // Update keyboard key color based on the best feedback for that letter
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
    }
 
    // Show message with different styles
    function showMessage(text, type = 'info') {
        messageDisplay.textContent = text;
        messageDisplay.className = '';
        messageDisplay.classList.add('message', type);
    }
 
    // Clear message
    function clearMessage() {
        messageDisplay.textContent = '';
        messageDisplay.className = '';
    }
 
    // Save score to localStorage
    function saveScore(attempts, points, gameTime, wordLength) {
        const scores = getScores();
        const newScore = {
            date: new Date().toLocaleDateString('de-DE'),
            time: new Date().toLocaleTimeString('de-DE'),
            attempts: attempts,
            points: points,
            gameTime: gameTime,
            wordLength: wordLength,
            timestamp: Date.now()
        };
        
        scores.push(newScore);
        scores.sort((a, b) => b.points - a.points || a.attempts - b.attempts);
        
        // Keep only top 10 scores
        if (scores.length > 10) {
            scores.splice(10);
        }
        
        localStorage.setItem('wordleScores', JSON.stringify(scores));
    }
 
    // Get scores from localStorage
    function getScores() {
        const scores = localStorage.getItem('wordleScores');
        return scores ? JSON.parse(scores) : [];
    }
 
    // Display leaderboard
    function displayLeaderboard() {
        const scores = getScores();
        leaderboardList.innerHTML = '';
        
        if (scores.length === 0) {
            leaderboardList.innerHTML = '<p style="text-align: center; color: #6b7280;">Noch keine Spiele gespielt!</p>';
            return;
        }
        
        scores.forEach((score, index) => {
            const entry = document.createElement('div');
            entry.classList.add('leaderboard-entry');
            if (index === 0) entry.classList.add('top-score');
            
            entry.innerHTML = `
                <div class="leaderboard-rank">#${index + 1}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-score">${score.points} Punkte</div>
                    <div class="leaderboard-details">
                        ${score.attempts} Versuche • ${score.wordLength} Buchstaben • ${score.gameTime}s
                    </div>
                    <div class="leaderboard-details" style="font-size: 0.8em;">
                        ${score.date} ${score.time}
                    </div>
                </div>
            `;
            
            leaderboardList.appendChild(entry);
        });
    }
 
    // Disable input after game ends
    function disableInput() {
        document.removeEventListener('keydown', handlePhysicalKeyPress);
        keyboardDiv.querySelectorAll('.key').forEach(button => {
            button.style.opacity = '0.6';
            button.style.cursor = 'not-allowed';
            const originalHandler = button.onclick;
            button.onclick = null;
        });
    }
 
    // Event listener for physical keyboard
    function handlePhysicalKeyPress(event) {
        event.preventDefault();
        let key = event.key;
        
        // Map special keys
        if (key === 'Backspace') {
            handleKeyPress('Backspace');
        } else if (key === 'Enter') {
            handleKeyPress('Enter');
        } else if (isValidLetter(key)) {
            handleKeyPress(key.toUpperCase());
        }
    }
 
    // Event listeners
    startGameButton.addEventListener('click', initializeGame);
    
    showLeaderboardButton.addEventListener('click', () => {
        displayLeaderboard();
        leaderboardDiv.classList.remove('hidden');
    });
    
    closeLeaderboardButton.addEventListener('click', () => {
        leaderboardDiv.classList.add('hidden');
    });
    
    resetScoresButton.addEventListener('click', () => {
        if (confirm('Möchten Sie wirklich alle Punkte zurücksetzen?')) {
            localStorage.removeItem('wordleScores');
            showMessage('Alle Punkte wurden zurückgesetzt!', 'info');
            setTimeout(() => clearMessage(), 2000);
        }
    });
 
    // Close leaderboard when clicking outside
    leaderboardDiv.addEventListener('click', (e) => {
        if (e.target === leaderboardDiv) {
            leaderboardDiv.classList.add('hidden');
        }
    });
 
    // Initial game setup
    initializeGame();
});