/*1. get the canvas reference
canvas = document.getElementById("myCanvas");

//2. set the context to 2D to draw basic shapes
ctx = canvas.getContext("2d");

//3. fill it with the color red
ctx.fillStyle = "red";

//4. and draw a rectangle with these parameters, setting location and size
ctx.fillRect(0, 0, 200, 200);*/

function loadAsset(path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      resolve(img);
    };
  });
}

async function run() {
  const heroImg = await loadAsset("player.png");
  const monsterImg = await loadAsset(".png");

  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  ctx.drawImage(heroImg, canvas.width / 2, canvas.height / 2);
  ctx.drawImage(monsterImg, 0, 0);
}

run();
