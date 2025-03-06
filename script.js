let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = false;
let playerNames = {};

function startGame() {
    playerNames.X = document.getElementById('player1').value || 'Player 1';
    playerNames.O = document.getElementById('player2').value || 'Player 2';
    document.getElementById('winner').textContent = `${playerNames.X}'s turn!`;
    gameActive = true;
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameActive || board[cell.dataset.index]) return;
        board[cell.dataset.index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.dataset.value = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('winner').textContent = `${playerNames[currentPlayer]}'s turn!`;
    });
});

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById('winner').textContent = `🎉 ${playerNames[board[a]]} Wins!`;
            gameActive = false;
            return;
        }
    }
    if (!board.includes(null)) {
        document.getElementById('winner').textContent = '🤝 It\'s a Draw!';
        gameActive = false;
    }
}

function resetGame() {
    board = Array(9).fill(null);
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        delete cell.dataset.value;
    });
    gameActive = true;
    currentPlayer = 'X';
    document.getElementById('winner').textContent = `${playerNames.X}'s turn!`;
}
