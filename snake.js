const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 0, y: 0 }];
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
let score = 0;

document.addEventListener("keydown", changeDirection);

let d;
function changeDirection(event) {
  if (event.keyCode === 37 && d !== "RIGHT") {
    d = "LEFT";
  } else if (event.keyCode === 38 && d !== "DOWN") {
    d = "UP";
  } else if (event.keyCode === 39 && d !== "LEFT") {
    d = "RIGHT";
  } else if (event.keyCode === 40 && d !== "UP") {
    d = "DOWN";
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d === "LEFT") snakeX -= box;
  if (d === "UP") snakeY -= box;
  if (d === "RIGHT") snakeX += box;
  if (d === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, box, box);

  if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision()) {
    clearInterval(game);
  }
}

function collision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}

let game = setInterval(draw, 150);