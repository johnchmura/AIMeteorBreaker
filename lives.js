class Lives {
    constructor(player) {
        this.player = player;
    }

    draw(ctx) {
        ctx.save();

        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        
        const livesText = `Lives: ${this.player.lives}`;
        ctx.fillText(livesText, this.player.canvasWidth - 100, 50);

        ctx.restore();
    }
}
