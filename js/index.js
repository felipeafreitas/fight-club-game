const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function pressEnter2(e) {
  if (e.key == "Enter" && stage == "sceneBeforeFight") {
    clear();
    startGame();
    stage = "gamePlay";
  }
}

function pressEnter1(e) {
  if (e.key == "Enter" && stage == "tutorial") {
    clear();
    tutorialMusic.pause();
    drawBeforeFightScene();
    stage = "sceneBeforeFight";
  }
}

//BACKGROUND GAME
const bgImg = new Image();
bgImg.src = "./images/bgcorreto.png";

//PUNCH SOUND
const punchSound = new Audio();
punchSound.src = "./sounds/punchSound.ogg";

//DYING SOUND
const dyingSound = new Audio();
dyingSound.src = "./sounds/die2.wav";

//TYLER SPRITS
const tylerStandR = new Image();
tylerStandR.src = "./images/sprites/tylerStandR.png";

const tylerStandL = new Image();
tylerStandL.src = "./images/sprites/tylerStandL.png";

const tylerPunchingR = new Image();
tylerPunchingR.src = "./images/sprites/tylerPunchingR.png";

const tylerPunchingL = new Image();
tylerPunchingL.src = "./images/sprites/tylerPunchingL.png";

const tylerDeadL = new Image();
tylerDeadL.src = "./images/sprites/tylerDiedL.png";

const tylerDeadR = new Image();
tylerDeadR.src = "./images/sprites/tylerDiedR.png";

const tylerSprits = [
  tylerStandR,
  tylerStandL,
  tylerPunchingR,
  tylerPunchingL,
  tylerDeadR,
  tylerDeadL,
];

//NARRATOR SPRITS
const narratorStandR = new Image();
narratorStandR.src = "../images/sprites/narratorStandR.png";

const narratorStandL = new Image();
narratorStandL.src = "./images/sprites/narratorStandL.png";

const narratorPunchingR = new Image();
narratorPunchingR.src = "./images/sprites/theNarratorPunchingR.png";

const narratorPunchingL = new Image();
narratorPunchingL.src = "./images/sprites/theNarratorPunchingL.png";

const narratorDeadL = new Image();
narratorDeadL.src = "./images/sprites/narratorDiedR.png";

const narratorDeadR = new Image();
narratorDeadR.src = "./images/sprites/narratorDiedL.png";

const narratorSprits = [
  narratorStandR,
  narratorStandL,
  narratorPunchingR,
  narratorPunchingL,
  narratorDeadL,
  narratorDeadR,
];

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// ^^ SUBSTITUIR PELO NOVO MÉTODO ^^

function startGame() {
  stage = "gamePlay";
  const gamePlaying = setInterval(updateGameArea, 50);
}

function stop() {
  clearInterval(gamePlaying);
}

function printBackground() {
  ctx.drawImage(bgImg, canvas.width / 2 - bgImg.width / 2, -110);
}

//CLASSE CRIADORA DOS PERSONAGENS

class Fighter {
  constructor(fighterImg, x, y, lastDir) {
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.hp = 100;
    this.kills = 0;
    this.dead = false;
    this.jumping = false;
    this.collidingL = false;
    this.collidingR = false;
    this.punching = false;
    this.lastDir = this.lastDir;
    this.fighterImg = fighterImg;
    this.lastDir = lastDir;
  }
  draw() {
    if (this.lastDir == "r" && this.punching == false && this.dead == false) {
      ctx.drawImage(this.fighterImg[0], this.x, this.y);
    } else if (
      this.lastDir == "l" &&
      this.punching == false &&
      this.dead == false
    ) {
      ctx.drawImage(this.fighterImg[1], this.x, this.y);
    } else if (
      this.lastDir == "r" &&
      this.punching == true &&
      this.dead == false
    ) {
      ctx.drawImage(this.fighterImg[2], this.x, this.y);
      setTimeout(function () {
        this.punching = false;
      }, 500);
    } else if (
      this.lastDir == "l" &&
      this.punching == true &&
      this.dead == false
    ) {
      ctx.drawImage(this.fighterImg[3], this.x - 15, this.y);
      setTimeout(function () {
        this.punching = false;
      }, 500);
    } else if (this.lastDir == "r" && this.dead == true) {
      ctx.drawImage(this.fighterImg[4], this.x - 45, this.y + 130);
    } else if (this.lastDir == "l" && this.dead == true) {
      ctx.drawImage(this.fighterImg[5], this.x - 45, this.y + 130);
    }
  }
  newPosition() {
    this.speedY += 15; //gravity
    this.y += this.speedY;
    this.x += this.speedX;
    this.speedY *= 0.9; //friction
    this.checkJumping();
    this.hitBottom();
  }
  hitBottom() {
    let rockbottom = 270;
    if (this.y > rockbottom) {
      this.y = rockbottom;
    }
    this.speedY = 0;
  }
  checkJumping() {
    if (this.y >= 270) {
      this.jumping = false;
    } else {
      this.jumping = true;
    }
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  crashWith(opponent) {
    return !(
      this.bottom() < opponent.top() ||
      this.top() > opponent.bottom() ||
      this.right() < opponent.left() ||
      this.left() > opponent.right()
    );
  }
}

//HEALTH BAR
class healthBar {
  constructor(player, x, y) {
    this.player = player;
    this.x = x;
    this.y = y;
    this.heigth = 40;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.player.hp * 2, this.heigth);
    ctx.font = "42px VT323";
    ctx.fillStyle = "White";
    ctx.fillText(`Wins: ` + this.player.kills, this.x, this.heigth + 60);
  }
}

