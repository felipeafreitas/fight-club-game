const bgImgStart = new Image();
bgImgStart.src = "/images/bgImg_startScreen.png";

const startMusic = new Audio();
startMusic.src =
  "/images/Where Is My Mind [8 Bit Tribute to Pixies (and Fight Club!)] - 8 Bit Universe.mp3";
startMusic.volume = 0.3;
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

  startMusic.play();

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

//PRESS ENTER FUNCTION
document.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
          clearInterval(loopStartScreen);
          clear(); 
          startMusic.pause();
          drawBeforeFightScene()
      }
    })
