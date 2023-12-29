let waveCount = 0;

function spawnAsteroid(asteroids, canvas) {
    const numAsteroids = Math.floor(Math.random() * 3 + 1);
    for (let i = 0; i < numAsteroids; i++) {
        const x = Math.random() * canvas.width;
        const radius = Math.random() * 20 + 10;
        const speed = 0.5 + 0.1 * waveCount; 

        const asteroid = new Asteroid(x, -radius, radius, speed);
        asteroids.push(asteroid);
    }
}

function updateSpawnTimer(spawnTimer, spawnInterval, asteroids, canvas) {
    spawnTimer += 16;
    if (spawnTimer >= spawnInterval) {
        spawnAsteroid(asteroids, canvas);
        spawnTimer = 0;
        waveCount++;
    }

    return spawnTimer;
}