const player = new Fighter(tylerSprits, canvas.width / 5, 270, "r");
const tylerHealth = new healthBar(player, 180, 30);

const opponent = new Fighter(
  narratorSprits,
  canvas.width * 0.8 - 100,
  270,
  "l"
);
const healthNarrator = new healthBar(opponent, 520, 30);

//FUNÇÃO DE COLLISION
function collisionCheck(player1, player2) {
  if (player1.x + 77 > player2.x && player1.x + 77 < player2.x) {
    // console.log("collision L");
    player1.collidingL = true;
    console.log(player1.collidingL);
  } else if (player1.x + 77 > player2.x && player1.x + 77 < player2.x) {
    // console.log("collision R");
    player1.collidingR = true;
    console.log(player1.collidingR);
  } else {
    player1.collidingL = false;
    player1.collidingR = false;
  }
}

//FUNÇÃO DE DANO
function hit(striker, defender) {
  striker.punching = true;
  let xDistance = Math.abs(striker.x - defender.x);
  if (xDistance < 100 && defender.dead == false) {
    let damage = Math.ceil(Math.random() * 10) + 10;
    punchSound.play();
    if (defender.hp - damage <= 0) {
      defender.dead = true;
      dyingSound.play();
      striker.kills++;
      respawn(striker, defender);
    } else {
      defender.hp -= damage;
    }
  } else {
    console.log("missed");
  }
}

// RESPAWN DEFEATED PLAYER
function respawn(striker, newLife) {
  setTimeout(function () {
    newLife.dead = false;
    newLife.x = newLife == player ? canvas.width / 5 : canvas.width * 0.8 - 100;
    newLife.y = 270;
    newLife.hp = 100;
    striker.x = striker == player ? canvas.width / 5 : canvas.width * 0.8 - 100;
  }, 2000);
}

//FUNÇÃO ANDAR (LEFT || RIGHT)
function left(character) {
  if (character.x <= 170) {
    character.x = 170;
    character.speedX = 0;
  } else if (character.collidingL == true) {
    character.speedX = 0;
  } else {
    character.speedX -= 6;
    if (character.speedX < -18) {
      character.speedX = -18;
    }
    character.lastDir = "l";
  }
}

function right(character) {
  if (character.x > canvas.width * 0.8 - 100) {
    character.x = canvas.width * 0.8 - 100;
    character.speedX = 0;
  } else if (character.collidingR == true) {
    character.speedX = 0;
  } else {
    character.speedX += 6;
    if (character.speedX > 18) {
      character.speedX = 18;
    }
    character.lastDir = "r";
  }
}

//FUNÇÃO DE PULO
function jump(character) {
  if (character.jumping == false) {
    character.speedY -= 200;
    character.speedY += 10;
    console.log("jump");
    character.jumping = true;
  }
}

//FUNÇÕES DO TECLADO
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "z": // left arrow
      left(player);
      break;
    case "x": // right arrow
      right(player);
      break;
    case "a": // Attack
      hit(player, opponent, healthNarrator);
      break;
    case "s": //Jump
      jump(player);
      break;
    case "ArrowLeft": // left arrow
      left(opponent);
      break;
    case "ArrowRight": // right arrow
      right(opponent);
      break;
    case "ArrowDown": // Attack
      hit(opponent, player, tylerHealth);
      break;
    case "ArrowUp": //Jump
      jump(opponent);
      break;
  }
});

document.addEventListener("keyup", (e) => {
  player.speedX = 0;
  player.speedY = player.speedY;
  player.punching = false;
  opponent.speedX = 0;
  opponent.speedY = opponent.speedY;
  opponent.punching = false;
});

//CONFIGURANDO DISTÂNCIA ENTRE OPONENTES
let enemy_distance_type = "";
function checkEnemyDistance() {
  if (!player) return 0;
  let enemy_distance = Math.abs(
    opponent.x + opponent.width / 2 - (player.x + player.width / 2)
  );
  if (enemy_distance < 180) {
    enemy_distance_type = "near";
  } else if (enemy_distance < 350) {
    enemy_distance_type = "middle";
  } else if (enemy_distance < 650) {
    enemy_distance_type = "far";
  }
}

//IA DO OPONENTE

//FUNÇÕES
// function getCloser() {
//   if (player.x > opponent.x) {
//     right(opponent);
//     console.log("goind to right");
//   } else {
//     left(opponent);
//     console.log(opponent);
//     console.log("going to left");
//   }
// }

//FUNÇÃO GERAL IA
function ia() {
  if (enemy_distance_type === "near") {
    return "near";
  } else if (enemy_distance_type === "middle") {
    return "middle";
  } else if (enemy_distance_type === "far") {
    return "far";
  }
}

//CHECAR GAME OVER
function checkGameOver() {
  if (player.kills >= 3 || opponent.kills >= 3) {
    clear();
    gameOverScreen();
  }
}

//MOTOR DO GAME

function updateGameArea() {
  clear();
  printBackground();
  collisionCheck(player, opponent);
  collisionCheck(opponent, player);
  player.draw();
  opponent.draw();

  if (player.dead == false) {
    tylerHealth.draw();
  }
  if (opponent.dead == false) {
    healthNarrator.draw();
  }
  ia();
  player.newPosition();
  opponent.newPosition();
  checkEnemyDistance();
  checkGameOver();
}
