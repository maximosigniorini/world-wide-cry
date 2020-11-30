//Sketch de P5
let data = {};
let tweets = [];
let frases = [];
let numTweets = 10;
let protection = 0;
let img;
let nombre = []
let ubicacion = [];

//Rain
let drops  = [];
let axisY = 1;
let axisX = 0;
let c1, c2;

function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight, P2D)
  cnv.style('display', 'block')
  img = loadImage('../img/about.svg');

  readJSON();
  setInterval(readJSON,1001 * 60)

  for(let i = 0;i < numTweets;i++){
    frases[i] = new Tweets();
  }

  //Lluvia
  for(let i=0; i<300; i++){
    drops[i] = new Drop();
  }
  c1 = color(30, 30, 50);
  c2 = color(0, 150);
}


function readJSON() {
  data = loadJSON('../tweets.json', gotData);
}

function gotData(data) {
  for (let i = 0; i < data.statuses.length; i++) {
    nombre.push(data.statuses[i].user.name)
    ubicacion.push(data.statuses[i].user.location)
    tweets.push(data.statuses[i].text)
  }

  for(let i = 0;i < numTweets;i++){
    frases[i] = new Tweets();
  }
}



function draw() {
  //Lluvia
  setGradient(0, 0, width, height/2, c2, c1, axisY);
  setGradient(0, height/2, width, height, c1, c2, axisY);

  if(mouseX > width-40 && mouseX < width && mouseY > height-40 && mouseY < height){
    tint(100,50,255)
  } else {
    tint(255)
  }

  image(img, width-40, height-40, 1000, 1000);

  for(let i=0; i<drops.length; i++){
    drops[i].show();
    drops[i].move();
  }

  frameRate(60);

  for(let i = 0;i < numTweets;i++){
    frases[i].fall()
    frases[i].show()

    let overlapping = false;

    for(let other of frases){
      if(frases[i] !== other && frases[i].intersects(other)){
        overlapping = true
        protection++;
      }
    }

    if(overlapping){
      frases[i] = new Tweets();
    }

    if(frases[i].y > height - 1){
      frases[i] = new Tweets();
    }

    if(
      mouseX >= frases[i].x &&
      mouseX <= frases[i].x + 200 &&
      mouseY >= frases[i].y &&
      mouseY <= frases[i].y + 200 &&
      typeof frases != "undefined" && frases.length > 0
    ){
      frases[i].col = color(255)
      frases[i].ySpeed = 0
      frases[i].letra = 16
      text(nombre[i],frases[i].x + 100,frases[i].y + 190)
      text(ubicacion[i],frases[i].x + 100,frases[i].y + 220)
      //console.log(data.statuses[i].user.name)
    } else {
      frases[i].col = color(150)
      frases[i].ySpeed = 1
      frases[i].letra = 15
    }

    // Se trabo?
    if (protection > 2000) {
      //console.log("Me jui")
      break;
    }
  }
}

function setGradient(x, y, w, h, c1, c2, axis){
  noFill();
  if(axis == axisY){
	for(let i = y; i <= y+h; i++){
	  let inter = map(i, y, y+h, 0, 1);
	  let c = lerpColor(c1, c2, inter);
	  stroke(c);
	  line(x, i, x+w, i);
	}
  }
}

class Tweets{

  constructor(){
    this.selectedTweet = random(tweets);
    this.x = constrain(random(width),0,width - 200)
    this.y = random(-600,-10)
    this.ySpeed = 1
    this.col = color(150)
    this.letra = 15
  }

  fall(){
    this.y = this.y + this.ySpeed
  }

  show(){
    noStroke()
    fill(this.col)
    textSize(this.letra)
    textAlign(CENTER, CENTER)
    text(this.selectedTweet, this.x, this.y,200,200)
  }

  intersects(other) {
   let d = dist(this.x, this.y, other.x, other.y);
   return d < 200;
 }
}


//Lluvia
function Drop(){
//display drops
	this.x = random(0,width);
	this.y = random(-10, height);
	this.d = 2;
	this.h = random(2, 10);
	this.col= map(this.h, 2, 10, 100, 255);

	this.show = function(){
		noStroke();
		fill(this.col,100);
		ellipse(this.x, this.y, this.d, this.h);
	}

//move object
	this.vel = 0;
	this.grv = map(this.h,2,10,3,10);
	this.off = map(this.h,2,10,height/2,height);

	this.move = function(){
		this.y += this.vel;
		this.vel = this.grv;
		if(this.y > this.off){
			this.y = -10;
		}
	}
}

function mousePressed(){
  if(mouseX > width-40 && mouseX < width && mouseY > height-40 && mouseY < height){
    window.location.href = "../common/about.html";
  }
}
