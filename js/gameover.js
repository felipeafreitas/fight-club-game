const gameoverScene = new Image();
gameoverScene.src = "/images/gameOverImg.gif";

function gameOverScreen() {
  
  ctx.fillStyle = "#302E26";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  
  ctx.drawImage(
    gameoverScene,
    (canvas.width / 2) - (gameoverScene.width / 2),
    20
  );

  ctx.font = "40px VT323";
  ctx.fillStyle = "white";
  ctx.fillText(
    "It's only after we've lost everything",
    50,
    60)
    ctx.fillText(
      "that we're free to do anything",
      50,
      100
  );

  if (player.kills >= 3) {
    ctx.font = "40px VT323";
    ctx.fillStyle = "white";
    ctx.fillText("Tyler Wins", 50, 230);
  } else if (opponent.kills >= 3) {
    ctx.font = "40px VT323";
    ctx.fillStyle = "white";
    ctx.fillText("Narrator Wins", 50, 230);
  }

  setTimeout(function () {
    ctx.font = "36px VT323";
    ctx.fillStyle = "white";
    ctx.fillText("Another one? ", (canvas.width / 6) * 4, 400);
    ctx.fillText("Press enter", (canvas.width / 6) * 4, 440);

    document.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        clear();
        startGame();
      }
    });
  }, 1000);
}
