let shapes = [];
let falling = [];
let waves = [];
let triangles = [];
let extras = [];
let palette = ["#DF80D1", "#B772FF", "#000000"];
let myFont;

function preload() {
  // Fuente cargada desde HTML con <link>
  myFont = "Special Gothic";
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0); 
  cnv.style("display", "block"); 
  noCursor();
  textAlign(CENTER, CENTER);
  textFont(myFont);
}

function draw() {
  background(255); 
  let t = frameCount;

  // --- Estela que sigue al mouse ---
  if (t % 2 === 0) {
    shapes.push(new MorphShape(mouseX, mouseY, random(palette)));
  }
  for (let i = shapes.length - 1; i >= 0; i--) {
    shapes[i].update();
    shapes[i].show();
    if (shapes[i].finished()) shapes.splice(i, 1);
  }

  // --- Figuras que caen ---
  if (t % 15 === 0) {
    falling.push(new FallingShape(random(width), -20, random(palette)));
  }
  for (let i = falling.length - 1; i >= 0; i--) {
    falling[i].update();
    falling[i].show();
    if (falling[i].finished()) falling.splice(i, 1);
  }

  // --- Triángulos que giran ---
  if (t % 40 === 0) {
    triangles.push(new SpinningTriangle(random(width), -30, random(palette)));
  }
  for (let i = triangles.length - 1; i >= 0; i--) {
    triangles[i].update();
    triangles[i].show();
    if (triangles[i].finished()) triangles.splice(i, 1);
  }

  // --- Ondas concéntricas ---
  if (t % 60 === 0) {
    waves.push(new Wave(random(width), random(height), random(palette)));
  }
  for (let i = waves.length - 1; i >= 0; i--) {
    waves[i].update();
    waves[i].show();
    if (waves[i].finished()) waves.splice(i, 1);
  }

  // --- Figuras extra ---
  if (t % 120 === 0) {
    extras.push(new ExtraCircle(random(width), random(height), random(palette)));
  }
  for (let i = extras.length - 1; i >= 0; i--) {
    extras[i].update();
    extras[i].show();
    if (extras[i].finished()) extras.splice(i, 1);
  }

  // --- TEXTO CENTRAL ---
  push();
  noStroke();
  fill("#000000");
  textSize(50);
  text("Diseño que inspira", width / 2, height / 2);
  pop();
}

// --- Clases ---
class MorphShape {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = color(c);
    this.size = random(10, 30);
    this.alpha = 255;
    this.t = 0;
  }
  update() {
    this.size += 0.5;
    this.alpha -= 3;
    this.t += 0.05;
  }
  finished() {
    return this.alpha <= 0;
  }
  show() {
    noStroke();
    fill(red(this.c), green(this.c), blue(this.c), this.alpha);
    let r = map(sin(this.t), -1, 1, 0, this.size / 2);
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size, r);
  }
}

class FallingShape {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = color(c);
    this.size = random(15, 30);
    this.alpha = 255;
    this.speed = random(1, 3);
    this.t = random(TWO_PI);
  }
  update() {
    this.y += this.speed;
    this.t += 0.05;
    this.alpha -= 2;
  }
  finished() {
    return this.alpha <= 0 || this.y > height + this.size;
  }
  show() {
    noStroke();
    fill(red(this.c), green(this.c), blue(this.c), this.alpha);
    let r = map(sin(this.t), -1, 1, 0, this.size / 2);
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size, r);
  }
}

class SpinningTriangle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = color(c);
    this.size = random(20, 35);
    this.alpha = 255;
    this.speed = random(1, 2);
    this.angle = random(TWO_PI);
    this.rotationSpeed = random(-0.05, 0.05);
  }
  update() {
    this.y += this.speed;
    this.alpha -= 2;
    this.angle += this.rotationSpeed;
  }
  finished() {
    return this.alpha <= 0 || this.y > height + this.size;
  }
  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(red(this.c), green(this.c), blue(this.c), this.alpha);
    triangle(
      -this.size / 2, this.size / 2,
      this.size / 2, this.size / 2,
      0, -this.size / 2
    );
    pop();
  }
}

class Wave {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = color(c);
    this.r = 10;
    this.alpha = 200;
  }
  update() {
    this.r += 2;
    this.alpha -= 3;
  }
  finished() {
    return this.alpha <= 0;
  }
  show() {
    noFill();
    stroke(red(this.c), green(this.c), blue(this.c), this.alpha);
    strokeWeight(2);
    ellipse(this.x, this.y, this.r * 2);
  }
}

// Figura extra: círculos que se expanden
class ExtraCircle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = color(c);
    this.r = random(10, 30);
    this.alpha = 220;
  }
  update() {
    this.r += 1.5;
    this.alpha -= 2;
  }
  finished() {
    return this.alpha <= 0;
  }
  show() {
    noFill();
    stroke(red(this.c), green(this.c), blue(this.c), this.alpha);
    strokeWeight(3);
    ellipse(this.x, this.y, this.r * 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
