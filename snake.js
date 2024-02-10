var dotSize = 20;
var gameBoardSize = 400;
var direction = 'right';
var snake = [{ top: 0, left: 0 }];
var apple = null;
var score = 0;
var highScore = 0;
var gameInterval = null;

function startGame() {
    direction = 'right';
    snake = [{ top: 0, left: 0 }];
    apple = null;
    score = 0;
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('restart-button').style.display = 'none';
    gameInterval = setInterval(updateGame, 200);
}

function updateGame() {
    var head = Object.assign({}, snake[0]); // copy head
    switch(direction) {
        case 'right':
            head.left += dotSize;
            break;
        case 'down':
            head.top += dotSize;
            break;
        case 'left':
            head.left -= dotSize;
            break;
        case 'up':
            head.top -= dotSize;
            break;
    }

    if (apple && apple.top === head.top && apple.left === head.left) {
        apple = null;
        score += 10;
        document.getElementById('score').innerText = 'Score: ' + score;
    } else {
        snake.pop();
    }

    // Wrap the snake around to the opposite side of the board if it goes off an edge
    if (head.left < 0) {
        head.left = gameBoardSize - dotSize;
    } else if (head.top < 0) {
        head.top = gameBoardSize - dotSize;
    } else if (head.left === gameBoardSize) {
        head.left = 0;
    } else if (head.top === gameBoardSize) {
        head.top = 0;
    }

    snake.unshift(head);

    for (var i = 1; i < snake.length; i++) {
        if (snake[i].top === head.top && snake[i].left === head.left) {
            return gameOver();
        }
    }

    if (!apple) {
        apple = { top: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize, left: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize };
    }

    drawGame();
}

function drawGame() {
    var gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    snake.forEach(function(dot) {
        var dotElement = document.createElement('div');
        dotElement.className = 'dot';
        dotElement.style.top = `${dot.top}px`;
        dotElement.style.left = `${dot.left}px`;
        gameBoard.appendChild(dotElement);
    });

    var appleElement = document.createElement('div');
    appleElement.className = 'apple';
    appleElement.style.top = `${apple.top}px`;
    appleElement.style.left = `${apple.left}px`;
    gameBoard.appendChild(appleElement);
}

function gameOver() {
    if (score > highScore) {
        highScore = score;
        document.getElementById('high-score').innerText = 'High Score: ' + highScore;
    }
    alert('Game over! Your score is: ' + score);
    clearInterval(gameInterval);
    document.getElementById('restart-button').style.display = 'block';
}

window.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowUp':
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 'ArrowDown':
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
        case 'ArrowRight':
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
        case 'ArrowLeft':
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
    }
});

document.getElementById('restart-button').addEventListener('click', startGame);

startGame();
