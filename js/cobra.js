// Seleciona o canvas e define o contexto
const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

// Define a largura e a altura do canvas
const box = 32;

// Define o array da cobra
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

// Define a variável de direção da cobra
let direction = "right";

// Define a posição da comida
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

// Cria a função que desenha os elementos na tela
function createBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

// Captura o evento de teclado
document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Cria a função que atualiza o jogo
function iniciarJogo() {
  // Cria a cabeça da cobra
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

    // Verifica se a cobra bateu na parede
    if (snakeX < 0 || snakeX > 15 * box || snakeY < 0 || snakeY > 15 * box) {
    clearInterval(jogo);
    alert("Você Perdeu!");
    location.reload(); // Reinicia o jogo
  }
  

  // Verifica se a cobra se choca com o próprio corpo
  for (let i = 1; i < snake.length; i++) {
    if (snakeX == snake[i].x && snakeY == snake[i].y) {
      clearInterval(jogo);
      alert("Você Perdeu!");
      location.reload(); // Reinicia o jogo
    }
  }

  // Verifica se a cobra come a comida
  if (snakeX == food.x && snakeY == food.y) {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  } else {
    snake.pop();
  }

  // Cria a cabeça da cobra
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);

  createBG();
  createSnake();
  drawFood();
}

// Define a velocidade do jogo
let jogo = setInterval(iniciarJogo, 100);