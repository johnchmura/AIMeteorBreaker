function createGameCanvas(id, width, height) {
    const canvas = document.createElement('canvas');
    canvas.className = 'gameCanvas';
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    return canvas;
}

function initializeGameInstance(canvasId, playerX, playerY, playerWidth, playerHeight, playerSpeed, numAsteroids) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    const player = new Player(playerX, playerY, playerWidth, playerHeight, playerSpeed, canvas.width, canvas.height, "AI");
    const score = new Score(player);
    const lives = new Lives(player);
    const asteroids = [];
    
    
    const asteroidSpawner = new AsteroidSpawner(asteroids, canvas);

    return { canvas, ctx, player, score, lives, asteroids, paused: false, spawnTimer: 0, spawnInterval: 2000, numAsteroids, asteroidSpawner };
}

function animateGameInstance(gameInstance) {
    const { ctx, player, asteroids, paused, spawnTimer, spawnInterval, asteroidSpawner } = gameInstance;

    if (!paused) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        player.update(asteroids);
        player.draw(ctx);
        gameInstance.score.draw(ctx);
        gameInstance.lives.draw(ctx);

        for (let j = asteroids.length - 1; j >= 0; j--) {
            const asteroid = asteroids[j];
            asteroid.update();
            asteroid.draw(ctx);

            if (asteroid.y - asteroid.radius > ctx.canvas.height) {
                asteroids.splice(j, 1);
                if (player.subtractLife()) {
                    gameInstance.paused = true;
                }

                ctx.clearRect(0, 0, ctx.canvas.width, 100);
                gameInstance.lives.draw(ctx);
                gameInstance.score.draw(ctx);
            }
        }

        asteroidSpawner.updateSpawnTimer();
    }

    requestAnimationFrame(() => animateGameInstance(gameInstance));
}

function saveBestPlayerNetwork() {
    const bestPlayer = gameInstances.reduce((best, current) => {
        return current.player.points > best.player.points ? current : best;
    }, gameInstances[0]);

    console.log(bestPlayer.player.points)
    localStorage.setItem('bestPlayerNetwork', JSON.stringify(bestPlayer.player.brain));

    if(localStorage.getItem("score")){
        console.log(localStorage.getItem("score"));
        if(localStorage.getItem("score") < bestPlayer.player.points){
            localStorage.setItem('score',bestPlayer.player.points);
        }
    }else{
        localStorage.setItem('score',bestPlayer.player.points);
    }
   
}
function getGreatestScore() {
    const bestPlayer = gameInstances.reduce((best, current) => {
        return current.player.points > best.player.points ? current : best;
    }, gameInstances[0]);

    console.log(bestPlayer.player.points)
    
}

function discard() {
    localStorage.removeItem("bestPlayerNetwork");
}

const numGames = 100;
const gameInstances = [];

for (let i = 1; i <= numGames; i++) {
    const canvasId = "mainCanvas" + i;
    const canvas = createGameCanvas(canvasId, 500, 500);

    const gameInstance = initializeGameInstance(canvasId, 100, 475, 30, 50, 300, 3);
    gameInstances.push(gameInstance);
}

if (localStorage.getItem("bestPlayerNetwork")) {
    console.log("loaded");
    const bestBrain = JSON.parse(localStorage.getItem("bestPlayerNetwork"));
    gameInstances[0].player.brain = bestBrain;

    
    for (let i = 1; i < gameInstances.length; i++) {
        NeuralNetwork.mutate(gameInstances[i].player.brain, .10);
    }
}

gameInstances.forEach(gameInstance => animateGameInstance(gameInstance));
