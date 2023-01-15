/*const MONSTER_TOTAL = 5;
const MONSTER_WIDTH = MONSTER_TOTAL * 98;
const START_X = canvas.width - MONSTER_WIDTH;
const STOP_X = START_X + MONSTER_WIDTH;*/

/*function draw_background() {
  canvas = document.getElementById("myCanvas");

  ctx = canvas.getContext("2d");

  ctx.fillStyle = "pink";

  ctx.fillRect(0, 0, 200, 100);
}

draw_background();*/
/*
//some varibles to use global
const Messages = {
  KEY_EVENT_UP: "KEY_EVENT_UP",
  KEY_EVENT_DOWN: "KEY_EVENT_DOWN",
  KEY_EVENT_LEFT: "KEY_EVENT_LEFT",
  KEY_EVENT_RIGHT: "KEY_EVENT_RIGHT",
};

let heroImg,
  enemyImg,
  laserImg,
  canvas,
  ctx,
  gameObjects = [],
  hero,
  eventEmitter = new EventEmitter();
*/
//GameObject class
class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dead = false;
    this.type = "";
    this.width = 0;
    this.height = 0;
    this.img = undefined;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
  }
}

//Hero class
class Hero extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.type = "hero";
    this.speed = speed;
  }
}

//Enemy class
class Enemy extends GameObject {
  constructor(x, y) {
    super(x, y);
    (this.width = 98), (this.height = 50);
    this.type = "Enemy";
    let id = setInterval(() => {
      if (this.y < canvas.height - this.height) {
        this.y += 5;
      } else {
        console.log("Stopped at", this.y);
        clearInterval(id);
      }
    }, 300);
  }
}

//event handler function
let onKeyDown = function (e) {
  switch (e.keyCode) {
    case 37:
      eventEmitter.emit(Messages.KEY_EVENT_LEFT);
      break;
    case 38:
      eventEmitter.emit(Messages.KEY_EVENT_UP);
      //e.preventDefault();
      break;
    case 39:
      eventEmitter.emit(Messages.KEY_EVENT_RIGHT);
      break;
    case 40:
      eventEmitter.emit(Messages.KEY_EVENT_DOWN);
      //e.preventDefault();
      break;
    default:
      break;
  }
};

window.addEventListener("keydown", onKeyDown);

//Pub sub pattern
window.addEventListener("keyup", (evt) => {
  if (evt.key === "ArrowUp") {
    eventEmitter.emit(Messages.KEY_EVENT_UP);
  } else if (evt.key === "ArrowDown") {
    eventEmitter.emit(Messages.KEY_EVENT_DOWN);
  } else if (evt.key === "ArrowLeft") {
    eventEmitter.emit(Messages.KEY_EVENT_LEFT);
  } else if (evt.key === "ArrowRight") {
    eventEmitter.emit(Messages.KEY_EVENT_RIGHT);
  }
});

//eventemitter to publis and subscribe messages
class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(message, listener) {
    if (!this.listeners[message]) {
      this.listeners[message] = [];
    }
    this.listeners[message].push(listener);
  }

  emit(message, payload = null) {
    if (this.listeners[message]) {
      this.listeners[message].forEach((l) => l(message, payload));
    }
  }
}

//some varibles to use global
const Messages = {
  KEY_EVENT_UP: "KEY_EVENT_UP",
  KEY_EVENT_DOWN: "KEY_EVENT_DOWN",
  KEY_EVENT_LEFT: "KEY_EVENT_LEFT",
  KEY_EVENT_RIGHT: "KEY_EVENT_RIGHT",
};

let heroImg,
  enemyImg,
  laserImg,
  canvas,
  ctx,
  gameObjects = [],
  hero,
  eventEmitter = new EventEmitter();

//async to load img assets
function loadAsset(path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      resolve(img);
    };
  });
}

//createEnemies and push into gameObjects
function createEnemies(canvas, ctx, enemyImg) {
  const MONSTER_TOTAL = 5;
  const MONSTER_WIDTH = MONSTER_TOTAL * 98;
  const START_X = (canvas.width - MONSTER_WIDTH) / 2;
  const STOP_X = START_X + MONSTER_WIDTH;

  for (let x = START_X; x < STOP_X; x += 98) {
    for (let y = 0; y < 50 * 5; y += 50) {
      const enemy = new Enemy(x, y);
      enemy.img = enemyImg;
      gameObjects.push(enemy);
    }
  }
}

//create hero
function createHero() {
  hero = new Hero(canvas.width / 2 - 45, canvas.height - canvas.height / 4);
  hero.img = heroImg;
  gameObjects.push(hero);
}

//start drawing
function drawGameObjects(ctx) {
  gameObjects.forEach((go) => go.draw(ctx));
}

//Initialize the game
function initGame() {
  gameObjects = [];
  createEnemies();
  createHero();

  eventEmitter.on(Messages.KEY_EVENT_UP, () => {
    hero.y -= 5;
  });

  eventEmitter.on(Messages.KEY_EVENT_DOWN, () => {
    hero.y += 5;
  });

  eventEmitter.on(Messages.KEY_EVENT_LEFT, () => {
    hero.x -= 5;
  });

  eventEmitter.on(Messages.KEY_EVENT_RIGHT, () => {
    hero.x += 5;
  });
}

//Setup the game loop
window.onload = async () => {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  heroImg = await loadAsset("./assets/player.png");
  enemyImg = await loadAsset("./assets/enemyShip.png");

  initGame();
  let gameLoopId = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGameObjects(ctx);
  }, 100);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    player,
    canvas.width / 2 - 45,
    canvas.height - canvas.height / 4
  );
  //createEnemies(canvas, ctx, enemyShip);
};

/*const MONSTER_TOTAL = 5;
const MONSTER_WIDTH = MONSTER_TOTAL * 98;
const START_X = canvas.width - MONSTER_WIDTH;
const STOP_X = START_X + MONSTER_WIDTH;*/

/*canvas = document.getElementById("myCanvas");

ctx = canvas.getContext("2d");

ctx.fillStyle = "black";

ctx.fillRect(0, 0, 200, 100);*/
