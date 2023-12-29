
class AsteroidSpawner {
    constructor(asteroids, canvas) {
        this.asteroids = asteroids;
        this.canvas = canvas;
        this.waveCount = 0;
        this.spawnTimer = 0;
        this.spawnInterval = 2000;
    }

    spawnAsteroid() {
        const numAsteroids = Math.floor(Math.random() * 3 + 1);
        for (let i = 0; i < numAsteroids; i++) {
            const x = Math.random() * this.canvas.width;
            const radius = Math.random() * 20 + 10;
            const speed = 0.5 + 0.1 * this.waveCount;

            const asteroid = new Asteroid(x, -radius, radius, speed);
            this.asteroids.push(asteroid);
        }
    }

    updateSpawnTimer() {
        this.spawnTimer += 16;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnAsteroid();
            this.spawnTimer = 0;
            this.waveCount++;
        }
    }
}
