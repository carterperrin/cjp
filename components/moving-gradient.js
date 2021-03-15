import React from 'react';

import Canvas from './canvas';

const PI2 = Math.PI * 2;
const TOTAL_PARTICLES = 15;
const MIN_RADIUS = 800;
const MAX_RADIUS = 300;
const COLORS = [
  { r: 45, g: 75, b: 277 }, // blue
  { r: 250, g: 255, b: 89 }, // yellow
  { r: 255, g: 104, b: 248 }, // purple
  { r: 44, g: 209, b: 252 }, // sky blue
  { r: 54, g: 233, b: 84 }, // green
  { r: 255, g: 192, b: 203 }, // pink
];

class Particle {
  constructor({ x, y, radius, rgb, speed = 10 }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rgb = rgb;
    this.vx = Math.random() * speed;
    this.vy = Math.random() * speed;
    this.sinValue = Math.random();
  }

  animate({ context, width, height }) {
    this.sinValue += 0.01;
    this.radius += Math.sin(this.sinValue);
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.vx *= -1;
      this.x += 10;
    } else if (this.x > width) {
      this.vx *= -1;
      this.x -= 10;
    }

    if (this.y < 0) {
      this.vy *= -1;
      this.y += 10;
    } else if (this.y > height) {
      this.vy *= -1;
      this.y -= 10;
    }

    context.beginPath();

    const gradient = context.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.01,
      this.x,
      this.y,
      this.radius
    );
    gradient.addColorStop(
      0,
      `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`
    );
    gradient.addColorStop(
      1,
      `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0)`
    );

    context.fillStyle = gradient;
    context.arc(this.x, this.y, this.radius, 0, PI2, false);
    context.fill();
  }
}

export default function MovingGradient({ children }) {
  let particles = [];

  const createParticles = ({ width, height, speed }) => {
    let curColor = 0;
    particles = [];

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const particle = new Particle({
        x: Math.random() * height,
        y: Math.random() * width,
        radius: Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS,
        rgb: COLORS[curColor],
        speed,
      });

      if (++curColor >= COLORS.length) {
        curColor = 0;
      }
      particles[i] = particle;
    }
  };

  const draw = ({ context, width, height }) => {
    if (!particles.length) {
      const speed = window.screen.width > 600 ? 10 : 2;
      createParticles({ width, height, speed });
    }

    for (let particle of particles) {
      particle.animate({ context, width, height });
    }
  };

  return <Canvas draw={draw} />;
}
