import { Cell } from './Cell'

export class Board {
    boardCells: Cell[][];

    static fromScratch(gridLength: number, pixelSize: number) {
        return new Board(gridLength, pixelSize);
    }
    
    static fromPreviousState(previousBoard: Board, gridLength: number, pixelSize: number) {
        const newBoard = new Board(gridLength, pixelSize);
        
        newBoard.boardCells = previousBoard.boardCells;

        return newBoard;
    }

    private constructor(gridLength: number, pixelSize: number) {
        this.boardCells = [];

        for (let i = 0; i < gridLength; i++) {
            this.boardCells[i] = [];
            for (let j = 0; j < gridLength; j++) {
                this.boardCells[i].push(
                    new Cell(i * pixelSize, j * pixelSize, false, pixelSize),
                );
            }
        }
    }

    reset() {
        for (let i = 0; i < this.boardCells.length; i++) {
			for (let j = 0; j < this.boardCells.length; j++) {
				this.boardCells[i][j].kill();
			}
		}
    }

    randomise() {
        for (let i = 0; i < this.boardCells.length; i++) {
			for (let j = 0; j < this.boardCells.length; j++) {
				if (Math.random() > 0.5) {
					this.boardCells[i][j].spawn();
				} else {
					this.boardCells[i][j].kill();
				}
			}
		}
    }
}