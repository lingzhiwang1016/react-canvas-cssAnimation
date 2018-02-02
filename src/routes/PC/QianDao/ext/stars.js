/* eslint-disable */
export default function (canvasId, speed = 3, growSpeed = 0.003, numPoints = 500) {
  const oCanvas = document.getElementById(canvasId);
  var cxt = null;
  var particles = {};
  var particleIndex = 0;

  if (oCanvas.getContext) {
    cxt = oCanvas.getContext('2d');
  }

  oCanvas.width = window.innerWidth;
  oCanvas.height = window.innerHeight;

  function Particle() {
    particleIndex++;
    particles[particleIndex] = this;

    this.x = oCanvas.width / 2;
    this.y = oCanvas.height / 2;
    this.vx = Math.random() * speed - speed * 0.5;
    this.vy = Math.random() * speed - speed * 0.5;
    this.growth = (Math.abs(this.vx) + Math.abs(this.vy)) * growSpeed; // 根据x/y轴的位置决定大小
    this.id = particleIndex;
    this.size = 0;
    this.color = "#fff";
  };

  Particle.prototype.draw = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.size += this.growth;

    if (this.x < 0 || this.x > oCanvas.width || this.y < 0 || this.y > oCanvas.height) {
      delete particles[this.id];
    }

    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    cxt.fill();
  };

  function animate() {
    requestAnimationFrame(animate);

    cxt.clearRect(0, 0, oCanvas.width, oCanvas.height);
    cxt.fillStyle = 'rgba(255, 255, 255, 0)';
    cxt.fillRect(0, 0, oCanvas.width, oCanvas.height);

    new Particle();

    for (var i in particles) {
      particles[i].draw();
    }
  };
  for (let i = 0; i < numPoints; i++) {
    new Particle();
  }
  requestAnimationFrame(animate);
}
