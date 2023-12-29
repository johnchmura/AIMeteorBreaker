class Sensor {
    constructor(player) {
        this.player = player;
        this.rayCount = 5;
        this.rayLength = 500;
        this.raySpread = Math.PI / 2;

        this.rays = [];
        this.readings = [];
    }

    update(asteroids) {
        this.castRays();
        this.readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.getReading(this.rays[i], asteroids)
            );

        }
    }

    getReading(ray, asteroids) {

        let touches = [];
        
        for (let i = 0; i < asteroids.length; i++) {
            const asteroid = asteroids[i];
            
            const touch = getIntersection(
                ray[0],
                ray[1],
                { x: asteroid.x - asteroid.radius, y: asteroid.y - asteroid.radius },
                { x: asteroid.x + asteroid.radius, y: asteroid.y + asteroid.radius }
            );
            
            if (touch) {
                touches.push(touch);
            }
        }

        if (touches.length == 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset == minOffset);
        }
    }

    castRays() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {

            const rayAngle = lerp(
                this.raySpread / 1.75,
                -this.raySpread / 1.75,
                this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
            );
            
            const start = { x: this.player.x, y: this.player.y };
            const end = {
                x: this.player.x - Math.sin(rayAngle) * this.rayLength,
                y: this.player.y - Math.cos(rayAngle) * this.rayLength
            };

            this.rays.push([start, end]);
        }
    }

    draw(ctx){
        for(let i=0;i<this.rayCount;i++){
            let end=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        }
    }        
}
