class Player {
    constructor(x, y, width, height,shootCooldown,canvasWidth,canvasHeight) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.projectiles = [];

        this.shootCooldown = shootCooldown;
        this.remainingCooldown = 0;

        this.points = 0;
        this.lives = 3;

        this.sensor=new Sensor(this,canvasWidth,canvasHeight);
        this.controls = new Controls();
    }

    update(asteroids) {
        this.#move();
        this.#shoot();
        this.#updateProjectiles(asteroids);
        this.sensor.update(asteroids);
        this.#updateCooldown();
    }


    subtractLife() {

        this.lives--;

        if (this.lives === 0) {
            paused = true;
        }

    }

    #move() {
        if (this.controls.left && this.x - this.width / 2 > 0) {
            this.x -= 6;
        }

        
        if (this.controls.right && this.x + this.width / 2 < this.canvasWidth) {
            this.x += 6;
        }
    }

    #shoot() {
        if (this.controls.up && this.remainingCooldown <= 0) {
            const projectile = new Projectile(this.x, this.y - this.height / 2, 8);
            this.projectiles.push(projectile);
            this.remainingCooldown = this.shootCooldown;
        }
    }

    #updateProjectiles(asteroids) {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            if (projectile.update(asteroids)) {
                this.points += 10;
                this.projectiles.splice(i, 1);
            }
    
            if (projectile.y + projectile.radius < -1000) {
                this.projectiles.splice(i, 1);
            }
        }
    }

    #updateCooldown() {
        if (this.remainingCooldown > 0) {
            this.remainingCooldown -= 16; 
        }
    }

    draw(ctx) {
        ctx.save();
        this.sensor.draw(ctx);
        this.projectiles.forEach((projectile) => {
            projectile.draw(ctx);
        });

        ctx.translate(this.x, this.y);


        ctx.beginPath();
        ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.fill();

        
        
        ctx.restore();

        
    }
}
