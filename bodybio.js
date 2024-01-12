let images = []; // Array to hold images
let currentImage = 0; // Index of the current image
let particles = []; // Array to hold particles

function preload() {
    // Load images of Andrew Neiman
    images.push(loadImage('path/to/image1.jpg'));
    images.push(loadImage('path/to/image2.jpg'));
    // ... load more images
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Initialize particles
    for (let i = 0; i < 1000; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(255);

    // Switch images every few seconds
    if (frameCount % 300 === 0) {
        currentImage = (currentImage + 1) % images.length;
    }

    image(images[currentImage], 0, 0, width, height);

    // Update and display particles
    for (let p of particles) {
        p.attractedTo(images[currentImage]); // Implement this method based on image analysis
        p.update();
        p.show();
    }
}

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
    }

    attractedTo(img) {
        // Analyze the image and update acceleration towards darker spots
        // This is a simplified placeholder
        let target = createVector(random(width), random(height));
        let force = p5.Vector.sub(target, this.pos);
        force.setMag(0.1);
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        stroke(0);
        point(this.pos.x, this.pos.y);
    }
}
