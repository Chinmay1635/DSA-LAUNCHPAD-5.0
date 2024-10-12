let playerHealth = 100;
let waveNumber = 1;

let buttons = document.querySelectorAll("button");
// Load sounds
const attackSound = document.getElementById("attack-sound");
const enemySound = document.getElementById("enemy-sound");
const gameOver = document.getElementById("game-over");
const bgsound = document.getElementById("bgsound");

// Play background music
bgsound.volume = 0.4;


// GIFs for enemies
const enemyGifs = [
  "/assets/images/enemy-1.gif", // Example: Add your own enemy GIFs
  "/assets/images/enemy-2.gif",
  "/assets/images/enemy-3.gif",
];

// Generate enemies with random strength for each wave
let enemyArray = generateEnemies();
function generateEnemies() {
  let enemies = [];
  for (let i = 0; i < 5; i++) {
    enemies.push({
      strength: Math.floor(Math.random() * 31) + 10, // Strength between 10-40
      gif: enemyGifs[i % enemyGifs.length], // Assign a gif to each enemy
    });
  }
  return enemies;
}

// Function to display the array on the screen
function displayArray() {
  bgsound.play();
  const enemyArrayDiv = document.getElementById("enemy-array");
  enemyArrayDiv.innerHTML = ""; // Clear previous array

  enemyArray.forEach((enemy, index) => {
    const enemyContainer = document.createElement("div");
    enemyContainer.classList.add("enemy-container");

    // Create GIF element
    const enemyGif = document.createElement("img");
    enemyGif.src = enemy.gif; // Use gif based on the enemy object
    enemyGif.classList.add("enemy-gif");

    // Create health display
    const healthDisplay = document.createElement("div");
    healthDisplay.classList.add("health");
    healthDisplay.textContent = enemy.strength;

    enemyContainer.appendChild(enemyGif);
    enemyContainer.appendChild(healthDisplay);

    enemyArrayDiv.appendChild(enemyContainer);
  });

  checkWinCondition();
}

// Rotate array left
function rotateLeft() {
  let firstElement = enemyArray.shift();
  enemyArray.push(firstElement);
  displayArray();
}

// Rotate array right
function rotateRight() {
  let lastElement = enemyArray.pop();
  enemyArray.unshift(lastElement);
  displayArray();
}

// Reverse the entire array (or a part of it)
function reverseArray() {
  enemyArray.reverse();
  displayArray();
}

// Select attack (attack the first enemy)
function selectAttack() {
  if (enemyArray[0].strength != 0) {
    playerHealth -= 10; // Decrease player health
    document.getElementById("player-health").textContent = playerHealth;
    performHeroAttack(0); // Trigger the hero attack animation
    attackSound.play();
    enemyArray[0].strength = Math.max(0, enemyArray[0].strength - 10); // Decrease strength

    const enemyContainers = document.getElementsByClassName("enemy-container");
  const enemyGif = enemyContainers[0].querySelector(".enemy-gif");
  console.log(enemyContainers[0]);
    if (enemyArray[0].strength === 0) {
        playerHealth += 20; // Increase player health if enemy is defeated
        enemySound.play();
        setTimeout(() => {
          enemyContainers[0].style.filter = "grayscale(100%)"; // Turn grey
        }, 500);
        document.getElementById("player-health").textContent = playerHealth;
      }
    flashEnemy(0);
    displayArray();

      buttons.forEach((button) => {
        button.disabled = true;
      });

      setTimeout(() => {
        buttons.forEach((button) => {
          button.disabled = false;
        });
      }, 1000);
  }
}

// Sum attack (attack all enemies at even/odd indices)
function sumAttack() {
  let choice = prompt("Attack even (0) or odd (1) indices?");
  for (let i = 0; i < enemyArray.length; i++) {
    if (i % 2 == choice) {
      performHeroAttack(i); // Trigger the hero attack animation
      attackSound.play();
      enemyArray[i].strength = Math.max(0, enemyArray[i].strength - 5); // Decrease strength
      flashEnemy(i);
    }
  }
  displayArray();
}

// Flash effect when an enemy is attacked
function flashEnemy(index) {
  const enemyContainers = document.getElementsByClassName("enemy-container");
  const enemyGif = enemyContainers[index].querySelector(".enemy-gif");
  enemyGif.style.transition = "opacity 0.5s";
  enemyGif.style.opacity = "0.5"; // Flash effect
 
  if (playerHealth <= 0) {
    gameOver.play();
    bgsound.pause();
    setTimeout(() => {
      alert("Game Over!");
      resetGame();
    }, 500);
  }

  setTimeout(() => {
    enemyGif.style.opacity = "1";
  }, 500);
}

// Trigger hero attack animation
function performHeroAttack(index) {
  const heroGif = document.getElementById("hero-gif");
  heroGif.classList.add("attack-animation");

  setTimeout(() => {
    heroGif.classList.remove("attack-animation");
  }, 500);
}

setInterval(() => {
  if (playerHealth <= 0) {
    gameOver.play();
    bgsound.pause();
    setTimeout(() => {
      alert("Game Over!");
      resetGame();
    }, 500);
  }
}, 1000);

// Check if the player has defeated all enemies
function checkWinCondition() {
  if (enemyArray.every((enemy) => enemy.strength === 0)) {
    alert("Wave " + waveNumber + " cleared!");
    waveNumber++;
    playerHealth = Math.min(100, playerHealth + 30); // Increase player health
    document.getElementById("wave-number").textContent = waveNumber;
    enemyArray = generateEnemies();
    displayArray();
  }
}


// Reset the game after losing
function resetGame() {
  playerHealth = 100;
  waveNumber = 1;
  enemyArray = generateEnemies();
  document.getElementById("wave-number").textContent = waveNumber;
  document.getElementById("player-health").textContent = playerHealth;
  displayArray();
}

// Initialize the game
displayArray();
