const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start(); // let's start method calling.

// this function is main of TicTacToeGame
function TicTacToeGame() {
    const board = new Board();  // create TicTacToe board
    const humanPlayer = new HumanPlayer(board);  // create Human Player
    const computerPlayer = new ComputerPlayer(board);  // create Computer Player

    let turn = 0;  // TODO I do not know

    // this function is TicTacToe start function
    this.start = function () {
        const config = {childList: true};  // element status initialization
        const observer = new MutationObserver(() => takeTurn());  // mutation observer define to takeTurn...
        board.positions.forEach((el) => observer.observe(el, config));  // set mutation to each col element
        takeTurn(); // ex) HumanPlayer -> ComputerPlayer -> HumanPlayer ....

        function takeTurn() {

            if (board.checkForWinner()) {
                return;
            }

            if (turn % 2 === 0) {
                humanPlayer.takeTurn();
            } else {
                computerPlayer.takeTurn();
            }
            turn++;
        }
    }
}

function Board() {
    this.positions = Array.from(document.querySelectorAll(".col"));

    this.checkForWinner = function () {
        let winner = false;

        const winningCombination = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        const positions = this.positions;
        winningCombination.forEach(winningCombo =>{
            const pos0InnerText = positions[winningCombo[0]].innerText;
            const pos1InnerText = positions[winningCombo[1]].innerText;
            const pos2InnerText = positions[winningCombo[2]].innerText;

            const isWinningCombo = pos0InnerText !== '' &&
                pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;

            if (isWinningCombo) {
                winner = true;
                winningCombo.forEach(index =>{
                   positions[index].className += ' winner';
                });
            }
        })
        return winner;
    }
}

function HumanPlayer(board) {
    this.takeTurn = function () {
        board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
    }
    function handleTurnTaken(event) {
        event.target.innerText = 'X';
        board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
    }
}

function ComputerPlayer(board) {
    this.takeTurn = function () {
        const availablePositions = board.positions.filter(p => p.innerText === '');

        // last Turn is do Nothing...
        if(availablePositions.length === 0) return;

        // get cell for random cell from empty cell
        const move = Math.floor(Math.random() * availablePositions.length);
        availablePositions[move].innerText = 'O';
    }
}

