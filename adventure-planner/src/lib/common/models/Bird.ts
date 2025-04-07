import { v4 as uuidv4 } from 'uuid';

export class Bird {
    public id: string;
    public x: number;
    public y: number;
    public vx: number;
    public vy: number;
    public direction: number; //in radians

    constructor(x: number, y: number, vx: number, vy: number, direction: number) {
        this.id = uuidv4();
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.direction = direction;
    }
}