let img;
let particles = [];
let attractionPoints = [];

function preload() {
    // Preload the image
    img = loadImage('assets/images/andrewsim1.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    img.loadPixels();
    processImage();
    img.updatePixels();

    // Initialize particles
    for (let i = 0; i < 1000; i++) { // You can adjust the number of particles
        particles.push(new Particle(random(width), random(height)));
    }
}
  
function draw() {
    background(255);
    image(img, 0, 0, width, height);

    // Update and display particles
    for (let p of particles) {
        p.attractedTo(img); // Attract particles to darker areas
        p.update();
        p.show();
    }
}
  
  function processImage() {
    for (let i = 0; i < img.pixels.length; i += 4) {
      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];
  
      // Calculate brightness manually
      let brightness = (r + g + b) / 3;
      
      if (brightness < 50) {
        // Adjust color based on brightness
        img.pixels[i] = 255 - brightness; // Red channel
        img.pixels[i + 1] = 0; // Green channel
        img.pixels[i + 2] = brightness; // Blue channel
      }
    }
  }

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
    }

    attractedTo(img) {
        // Get the image pixels
        img.loadPixels();
        let record = Infinity;
        let closestPixel;
    
        // Iterate over a subset of pixels for performance
        for (let y = 0; y < img.height; y += 10) {
            for (let x = 0; x < img.width; x += 10) {
                let index = (x + y * img.width) * 4;
                let r = img.pixels[index];
                let g = img.pixels[index + 1];
                let b = img.pixels[index + 2];
                let brightness = (r + g + b) / 3;
    
                // Check if this pixel is darker than the current record
                if (brightness < record) {
                    record = brightness;
                    closestPixel = createVector(x, y);
                }
            }
        }
    
        // Create a force vector towards the closest dark pixel
        let force = p5.Vector.sub(closestPixel, this.pos);
        force.setMag(0.1); // You can adjust the strength
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0); // Reset acceleration
    }

    show() {
        fill(255); // White color
        noStroke();
        ellipse(this.pos.x, this.pos.y, 2, 2); // Small circle for each particle
    }
}