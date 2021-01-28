const theCharacters = new Image();
theCharacters.src = "/images/theCharacters.png";

const tutorialMusic = new Audio();
tutorialMusic.src = "/sounds/soundTutorial.mp3";
tutorialMusic.volume = 0.3;

//document.removeEventListener("keydown", pressEnter);

function tutorialScreen() {
  tutorialMusic.play();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    theCharacters,
    canvas.width / 4 - theCharacters.width / 2,
    canvas.height / 2 - theCharacters.height / 2
  );

  ctx.font = "42px VT323";
  ctx.fillStyle = "black";
  ctx.fillText("Fight Club Rules", canvas.width / 2 + 30, 90);

  ctx.font = "30px VT323";
  ctx.fillStyle = "black";
  setTimeout(function () {
    ctx.fillText("1.You do not talk about Fight Club", canvas.width / 2, 150);
  }, 1000);
  setTimeout(function () {
    ctx.fillText("2.You do not talk about Fight Club", canvas.width / 2, 210);
  }, 2000);
  setTimeout(function () {
    ctx.fillText("3.To move Tyler: Press z(Left) and x(Right) ", canvas.width / 2, 270);
  }, 3000);
  setTimeout(function () {
    ctx.fillText("5.To mode the Narrator: Arrowjump: Press 'a'", canvas.width / 2, 330);
  }, 4000);
  setTimeout(function () {
    ctx.fillText("5.To punch: Press 's'", canvas.width / 2, 390);
  }, 5000);



  setTimeout(function () {
    ctx.font = "30px VT323";
    ctx.fillStyle = "black";
    ctx.fillText(">>Press Enter", (canvas.width / 5) * 4, 460);

    document.addEventListener("keydown", pressEnter1);
  }, 7000);
}
