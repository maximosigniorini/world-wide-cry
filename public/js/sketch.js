let button;
let imgs = []
let angle1 = 0;
let angle2 = 0;
let scalar = 100;

function preload() {
  for (let i = 1; i < 13; i++) {
    imgs[i] = loadImage("img/" + i + ".png");
  }
}

function setup() {
  cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.position(0, 0)
  button = createButton("Give me a sad thought")
  button.style('background-color', "#33acff")
  button.style('border', 'none')
  button.style("border-radius", "8px")
  button.style("color","white")
  button.style('font-size', '16px')
  button.style('padding','15px')
  button.style('transition','0.5s')
  button.style('position','absolute')
  button.style('width','200px')
  button.style('height','50px')
  button.style('left', '0')
  button.style('right', '0');
  button.style('top', '0');
  button.style('bottom', '0');
  button.style('margin', 'auto');
  button.mouseOver(buttonColor)
  button.mouseOut(buttonColorOrig)
  button.mousePressed(changeWindow);
}

function buttonColor(){
  button.style('background-color', "#2c92d7")
}

function buttonColorOrig(){
  button.style('background-color', "#33acff")
}

function changeWindow(){
  window.location.href = "common/main.html";
}

function draw() {
  clear()

  let ang1 = radians(angle1);
  let ang2 = radians(angle2);

  let x1 = width / 2 + scalar * cos(ang1);
  let x2 = width / 2 + scalar * cos(ang2);

  let y1 = height / 2 + scalar * sin(ang1);
  let y2 = height / 2 + scalar * sin(ang2);

  image(imgs[1], x1, height / 3, 64, 64)
  image(imgs[2], x2, height / 3, 64, 64)
  image(imgs[3], width / 3, y1, 64, 64)
  image(imgs[4], width / 3, y2, 64, 64)
  image(imgs[5], x1, height * 0.6, 64, 64)
  image(imgs[6], x2, height * 0.6, 64, 64)
  image(imgs[7], width * 0.6, y1, 64, 64)
  image(imgs[8], width * 0.6, y2, 64, 64)

  angle1 += 2;
  angle2 += 3;
}
