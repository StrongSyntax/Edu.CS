let boids = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 30; i++) {
        boids.push(new Boid());
    }
}

function draw() {
    background(255);
    for (let boid of boids) {
        boid.edges();
        boid.flock(boids);
        boid.update();
        boid.show();
    }
}


class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 1;
        this.maxSpeed = 4;
    }

    edges() {
        if (this.position.x > width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = height;
    }

    flock(boids) {
        // Access HTML sliders
        let alignmentValue = document.querySelector(".alignment-slider").value;
        let cohesionValue = document.querySelector(".cohesion-slider").value;
        let separationValue = document.querySelector(".separation-slider").value;
    
        let alignment = createVector();
        let cohesion = createVector();
        let separation = createVector();
        let total = 0;
        let perceptionRadius = 50;
    
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                alignment.add(other.velocity);
                cohesion.add(other.position);
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d * d);
                separation.add(diff);
                total++;
            }
        }
    
        if (total > 0) {
            alignment.div(total).setMag(this.maxSpeed).sub(this.velocity).limit(this.maxForce);
            cohesion.div(total).sub(this.position).setMag(this.maxSpeed).sub(this.velocity).limit(this.maxForce);
            separation.div(total).setMag(this.maxSpeed).sub(this.velocity).limit(this.maxForce);
    
            // Apply HTML slider values
            alignment.mult(parseFloat(alignmentValue));
            cohesion.mult(parseFloat(cohesionValue));
            separation.mult(parseFloat(separationValue));
        }
    
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }
    

    align(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other != this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other != this && d < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d * d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    show() {
        strokeWeight(8);
        stroke(0);
        point(this.position.x, this.position.y);
    }
}
