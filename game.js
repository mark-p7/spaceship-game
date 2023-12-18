const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let shipX = canvas.width / 2;
let shipY = 50;
let velocityX = 0;
let velocityY = 0;
let gravity = 0.05;
let thrustForce = 0.15;
let isThrusting = false;
let rotation = 0;
let rotationSpeed = 3;
let rotationDirection = 0;
let mass = 1;
let gameRunning = true;
const dt = 1 / 60;

// Load spaceship image
let spaceshipImage = new Image();
spaceshipImage.src = './spaceship.png';


// Listen for key presses and releases
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// Handle key presses
function keyDownHandler(e) {
    if (e.key === "ArrowUp" || e.key === " ") {
        isThrusting = true;
    }
    if (e.key === "ArrowLeft") {
        rotation -= rotationSpeed;
    }
    if (e.key === "ArrowRight") {
        rotation += rotationSpeed;
    }
}

// Handle key releases
function keyUpHandler(e) {
    if (e.key === "ArrowUp" || e.key === " ") {
        isThrusting = false;
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        rotationDirection = 0;
    }
}

// Game loop
function draw() {

    // Stop the game loop
    if (!gameRunning) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Convert rotation to radians
    let rotationRadians = rotation * Math.PI / 180;

    // Calculate acceleration
    let accelerationX = isThrusting ? -Math.sin(rotationRadians) * thrustForce / mass : 0;
    let accelerationY = gravity + (isThrusting ? -Math.cos(rotationRadians) * thrustForce / mass : 0);

    // Update velocity
    velocityX -= accelerationX * dt;
    velocityY += accelerationY * dt;

    console.log(`VelocityX: ${velocityX}, VelocityY: ${velocityY}`);

    // Update the ship's position
    shipX += velocityX;
    shipY += velocityY;

    // Draw spaceship
    ctx.save();
    ctx.translate(shipX, shipY);
    ctx.rotate(rotationRadians);
    ctx.drawImage(spaceshipImage, -20, -30, 40, 60);
    ctx.restore();

    // Check for landing
    if (shipY + 30 >= canvas.height) {
        shipY = canvas.height - 30;
        velocityY = 0;
        endGame();
    } else {
        requestAnimationFrame(draw);
    }
}

// End the game
function endGame() {
    gameRunning = false;
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over! The spaceship has landed.", canvas.width / 2, canvas.height / 2);
}

// Draw the spaceship
spaceshipImage.onload = draw;
draw();

