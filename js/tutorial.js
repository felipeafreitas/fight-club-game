const theCharacters = new Image();
theCharacters.src = "../images/theCharacters.png";

const tutorialMusic = new Audio();
tutorialMusic.src = "../sounds/soundTutorial.mp3";
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
  ctx.fillText("Fight Club Rules", canvas.width / 2 + 30, 70);

  ctx.font = "30px VT323";
  ctx.fillStyle = "black";
  setTimeout(function () {
    ctx.fillText(
      "1.You do not talk about Fight Club",
      canvas.width / 2 - 40,
      120
    );
  }, 1000);
  setTimeout(function () {
    ctx.fillText(
      "2.You do not talk about Fight Club",
      canvas.width / 2 - 40,
      160
    );
  }, 2000);
  setTimeout(function () {
    ctx.fillText("3. Tyler Keyboard Commands", canvas.width / 2 - 40, 200);
  }, 3000);
  setTimeout(function () {
    ctx.fillText(
      "Move Left/Right: 'z' and 'x'",
      canvas.width / 2 + 20 - 40,
      240
    );
  }, 4000);
  setTimeout(function () {
    ctx.fillText("Punch/Jump: 'a' and 's'", canvas.width / 2 + 20 - 40, 280);
  }, 5000);
  setTimeout(function () {
    ctx.fillText("4. Narrator Keyboard Commands", canvas.width / 2 - 40, 320);
  }, 6000);
  setTimeout(function () {
    ctx.fillText(
      "Move Left/Right: Left and Right Arrow",
      canvas.width / 2 + 20 - 40,
      360
    );
  }, 7000);
  setTimeout(function () {
    ctx.fillText(
      "Jump/Punch: Up and Down Arrow",
      canvas.width / 2 + 20 - 40,
      400
    );
  }, 8000);

  setTimeout(function () {
    ctx.font = "30px VT323";
    ctx.fillStyle = "black";
    ctx.fillText(">>Press Enter", (canvas.width / 5) * 4, 460);

    document.addEventListener("keydown", pressEnter1);
  }, 9000);
}
