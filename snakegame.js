//board
var blocksize = 35;
var rows = 30;
var cols = 30;
var board;
var item;
var gameover = false;

//snake
var snakeh = 6 * blocksize;
var snaket = 6 * blocksize;
var speedx = 0;
var speedy = 0;
var snakebody = [];

//food
var foodh;
var foodt;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    item = board.getContext("2d");

    placefood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameover) {
        return;
    }
    
    // Update snake position
    snakeh += speedx * blocksize;
    snaket += speedy * blocksize;
    
    // Check for wall collision
    if (snakeh < 0 || snakeh >= cols * blocksize || snaket < 0 || snaket >= rows * blocksize) {
        gameover = true;
        alert("Game Over");
        return;
    }

    // Check for self-collision
    for (let i = 0; i < snakebody.length; i++) {
        if (snakeh === snakebody[i][0] && snaket === snakebody[i][1]) {
            gameover = true;
            alert("Game Over");
            return;
        }
    }

    // Check for food collision
    if (snakeh === foodh && snaket === foodt) {
        snakebody.push([foodh, foodt]);
        placefood();
    }

    // Move snake body
    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }
    if (snakebody.length) {
        snakebody[0] = [snakeh, snaket];
    }

    // Clear the board
    item.fillStyle = "#E4FDE1";
    item.fillRect(0, 0, board.width, board.height);

    // Draw food
    item.fillStyle = "#575761";
    item.fillRect(foodh, foodt, blocksize, blocksize);

    // Draw snake body
    item.fillStyle = "#8ACB88";
    for (let i = 0; i < snakebody.length; i++) {
        item.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
    }
    // Draw the head of the snake
    item.fillRect(snakeh, snaket, blocksize, blocksize);
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && speedy !== 1) {
        speedx = 0;
        speedy = -1;
    } else if (e.code === "ArrowDown" && speedy !== -1) {
        speedx = 0;
        speedy = 1;
    } else if (e.code === "ArrowLeft" && speedx !== 1) {
        speedx = -1;
        speedy = 0;
    } else if (e.code === "ArrowRight" && speedx !== -1) {
        speedx = 1;
        speedy = 0;
    }
}

function placefood() {
    foodh = Math.floor(Math.random() * cols) * blocksize;
    foodt = Math.floor(Math.random() * rows) * blocksize;
}
