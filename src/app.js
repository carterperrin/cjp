import Particle from './particle';

const TOTAL_PARTICLES = 20;
const COLORS = [
  { r: 255, g: 190, b: 11 },
  { r: 131, g: 56, b: 236 },
  { r: 251, g: 86, b: 7 },
  { r: 255, g: 0, b: 110 },
  { r: 58, g: 134, b: 255 },
];
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const { height, width } = canvas;
let particles = [];

const createParticles = () => {
  const maxRadius = 250;
  const minRadius = 75;
  let curColor = 0;
  particles = [];

  for (let i = 0; i < TOTAL_PARTICLES; i++) {
    const particle = new Particle({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (maxRadius - minRadius) + minRadius,
      rgb: COLORS[curColor],
    });

    if (++curColor >= COLORS.length) {
      curColor = 0;
    }
    particles[i] = particle;
  }
};

const draw = () => {
  if (!particles.length) {
    createParticles();
  }

  for (let particle of particles) {
    particle.animate({ context, width, height });
  }
};

setInterval(draw, 45);
