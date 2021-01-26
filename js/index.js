const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const bgImg = new Image();
bgImg.src = "/images/bgcorreto.png";

const tyler = new Image();
tyler.src = "/images/sprites/tylerStand.png";

const narrator = new Image();
narrator.src = "/images/sprites/narratorStand.png";

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// ^^ SUBSTITUIR PELO NOVO MÉTODO ^^

setInterval(updateGameArea, 20);

function stop() {
  clearInterval();
}

function printBackground() {
  ctx.drawImage(bgImg, canvas.width / 2 - bgImg.width / 2, -110);
}

//CLASSE CRIADORA DOS PERSONAGENS

class Fighter {
  constructor(fighterImg, x, y, width, heigth, lastDir) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigth = heigth;
    this.speedX = 0;
    this.speedY = 0;
    this.hp = 100;
    this.kills = 0;
    this.dead = false;
    this.jumping = true;
    this.lastDir = this.lastDir;
    this.fighterImg = fighterImg;
    this.lastDir = lastDir;
  }
  draw() {
    if (this.lastDir == "r") {
    ctx.drawImage(this.fighterImg, this.x, this.y);
  } else {
    ctx.drawImage(this.fighterImg, this.x, this.y);
  }
  }
  newPosition() {
    this.speedY += 10; //gravity
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

const player = new Fighter(tyler, canvas.width / 5, 270, 50, 50, "r");
const opponent = new Fighter(
  narrator,
  canvas.width * 0.8 - 100,
  270,
  100, 
  100,
  "l"
);

//FUNÇÃO DE COLLISION
function collisionCheck() {
  if (player.crashWith(opponent)) {
    console.log("CRASHED");
  }
}

//FUNÇÃO DE DANO
function hit(striker, defender) {
  console.log("attack");
  let xDistance = Math.abs(striker.x - defender.x);
  if (xDistance < 100) {
    let damage = Math.ceil(Math.random() * 10);
    damageHP(defender, damage);
    console.log(defender);
  } else {
    console.log("missed");
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
    case "ArrowLeft": // left arrow
      if (player.x <= 20) {
        player.x = 20;
        player.speedX = 0;
        break;
      }
      player.speedX -= 2;
      if (player.speedX < -8) {
        player.speedX = -8;
      }
      player.lastDir = "l";
      break;
    case "ArrowRight": // right arrow
      if (player.x >= 880 - player.width) {
        player.x = 880 - player.width;
        player.speedX = 0;
        break;
      }
      player.speedX += 2;
      if (player.speedX > 8) {
        player.speedX = 8;
      }
      player.lastDir = "r";
      break;
    case "": // Attack
      hit(player, opponent);
      break;
    case "Shift": //Jump
      jump(player);
      break;
  }
});

document.addEventListener("keyup", (e) => {
  player.speedX = 0;
  player.speedY = player.speedY;
});

//FUNÇÃO DE DANO
function damageHP(target, damage) {
  if (target.hp - damage < 0) {
    target.dead = true;
  } else {
    target.hp -= damage;
  }
}

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
  } else {
    enemy_distance_type = "furthest";
  }
  console.log(enemy_distance_type);
  return enemy_distance_type;
}

//IA DO OPONENTE

//FUNÇÕES
function getCloser() {
  if (player.x > opponent.x) {
    opponent.x += 10;
  } else {
    opponent.x -= 10;
  }
}

//FUNÇÃO GERAL IA
function ia() {
  if (enemy_distance_type === "near") {
    return hit(opponent, player);
  } else if (enemy_distance_type === "middle") {
    return getCloser();
  } else if (enemy_distance_type === "far") {
    return getCloser();
  } else if ((enemy_distance_type = "furthest"));
  {
    return getCloser();
  }
}

//MOTOR DO GAME

function updateGameArea() {
  clear();
  printBackground();
  player.draw();
  opponent.draw();
  ia();
  player.newPosition();
  checkEnemyDistance();
  collisionCheck();
}
