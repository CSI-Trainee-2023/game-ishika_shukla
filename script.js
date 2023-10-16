var hero = {
      left: 575,
      top: 700
  };

  var missiles = [];

  var enemies = [
     
      { left: 200, top: 100 }, { left: 300, top: 100 },
      { left: 400, top: 100 }, { left: 500, top: 100 },
      { left: 600, top: 100 }, { left: 700, top: 100 },
      { left: 800, top: 100 }, { left: 900, top: 100 },
      { left: 1000, top: 100 },{ left: 1100, top: 100 },
      { left: 1200, top: 100 },{ left: 1300, top: 100 },

      { left: 200, top: 175 },{ left: 300, top: 175 },
      { left: 400, top: 175 },{ left: 500, top: 175 },
      { left: 600, top: 175 },{ left: 700, top: 175 },
      { left: 800, top: 175 },{ left: 900, top: 175 },
      { left: 1000, top: 175 },{ left: 1100, top: 175 },
       { left: 1200, top: 175 },{ left: 1300, top: 175 },

       { left: 200, top: 255 },{ left: 300, top: 255 },
      { left: 400, top: 255 },{ left: 500, top: 255 },
      { left: 600, top: 255 },{ left: 700, top: 255 },
      { left: 800, top: 255 },{ left: 900, top: 255 },
      { left: 1000, top: 255 },{ left: 1100, top: 255 },
       { left: 1200, top: 255 },{ left: 1300, top: 255 },
  ];
  var isGameOver = false;
  
  document.onkeydown = function(e) {
      if (e.key === 'ArrowLeft') {
          // Left
          hero.left = hero.left - 10;
      }
      if (e.key === 'ArrowRight') {
          // Right
          hero.left = hero.left + 10;
      }
      if (e.key === 'Spacebar' || e.key === ' ') {
          // Spacebar (fire)
          missiles.push({
              left: hero.left + 20,
              top: hero.top - 20 
          });
          drawMissiles()
      }
      drawHero();
  }

  function gameOver() {
      isGameOver = true;
      document.getElementById('game-over-screen').style.display = 'block';
      // Clear the game elements
      document.getElementById('hero').style.display = 'none';
      document.getElementById('missiles').style.display = 'none';
      document.getElementById('enemies').style.display = 'none';
    
  }
  

//  moves  hero hori & ver on the screen.
  function drawHero() {
      document.getElementById('hero').style.left = hero.left + 'px';
      document.getElementById('hero').style.top = hero.top + 'px';
  }

  function drawMissiles() {
      document.getElementById('missiles').innerHTML = ""
      for(var i = 0 ; i < missiles.length ; i++ ) {
          document.getElementById('missiles').innerHTML += `<div class='missile1' style='left:${missiles[i].left}px; top:${missiles[i].top}px'></div>`;
      }
  }

  function moveMissiles() {
      for(var i = 0 ; i < missiles.length ; i++ ) {
          missiles[i].top = missiles[i].top - 88;
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
          enemies[i].top = enemies[i].top + 15;
      }
  }


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
                  // Remove enemy and missile
                  enemies.splice(enemy, 1);
                  missiles.splice(missile, 1);
  
              }
            }
      }
                 // collision between hero and enemy
     for (var enemy = 0; enemy < enemies.length; enemy++) {
        if (
          hero.left >= enemies[enemy].left &&
          hero.left <= (enemies[enemy].left + 50) &&
          hero.top <= (enemies[enemy].top + 50) &&
          hero.top >= enemies[enemy].top
         ) {

          gameOver();
        }
    }
 }
  

 
  
  function gameLoop() {
      setTimeout(gameLoop, 1000);
      if (!isGameOver) {
          moveMissiles();
          drawMissiles();
          moveEnemies();
          drawEnemies();
          collisionDetection();
      }
  }
  
  gameLoop();