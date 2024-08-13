export class Cell {
    public x: number; 
    public y: number; 
    public pixelSize: number;
    public isAlive: boolean;

    constructor(
        x: number, 
        y: number, 
        isAlive: boolean,
        pixelSize: number,
    ) {
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;
        this.pixelSize = pixelSize;
    }

    /**
	 * Any live cell with fewer than two live neighbors dies, as if by underpopulation.
	 * Any live cell with two or three live neighbors lives on to the next generation.
	 * Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
	 * Any live cell with more than three live neighbors dies, as if by overpopulation.
	 */
    getNextMove(numberOfNeighbours: number): boolean {
        switch (numberOfNeighbours) {
            case 0:
            case 1:
                return false;
            case 2:
                return this.isAlive ? true : false;
            case 3:
                return true;
            case 4:
            default:
                return false
        }
    }

    hasBeenClicked(mouseX: number, mouseY: number): boolean {
        const isWithinXBounds = this.isWithinBounds(this.x, this.x + this.pixelSize - 1, mouseX);
        const isWithinYBounds = this.isWithinBounds(this.y, this.y + this.pixelSize - 1, mouseY);

        return isWithinXBounds && isWithinYBounds
    }

    kill() {
        this.isAlive = false;
    }

    spawn() {
        this.isAlive = true;
    }

    private isWithinBounds(start: number, end: number, test: number): boolean {
        return (start <= test) && (end >= test);
    }
}