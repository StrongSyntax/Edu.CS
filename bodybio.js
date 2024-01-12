let img;
let particles = [];
let attractionPoints = [];

function preload() {
    // Preload the image
    img = loadImage('assets/images/andrewsim1.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Call the processImage function when setup runs
    img.loadPixels();
    processImage();
    img.updatePixels();
  }
  
  function draw() {
    // Render the processed image
    background(255);
    image(img, 0, 0, width, height);
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

    attractedToClosest(points) {
        // Find the closest point of attraction
        let closestPoint;
        let recordDistance = Infinity;
        for (let point of points) {
            let d = p5.Vector.dist(this.pos, point);
            if (d < recordDistance) {
                recordDistance = d;
                closestPoint = point;
            }
        }

        // Calculate the attraction force towards that point
        let force = p5.Vector.sub(closestPoint, this.pos);
        let strength = 5 / (force.mag() + 1); // Example force calculation
        force.setMag(strength);
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0); // Reset acceleration
    }

    show() {
        stroke(0);
        point(this.pos.x, this.pos.y);
    }
}