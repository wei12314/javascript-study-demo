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

class Hero extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.type = "hero";
    this.speed = speed;
  }
}

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

let onKeyDown = function (e) {
  switch (e.keyCode) {
    case 37:
      break;
    case 38:
      e.preventDefault();
      break;
    case 39:
      break;
    case 40:
      e.preventDefault();
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
    eventEmitter.emit(Message.KEY_EVENT_RIGHT);
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

function loadAsset(path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      resolve(img);
    };
  });
}

function createEnemies(canvas, ctx, enemyImg) {
  const MONSTER_TOTAL = 5;
  const MONSTER_WIDTH = MONSTER_TOTAL * 98;
  const START_X = (canvas.width - MONSTER_WIDTH) / 2;
  const STOP_X = START_X + MONSTER_WIDTH;

  for (let x = START_X; x < STOP_X; x += 98) {
    for (let y = 0; y < 50 * 5; y += 50) {
      ctx.drawImage(enemyImg, x, y);
    }
  }
}

window.onload = async () => {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  const player = await loadAsset("./assets/player.png");
  const enemyShip = await loadAsset("./assets/enemyShip.png");

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    player,
    canvas.width / 2 - 45,
    canvas.height - canvas.height / 4
  );
  createEnemies(canvas, ctx, enemyShip);
};

run();
/*const MONSTER_TOTAL = 5;
const MONSTER_WIDTH = MONSTER_TOTAL * 98;
const START_X = canvas.width - MONSTER_WIDTH;
const STOP_X = START_X + MONSTER_WIDTH;*/

/*canvas = document.getElementById("myCanvas");

ctx = canvas.getContext("2d");

ctx.fillStyle = "black";

ctx.fillRect(0, 0, 200, 100);*/
