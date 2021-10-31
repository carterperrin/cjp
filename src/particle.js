const PI2 = Math.PI * 2;

export default class Particle {
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
    } else if (this.x >= width) {
      this.vx *= -1;
      this.x -= 10;
    }

    if (this.y < 0) {
      this.vy *= -1;
      this.y += 10;
    } else if (this.y >= height) {
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
