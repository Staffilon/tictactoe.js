let turn = CIRCLE;
let grid = new TicTacToe(3);
let abortController = new AbortController();

function createMainPanel(size) {
    const mp = document.querySelector(".mainPanel");
    grid = new TicTacToe(size);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            mp.appendChild(createCellDiv(i, j));
        }
    }
}

function createCellDiv(i, j) {
    const divElement = document.createElement("div");
    divElement.classList.add("cell");
    divElement.setAttribute("id", getCellId(i, j));
    recordEventListeners(divElement, i, j);
    return divElement;
}

function getCellId(i, j) {
    return `_${i}_${j}_`;
}

function removeEventListeners() {
    abortController.abort();
}

function recordEventListeners(divElement, i, j) {
    recordMouseOverListener(divElement, i, j);
    recordMouseOutListener(divElement, i, j);
    recordMousePressedListener(divElement, i, j);
}

function recordMouseOverListener(divElement, i, j) {
    divElement.addEventListener("mouseover", _ => {
        if (!grid.isOver() && (grid.isEmpty(i, j))) {
            divElement.style.backgroundImage = getImageUrl(true);
        }
    }, {signal: abortController.signal});
}


function recordMouseOutListener(divElement, i, j) {
    divElement.addEventListener("mouseout", _ => {
        if (!grid.isOver() && (grid.isEmpty(i, j)))
            divElement.style.backgroundImage = "";
    }, {signal: abortController.signal});
}

function recordMousePressedListener(divElement, i, j) {
    divElement.addEventListener("mousedown", _ => {
        if (!grid.isOver() && (grid.isEmpty(i, j))) {
            if (turn === CROSS)
                grid.addCross(i, j);
            else grid.addCircle(i, j);
        }

        divElement.style.backgroundImage = getImageUrl(false);

        if (grid.isOver()) {
            handleGameTermination();
        } else {
            turn = getNextSymbol(turn);
        }
    }, {signal: abortController.signal});
}

function handleGameTermination() {
    if (grid.isDraw())
        showDrawMessage();
    else {
        setWinnerSymbol(grid.getWitness(), grid.winner());
        showWinnerMessage();
    }
    removeEventListeners();
}

function showDrawMessage() {
    const drawMessage = document.querySelector(".result");
    drawMessage.textContent = `The game resulted in a draw`;
}

function showWinnerMessage() {
    const winMessage = document.querySelector(".result");
    winMessage.textContent = `The winner is ${grid.winner()}`;
}

function emptyResultPanel() {
    const resultPanel = document.querySelector(".result");
    resultPanel.textContent = ``;
}

function setWinnerSymbol(witness, winner) {
    for (let i = 0; i < witness.length; i++) {
        const divElement = document.getElementById(getCellId(witness[i][0], witness[i][1]));
        divElement.style.backgroundImage = getWinnerImageUrl(winner);
    }
}

function getWinnerImageUrl(symbol) {
    if (symbol === CROSS)
        return "url(../imgs/cross_winner.PNG)";
    else return "url(../imgs/circle_winner.PNG)";
}

function getImageUrl(isMoving) {
    if (turn === CROSS) {
        if (isMoving) {
            return "url(../imgs/cross_moving.PNG)"
        } else {
            return "url(../imgs/cross.PNG)"
        }
    } else {
        if (isMoving) {
            return "url(../imgs/circle_moving.PNG)"
        } else {
            return "url(../imgs/circle.PNG)"
        }
    }
}

function ResetMatch() {
    turn = CIRCLE;
    emptyResultPanel();
    deleteGrid();
    abortController = new AbortController();
    createMainPanel(3);
}

function deleteGrid() {
    const grid = document.querySelector(".mainPanel");
    grid.innerHTML = "";
}

document.addEventListener('DOMContentLoaded', () => {
    createMainPanel(3);
});

const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", ResetMatch);