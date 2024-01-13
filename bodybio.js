let img;
let particles = [];
const particleCount = 500; // Reduced number of particles

function preload() {
    img = loadImage('assets/images/andrewsim1.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    img.loadPixels();

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(255);
    image(img, 0, 0, width, height);

    // Update and display particles
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
        this.maxSpeed = 5; // Limiting the maximum speed
    }

    attractedTo(img) {
        let record = Infinity;
        let closestPixel;

        // Sample a subset of pixels
        for (let y = 0; y < img.height; y += 20) {
            for (let x = 0; x < img.width; x += 20) {
                let index = (x + y * img.width) * 4;
                let brightness = (img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2]) / 3;

                if (brightness < record) {
                    record = brightness;
                    closestPixel = createVector(x, y);
                }
            }
        }

        let force = p5.Vector.sub(closestPixel, this.pos);
        force.setMag(0.1);
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed); // Limit the speed
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    show() {
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 2, 2);
    }
}
