const bgImgStart = new Image();
bgImgStart.src = "./images/bgImg_startScreen.png";

const bgProportion = 0.8;

function drawStartBG() {
  ctx.drawImage(
    bgImgStart,
    canvas.width / 2 - (bgImgStart.width * bgProportion) / 2,
    20,
    bgImgStart.width * bgProportion,
    bgImgStart.height * bgProportion
  );
}

let stage = "startScreen";

function startTitle() {
  ctx.font = "62px VT323";
  ctx.fillStyle = "white";
  ctx.fillText("Press Enter", canvas.width / 2 - 140, 420);
}
ctx.fillStyle = "black";
let loopStartScreen = setInterval(updateStartScreen, 500);

function updateStartScreen() {
  clear();
  drawStartBG();
  startTitle();
}

function pressEnter(e) {
  if (e.key == "Enter" && stage == "startScreen") {
    clearInterval(loopStartScreen);
    clear();
    tutorialScreen();
    stage = "tutorial";
  }
}
//PRESS ENTER FUNCTION
document.addEventListener("keydown", pressEnter);
