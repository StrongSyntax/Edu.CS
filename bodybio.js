let img;
let particles = [];
const particleCount = 500; // Number of particles

function preload() {
    img = loadImage('assets/images/andrewsim1.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    img.loadPixels();
    console.log('Image loaded:', img);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(255);
    image(img, 0, 0, width, height); // Draw the image first

    // Draw the particles on top of the image
    for (let p of particles) {
        p.attractedTo(img);
        p.update();
        p.show();
    }
}

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.maxSpeed = 5;
    }

    attractedTo(img) {
        let closestPixel = null;
        let record = Infinity;

        // Sample a subset of pixels around the particle
        let scanRadius = 50; // Define a scan radius
        for (let y = this.pos.y - scanRadius; y < this.pos.y + scanRadius; y += 10) {
            for (let x = this.pos.x - scanRadius; x < this.pos.x + scanRadius; x += 10) {
                if (x >= 0 && x < img.width && y >= 0 && y < img.height) {
                    let index = (x + y * img.width) * 4;
                    let brightness = (img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2]) / 3;

                    if (brightness < record) {
                        record = brightness;
                        closestPixel = createVector(x, y);
                    }
                }
            }
        }

        if (closestPixel) {
            let force = p5.Vector.sub(closestPixel, this.pos);
            force.setMag(0.1);
            this.acc.add(force);
        }
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 2, 2);
    }
}
