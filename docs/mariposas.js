const canvas = document.getElementById('leaves-canvas');
const ctx = canvas.getContext('2d');
let leaves = [];


function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// imágenes de mariposas
const butterflyImageSets = {
  blue: [],
  red: [],
  yellow: []
};

const imagePaths = {
  blue: [
    './marg1.png',
    './marg2.png',
    './marg3.png'
  ],
  red: [
    './marb1.png',
    './marb2.png',
    './marb3.png'
  ],
  yellow: [
    './marr1.png',
    './marr2.png',
    './marr3.png'
  ]
};

let totalImagesToLoad = 9;
let loadedCount = 0;


for (const color in imagePaths) {
  imagePaths[color].forEach((src, i) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      butterflyImageSets[color][i] = img;
      loadedCount++;
      if (loadedCount === totalImagesToLoad) {
        animate();
      }
    };
  });
}


function Butterfly() {
  const colors = ['blue', 'red', 'yellow'];
  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.images = butterflyImageSets[this.color];

  this.direction = Math.random() < 0.5 ? 'left' : 'right';
  this.y = Math.random() * canvas.height;
  this.x = this.direction === 'left' ? -50 : canvas.width + 50;
  this.size = 30 + Math.random() * 30;
  this.speed = 0.5 + Math.random() * 1.5;
  this.frame = 0;
  this.frameCounter = 0;
  this.frameDelay = 6 + Math.floor(Math.random() * 5);
  this.swing = Math.random() * 2 + 1;
  this.swingSpeed = Math.random() * 0.05 + 0.01;
  this.opacity = 0.8; 
}


function drawButterfly(butterfly) {
  ctx.save();
  ctx.translate(butterfly.x, butterfly.y);

 
  if (butterfly.direction === 'right') {
    ctx.scale(-1, 1);
  }

  ctx.globalAlpha = butterfly.opacity;

  const img = butterfly.images[butterfly.frame];
  ctx.drawImage(
    img,
    -butterfly.size / 2,
    -butterfly.size / 2,
    butterfly.size,
    butterfly.size
  );
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

 
  if (leaves.length < 20 && Math.random() < 0.3) {
    leaves.push(new Butterfly());
  }

  leaves.forEach(butterfly => {
 
    butterfly.x += butterfly.direction === 'left' ? butterfly.speed : -butterfly.speed;

    butterfly.y += Math.sin(Date.now() * butterfly.swingSpeed) * butterfly.swing;

    butterfly.frameCounter++;
    if (butterfly.frameCounter >= butterfly.frameDelay) {
      butterfly.frame = (butterfly.frame + 1) % butterfly.images.length;
      butterfly.frameCounter = 0;
    }

    drawButterfly(butterfly);
  });

  leaves = leaves.filter(b => b.x > -100 && b.x < canvas.width + 100);

  requestAnimationFrame(animate);
}
