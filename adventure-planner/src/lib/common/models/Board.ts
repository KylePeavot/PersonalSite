interface BaseCell {
  x: number;
  y: number;
}

export class Board<T extends BaseCell> {
  boardSize: number;
  boardCells: T[];
  randomiseFunction: () => T[];

  constructor({
    boardSize,
    boardCells,
    randomiseFunction,
  }: {
    boardSize: number;
    boardCells: T[];
    randomiseFunction: () => T[];
  }) {
    this.boardSize = boardSize;
    this.boardCells = boardCells;
    this.randomiseFunction = randomiseFunction;
  }

  get cellsAs2DArray() {
    const cellsAs2DArray: T[][] = [];

    this.boardCells.forEach((cell) => {
      if (!cellsAs2DArray[cell.x]) {
        cellsAs2DArray[cell.x] = [];
      }

      cellsAs2DArray[cell.x][cell.y] = cell;
    });

    return cellsAs2DArray;
  }

  reset() {
    this.boardCells = [];
  }

  randomise() {
    this.boardCells = this.randomiseFunction();
  }
}