window.onload = function() {
  var canvas = document.getElementById("canvas"),
      c = canvas.getContext("2d");
  canvas.width = this.innerWidth - 20;
  canvas.height = this.innerHeight - 20;
  var numOfFireworks = 0,
      fireworksArray = [],
      maxFireworks = 10,
      boomArray = [],
      maxBoom = 10,
      numOfBoom = 0,
      lastPosX,
      lastPosY;

  function Firework() {
    this.x = Math.floor(Math.random() * canvas.width + 1);
    this.y = canvas.height;
    this.vx = Math.random() * 5 + 1;
    this.vy = Math.random() * 20 + 5;
    numOfFireworks++;
    fireworksArray[numOfFireworks] = this;
    this.id = numOfFireworks;
  }

  Firework.prototype.draw = function() {
    this.x += this.vx;
    this.y -= this.vy;
    if(Math.random() > 0.40)
      this.vx -= Math.random();
    else
      this.vx += Math.random();
    c.fillStyle = 'rgb(255, 200, 78)';
    DrawRect(this.x, this.y, 10, 10);
    if(this.y <= 0)
      delete fireworksArray[this.id];

    if(this.y <= Math.random() * 300 - 0) {
      lastPosX = this.x;
      lastPosY = this.y;
      delete fireworksArray[this.id];
      for(var x = 0; x < Math.random() * 50 + 10; x++) {
        new Boom();
      }
    }

    if(this.x >= canvas.width)
      this.vx = -this.vx;
    else if(this.x <= 0)
      this.vx = +this.vx;
  };

  function Boom() {
    this.x = lastPosX;
    this.y = lastPosY;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    numOfBoom++;
    boomArray[numOfBoom] = this;
    this.id = numOfBoom;
    this.age = 0;
    this.maxAge = Math.random() * 100 - 20;
  }

  Boom.prototype.draw = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1;
    c.fillStyle = RandomColor();
    DrawRect(this.x, this.y, 10, 10);
    this.age++;
    if(this.age >= this.maxAge)
      delete boomArray[this.id];
  };

  document.onclick = function() {
    new Firework();
  };

  setInterval(Update, 20);

  function Update() {
    ClearCanvas();
    for(var i in fireworksArray) {
      fireworksArray[i].draw();
    }
    for(var j in boomArray) {
      boomArray[j].draw();
    }
  }

//Helper functions

function ClearCanvas() {
  c.fillStyle = "rgba(0,0,0,0.5)";
  c.fillRect(0,0,canvas.width,canvas.height);
}

function DrawRect(x, y, w, h) {
  return c.fillRect(x, y, w, h);
}

function RandomColor() {
    var r1 = Math.floor(Math.random() * 360 + 0),
      r2 = Math.floor(Math.random() * 255 + 0),
      r3 = Math.floor(Math.random() * 255 + 0);
    return 'rgb(' + r1 + ',' + r2 + ',' + r3 + ')';
  }
};
