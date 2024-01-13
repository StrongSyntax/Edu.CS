let particles = [];
const particleCount = 100; // Adjust the number of particles

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(255);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.update();
        p.edges();
        p.show();
    }
}

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0); // Reset acceleration each frame
    }

    edges() {
        if (this.pos.x > width || this.pos.x < 0) {
            this.vel.x *= -1;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.vel.y *= -1;
        }
    }

    show() {
        let speed = this.vel.mag();
        let color = map(speed, 0, 5, 255, 0); // Map speed to color
        fill(color, 0, 0); // Red intensity based on speed
        noStroke();
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }
}
