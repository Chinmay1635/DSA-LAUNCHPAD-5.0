function completeLevel(score, level, game) {
  const email = localStorage.getItem('email');

  fetch('https://dsa-launchpad-5-0.vercel.app/update-score', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ score: score, level: level, game: game, email: email }) 
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          console.log("Score updated successfully:", data.newScore);
      } else {
          console.error("Failed to update score:", data.message);
      }
  })
  .catch(error => console.error("Error updating score:", error));
}

$(document).ready(function() {
  var towers = [[[], $(".line1")], [[], $(".line2")], [[], $(".line3")]],
    moves = 0,
    discs = null,
    hold = null,
    level = 1, // Start with level 1
    maxLevel = 4, // Maximum level is 4 (5 discs)
    score = 0; // Track player's total score

  function clear() {
    towers[0][1].empty();
    towers[1][1].empty();
    towers[2][1].empty();
  }

  function drawdiscs() {
    clear();
    for (var i = 0; i < 3; i++) {
      if (!jQuery.isEmptyObject(towers[i][0])) {
        for (var j = 0; j < towers[i][0].length; j++) {
          towers[i][1].append(
            $("<li id='disc" + towers[i][0][j] + "' value='" + towers[i][0][j] + "'></li>")
          );
        }
      }
    }
  }

  function init() {
    clear();
    towers = [[[], $(".line1")], [[], $(".line2")], [[], $(".line3")]];
    discs = level + 1; // Number of discs based on the level
    moves = 0;
    hold = null;
    for (var i = discs; i > 0; i--) towers[0][0].push(i);
    drawdiscs();
    $(".moves").text(moves + " moves");
    $(".level").text("Level: " + level);
    $(".score").text("Score: " + score); // Display current score
  }

  function handle(tower) {
    if (hold === null) {
      if (!jQuery.isEmptyObject(towers[tower][0])) {
        hold = tower;
        towers[hold][1].children().last().css("margin-top", "-170px");
      }
    } else {
      var move = moveDisc(hold, tower);
      moves += 1;
      $(".moves").text(moves + " moves");
      if (move == 1) {
        drawdiscs();
      } else {
        alert("You can't place a bigger disc on a smaller one");
      }
      hold = null;
    }
    if (solved()) {
      calculateScore();
      $(".moves").text("Solved with " + moves + " moves!");
      setTimeout(nextLevel, 1000); // Move to the next level after a delay
    }
  }

  function moveDisc(a, b) {
    var from = towers[a][0];
    var to = towers[b][0];
    if (from.length === 0) return 0;
    else if (to.length === 0) {
      to.push(from.pop());
      return 1;
    } else if (from[from.length - 1] > to[to.length - 1]) {
      return 0;
    } else {
      to.push(from.pop());
      return 1;
    }
  }

  function solved() {
    if (
      jQuery.isEmptyObject(towers[0][0]) &&
      jQuery.isEmptyObject(towers[1][0]) &&
      towers[2][0].length == discs
    )
      return 1;
    else return 0;
  }

  function calculateScore() {
    var minMoves = Math.pow(2, discs) - 1; // Calculate 2^n - 1
    var currentScore = 100; // Start with 100 points
    if (moves > minMoves) {
      var extraMoves = moves - minMoves;
      currentScore -= extraMoves * 2; // Deduct 2 points for each extra move
    }
    currentScore = Math.max(currentScore, 50); // Ensure minimum score is 50
    score += currentScore; // Add current level score to total score
    completeLevel(score, level, "toh");
    alert("Level completed! You earned " + currentScore + " points.");
  }

  function nextLevel() {
    if (level < maxLevel) {
      level += 1;
      alert("Level " + level + " starting!");
      init(); // Restart with the new level
    } else {
      alert("Congratulations! You have completed all levels! Final Score: " + score);
    }
  }

  $(".t").click(function() {
    handle($(this).attr("value"));
  });

  $("#restart").click(function() {
    init(); // Restart the current level
  });

  init(); // Start the game
});
