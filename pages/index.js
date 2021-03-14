import Head from 'next/head';
import React from 'react';

import Canvas from '../components/canvas';
import styles from '../styles/Home.module.css';

const PI2 = Math.PI * 2;
const COLORS = [
  { r: 45, g: 75, b: 277 }, // blue
  { r: 250, g: 255, b: 89 }, // yellow
  { r: 255, g: 104, b: 248 }, // purple
  { r: 44, g: 209, b: 252 }, // sky blue
  { r: 54, g: 233, b: 84 }, // green
];

class Particle {
  constructor(x, y, radius, rgb) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rgb = rgb;
    this.vx = Math.random() * 4;
    this.vy = Math.random() * 4;
    this.sinValue = Math.random();
  }

  animate(ctx, width, height) {
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

    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`;
    ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
    ctx.fill();
  }
}

// export default function Home() {
//   const canvasRef = React.useRef(null);
//   const totalParticles = 1;
//   let particles = [];
//   const maxRadius = 90;
//   const minRadius = 40;

//   React.useEffect(() => {
//     const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     canvas.width = document.body.clientWidth * pixelRatio;
//     canvas.height = document.body.clientHeight * pixelRatio;
//     ctx.scale(pixelRatio, pixelRatio);
//     createParticles(ctx);
//   }, []);

//   function createParticles(ctx) {
//     let curColor = 0;
//     particles = [];

//     for (let i = 0; i < totalParticles; i++) {
//       const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
//       const stageWidth = document.body.clientWidth * pixelRatio;
//       const stageHeight = document.body.clientHeight * pixelRatio;
//       const particle = new Particle(
//         Math.random() * stageWidth,
//         Math.random() * stageHeight,
//         Math.random() * (maxRadius - minRadius) + minRadius,
//         COLORS[curColor]
//       );

//       if (++curColor >= COLORS.length) {
//         curColor = 0;
//       }
//       particles[i] = particle;
//     }
//     animate(ctx);
//   }

//   function animate(ctx) {
//     const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
//     const stageWidth = document.body.clientWidth * pixelRatio;
//     const stageHeight = document.body.clientHeight * pixelRatio;
//     window.requestAnimationFrame(animate);
//     ctx.clearRect(0, 0, stageWidth, stageWidth);

//     for (let i = 0; i < totalParticles; i++) {
//       const particle = particles[i];
//       particle.animate(ctx, stageWidth, stageHeight);
//     }
//   }

//   return (
//     <canvas ref={canvasRef}></canvas>

//     // <div className={styles.container}>
//     //   <Head>
//     //     <title>Carter Perrin</title>
//     //     <link rel="icon" href="/favicon.ico" />
//     //   </Head>

//     //   <main className={styles.main}>
//     //     <h1 className={styles.title}>CARTER PERRIN</h1>
//     //   </main>
//     // </div>
//   );
// }

const TOTAL_PARTICLES = 4;
const MIN_RADIUS = 90;
const MAX_RADIUS = 40;

export default function Home() {
  let particles = [];

  const createParticles = (width, height) => {
    let curColor = 0;
    particles = [];

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const particle = new Particle(
        Math.random() * height,
        Math.random() * width,
        Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS,
        COLORS[curColor]
      );

      if (++curColor > COLORS.length) {
        curColor = 0;
      }
      particles[i] = particle;
    }
  };

  const draw = (ctx, width, height, frameCount) => {
    // ctx.fillStyle = '#ffc0cb';
    // ctx.beginPath();
    // ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    // ctx.fill();
    if (!particles.length) {
      createParticles(width, height);
    }

    for (let particle of particles) {
      particle.animate(ctx, width, height);
    }
    // for (let i = 0; i < TOTAL_PARTICLES; i++) {
    //   const particle = particles[i];
    //   particle.animate(ctx, width, height);
    // }
  };

  return <Canvas draw={draw} />;
}
