export class Bird {
    public x: number;
    public y: number;
    public vx: number;
    public vy: number;
    public direction: number; //in radians

    constructor(x: number, y: number, vx: number, vy: number, direction: number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.direction = direction;
    }
}