let img1, img2;
let particles = [];
let performanceLevel = 'high';
let particleCount;

function preload() {
    img1 = loadImage('assets/images/andrewsim1.png');
    img2 = loadImage('assets/images/andrewsim2.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    switch(performanceLevel) {
        case 'low': particleCount = 100; break;
        case 'medium': particleCount = 500; break;
        case 'high': particleCount = 1000; break;
    }
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0);
    let img = (frameCount % 300 < 150) ? img1 : img2;
    image(img, 0, 0, width, height);
    particles.forEach(particle => {
        particle.update();
        particle.show();
    });
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector();
        this.acc = createVector();
    }
    update() {
        let target = createVector(mouseX, mouseY);
        this.acc = p5.Vector.sub(target, this.pos);
        this.acc.setMag(0.1);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(5);
    }
    show() {
        noStroke();
        fill(255, 150, 0, 200); // Orange color with some transparency
        circle(this.pos.x, this.pos.y, 4); // Draw the particle
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
