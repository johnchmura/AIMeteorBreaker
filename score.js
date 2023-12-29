class Score {
    constructor(player) {
        this.player = player;
    }

    draw(ctx) {
        ctx.save();

        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        
        const scoreText = `Score: ${this.player.points}`;
        ctx.fillText(scoreText, this.player.canvasWidth - 100, 30);

        ctx.restore();
    }
}
