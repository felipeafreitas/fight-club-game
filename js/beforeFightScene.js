const beforeFightScene = new Image();
beforeFightScene.src = "/images/wannaFightScene.gif";

function drawBeforeFightScene() {
  ctx.drawImage(
    beforeFightScene,
    canvas.width / 2 - (bgImgStart.width * bgProportion) / 2,
    20
  );

  ctx.font = "40px VT323";
  ctx.fillStyle = "white";
  ctx.fillText("- Hey, wanna fight?", canvas.width / 2 - 100, 420);

  setTimeout(function () {
    ctx.font = "32px VT323";
    ctx.fillStyle = "white";
    ctx.fillText(">>Press Enter", (canvas.width / 5) * 4, 480);

    document.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        clear();
        startGame();
      }
    });
  }, 3000);
}
