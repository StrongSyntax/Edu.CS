let particles = [];
const particleCount = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(255);

    for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < particles.length; j++) {
            if (i !== j) {
                particles[i].repel(particles[j]);
            }
        }
    }

    for (let particle of particles) {
        particle.update();
        particle.edges();
        particle.show();
    }
}

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(3));
        this.acc = createVector();
    }

    repel(other) {
        let force = p5.Vector.sub(this.pos, other.pos);
        let distance = force.mag();
        distance = constrain(distance, 5, 50); // Limiting the distance to eliminate extreme results
        let strength = -5 / (distance * distance); // Repulsion
        force.setMag(strength);
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
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
