export class Bird {
    public x: number;
    public y: number;
    public acceleration: number;
    public velocity: number;

    constructor(x: number, y: number, acceleration: number, velocity: number) {
        this.x = x;
        this.y = y;
        this.acceleration = acceleration;
        this.velocity = velocity;
    }
}