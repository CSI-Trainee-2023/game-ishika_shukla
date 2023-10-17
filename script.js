document.addEventListener('DOMContentLoaded', function() {
  var hero = {
      left: 675,
      top: 700
  };
  var score = 0;
  var highScore = 0;

  var missiles = [];

  var enemies = [
     
      { left: 10, top: 100 },
      { left: 80, top: 100 },{ left: 150, top: 100 },
      { left: 225, top: 100 }, { left: 300, top: 100 },
      { left: 400, top: 100 }, { left: 500, top: 100 },
      { left: 600, top: 100 }, { left: 700, top: 100 },
      { left: 800, top: 100 }, { left: 900, top: 100 },
      { left: 1000, top: 100 },{ left: 1100, top: 100 },
      { left: 1200, top: 100 },{ left: 1300, top: 100 },
      { left: 1375, top: 100 },  { left: 1450, top: 100 },

      { left: 40, top: 175 },  { left: 120, top: 175 },
      { left: 200, top: 175 },
      { left: 320, top: 175 }, { left: 400, top: 175 },
      { left: 480, top: 175 },{ left: 700, top: 175 },
      { left: 800, top: 175 },{ left: 900, top: 175 },
      { left: 1100, top: 175 },{ left: 1200, top: 175 },
      { left: 1300, top: 175 },{ left: 1450, top: 175 },

      { left: 80, top: 255 }, { left: 170, top: 255 },
      { left: 359, top: 255 }, { left: 440, top: 255 },
      { left: 750, top: 255 },{ left: 850, top: 255 },
      { left: 1150, top: 255 },{ left: 1250, top: 255 },
      { left: 1450, top: 255 },

      { left: 120, top: 335 },
      { left: 400, top: 335 },{ left: 800, top: 335 },
      { left: 1200, top: 335 },{ left: 1450, top: 335 },

  ];
  var isGameOver = false;
  var gameLoopId; // Store the ID of the game loop interval

let left=false;
let right=false;
let fire =false;

function gamePlay(){
  if(left)
  {
    hero.left = Math.max(hero.left - 10, 0);
    console.log(hero.left);
  }
  
  if(right)
  {
    hero.left = Math.min(hero.left + 10, window.innerWidth - 50);
    console.log(hero.left);
  }
  if(fire){

    if(Math.random()<0.1)
    {
      document.getElementById('shoot').play();
      // Set the volume for the "shoot" sound effect to 50%
      document.getElementById('shoot').volume = 0.5;

        // Spacebar (fire)
      missiles.push({
            left: hero.left + 20,
            top: hero.top - 20,
        });
        drawMissiles();
      }
  }
  // gameLoop();
   if(checkEnemyReachedBottom())
  gameOver();
  drawHero();
}
  
document.onkeydown = function (e) {
    // e.preventDefault(); // This prevents  default behavior of arrow keys

    if (e.key === ' ') {
      fire=true;
    }

    if (e.key === 'ArrowLeft') {
        // Left
        console.log(hero.left);
        left=true;
    }

    if (e.key === 'ArrowRight') {
        // Right
        right=true;
    }
    gamePlay();
};
  document.onkeyup = function (e) {
    // e.preventDefault(); // This prevents  default behavior of arrow keys

    if (e.key === ' ') {
      fire=false;
    }

    if (e.key === 'ArrowLeft') {
        // Left
        left=false;
    }

    if (e.key === 'ArrowRight') {
        // Right
        right=false;
    }

    gamePlay();
};


//  moves  hero hori & ver on the screen.
  function drawHero() {
      document.getElementById('hero').style.left = hero.left + 'px';
  }

  function drawMissiles() {
      document.getElementById('missiles').innerHTML = ""
      for(var i = 0 ; i < missiles.length ; i++ ) {
          document.getElementById('missiles').innerHTML += `<div class='missile1' style='left:${missiles[i].left}px; top:${missiles[i].top}px'></div>`;
      }
  }

  function moveMissiles() {
      for(var i = 0 ; i < missiles.length ; i++ ) {
          missiles[i].top = missiles[i].top - 10;
      }
  }

  function drawEnemies() {
      document.getElementById('enemies').innerHTML = ""
      for(var i = 0 ; i < enemies.length ; i++ ) {
          document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
      }
  }

  function moveEnemies() {
      for(var i = 0 ; i < enemies.length ; i++ ) {
          enemies[i].top = enemies[i].top + .05;
      }
  }

  function updateScoreDisplay() {
    document.getElementById('score').textContent = 'Score: ' + score;
    if (score > highScore) {
      highScore = score;
     
    }
  }
  updateScoreDisplay();
  
function collisionDetection() {
      for (var enemy = 0; enemy < enemies.length; enemy++) {
          for (var missile = 0; missile < missiles.length; missile++) {
              if ( 
                  //  collision between missile and enemy
                  missiles[missile].left >= enemies[enemy].left &&
                  missiles[missile].left <= (enemies[enemy].left + 50) &&
                  missiles[missile].top <= (enemies[enemy].top + 50) &&
                  missiles[missile].top >= enemies[enemy].top
              ) {

                document.getElementById('explosion').play();
                document.getElementById('shoot').volume = 0.5;

                  // Remove enemy and missile
                  enemies.splice(enemy, 1);
                  missiles.splice(missile, 1);
                  score += 10;
                    updateScoreDisplay();
                    break;
              }
            }
      }
                 // collision between hero and enemy
     for (var enemy = 0; enemy < enemies.length; enemy++) {
        if (
          hero.left + 50 >= enemies[enemy].left &&
          hero.left <= (enemies[enemy].left + 50) &&
          hero.top <= (enemies[enemy].top + 50) &&
          hero.top + 50 >= enemies[enemy].top
         ) {

          gameOver();
          return;
        }
    }

 }

 function gameOver() {
    isGameOver = true;

    var gameOverSound = document.getElementById('game-over-sound');
    gameOverSound.play();

    document.getElementById('game-over-screen').style.display = 'block';
    // Clear the game elements
    document.getElementById('hero').style.display = 'none';
    document.getElementById('missiles').style.display = 'none';
    document.getElementById('enemies').style.display = 'none';
    updateScoreDisplay();

    document.getElementById('restart-button').addEventListener('click', function() {
        // Reset  game 
        isGameOver = false;
        score = 0;
        hero.left = 575;
        hero.top = 700;
        missiles = [];
        enemies = []; 
        updateScoreDisplay();

         // Hide game over screen
      document.getElementById('game-over-screen').style.display = 'none';
      document.getElementById('hero').style.display = 'block';
      document.getElementById('missiles').style.display = 'block';
      document.getElementById('enemies').style.display = 'block';

      // Call your game loop function to start the game again
      gameLoop();
    });
}
function resetGame() {
    // Reset the game state
    location.reload();
   
  }
  
  // Add an event listener to the restart button
  document.getElementById('restart-button').addEventListener('click', resetGame);
  

  function gameLoop() {
    if (!isGameOver) {
      drawEnemies();
      moveMissiles();
      drawMissiles();
      moveEnemies();
      collisionDetection();

      // Check if all enemies have been destroyed or if an enemy reaches the bottom
      if (enemies.length === 0 || checkEnemyReachedBottom()) {
        gameOver();
      } 
      else {
        // Continue the game loop by scheduling the next frame
        requestAnimationFrame(gameLoop);
      }
    }
  }

  function checkEnemyReachedBottom() {
    // Define bottom of the screen
    const verticalThreshold = window.innerHeight;

    // Check if any enemy has reached or passed the vertical threshold
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].top >= verticalThreshold) {
        return true; // An enemy has reached the bottom
      }
    }

    return false; // No enemy reached the bottom
  }
  
  gameLoop();


});