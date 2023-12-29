const canvas = document.getElementById("mainCanvas");
canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext("2d");
const player = new Player(100, 475, 30, 50, 450, canvas.width, canvas.height);
const score = new Score(player);
const lives = new Lives(player);
const asteroids = [];

let paused = false;
let spawnTimer = 0;
const spawnInterval = 2000;

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        paused = !paused;
    }
});

animate();

function animate() {
    if (!paused) {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        player.update(asteroids);
        player.draw(ctx);
        score.draw(ctx);
        lives.draw(ctx);

        for (let i = asteroids.length - 1; i >= 0; i--) {
            const asteroid = asteroids[i];
            asteroid.update();
            asteroid.draw(ctx);

            if (asteroid.y - asteroid.radius > canvas.height) {
                asteroids.splice(i, 1);
                player.subtractLife();
            
                ctx.clearRect(0, 0, canvas.width, 100);
                lives.draw(ctx);
                score.draw(ctx);
            }
        }

        spawnTimer = updateSpawnTimer(spawnTimer, spawnInterval, asteroids, canvas);
    }

    requestAnimationFrame(animate);
}