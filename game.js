document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");
    const restartButton = document.getElementById("restartButton");

    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute("data-index"));

        if (gameState[cellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("flipped");
        cell.classList.add(currentPlayer.toLowerCase());
        checkWinner();
        togglePlayer();
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function checkWinner() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (
                gameState[a] !== "" &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} Wins!`;
            popupMessage.textContent = `Player ${currentPlayer} Wins!`;
            popup.style.display = "flex";
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            statusText.textContent = "It's a Draw!";
            popupMessage.textContent = "It's a Draw!";
            popup.style.display = "flex";
            gameActive = false;
        }
    }

    function restartGame() {
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        statusText.textContent = "Player X's Turn";
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("flipped", "x", "o");
        });
        popup.style.display = "none";
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
});
