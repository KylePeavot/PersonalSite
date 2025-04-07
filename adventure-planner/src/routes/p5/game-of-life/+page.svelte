<script lang="ts">
  import P5, { type Sketch, type p5 } from "p5-svelte";
  import { Toolbar } from "$lib/game-of-life";
  import { Board, GoLCell } from "$lib/common/models";

  let isPaused = true;
  let frameRate = 60;

  const gridLength = 60;
  const pixelSize = 10;
  const canvasSize = gridLength * pixelSize;

  const pastBoardStates: Board<GoLCell>[] = [];
  let board = new Board<GoLCell>({
    boardSize: gridLength,
    boardCells: [],
    randomiseFunction: () => {
      const newCells: GoLCell[] = [];

      for (let i = 0; i < gridLength; i++) {
        for (let j = 0; j < gridLength; j++) {
          const newCell = new GoLCell(i, j, false, pixelSize);

          if (Math.random() > 0.5) {
            newCell.spawn();
          } else {
            newCell.kill();
          }

          newCells.push(newCell);
        }
      }

      return newCells;
    },
  });

  function handlePlayPauseClicked() {
    isPaused = !isPaused;
  }

  function handleResetClicked() {
    isPaused = true;
    board.reset();
  }

  function handleRandomiseClicked() {
    isPaused = true;

    board.randomise();
  }

  function processTick() {
    const newBoard = new Board({
      boardSize: gridLength,
      boardCells: [],
      randomiseFunction: () => {
        const newCells: GoLCell[] = [];

        for (let i = 0; i < gridLength; i++) {
          for (let j = 0; j < gridLength; j++) {
            const newCell = new GoLCell(i, j, false, pixelSize);

            if (Math.random() > 0.5) {
              newCell.spawn();
            } else {
              newCell.kill();
            }

            newCells.push(newCell);
          }
        }

        return newCells;
      },
    });

	const boardAs2DArray = board.cellsAs2DArray;

    for (let i = 0; i < boardAs2DArray.length; i++) {
      for (let j = 0; j < boardAs2DArray.length; j++) {
        const currentCell = boardAs2DArray[i][j];

        const northWestNeighbour = boardAs2DArray[i + 1]?.[j - 1];
        const northNeighbour = boardAs2DArray[i + 1]?.[j];
        const northEastNeighbour = boardAs2DArray[i + 1]?.[j + 1];

        const southWestNeighbour = boardAs2DArray[i - 1]?.[j - 1];
        const southNeighbour = boardAs2DArray[i - 1]?.[j];
        const southEastNeighbour = boardAs2DArray[i - 1]?.[j + 1];

        const eastNeighbour = boardAs2DArray[i]?.[j + 1];
        const westNeighbour = boardAs2DArray[i]?.[j - 1];

        const numberOfNeighbours = [
          northNeighbour,
          southNeighbour,
          eastNeighbour,
          westNeighbour,
          northWestNeighbour,
          northEastNeighbour,
          southWestNeighbour,
          southEastNeighbour,
        ].filter((neighbour) => !!neighbour && neighbour.isAlive).length;

        const nextMove = currentCell.getNextMove(numberOfNeighbours);

        newBoard.boardCells.push(new GoLCell(i, j, nextMove, pixelSize));
      }
    }

    pastBoardStates.push(board);
    board = newBoard;
  }

  const sketch: Sketch = (p5: p5) => {
    p5.setup = () => {
      p5.createCanvas(canvasSize, canvasSize);
      p5.background(255);

	  const boardAs2DArray = board.cellsAs2DArray;

      for (let i = 0; i < boardAs2DArray.length; i++) {
        for (let j = 0; j < boardAs2DArray.length; j++) {
          const cell = boardAs2DArray[i][j];

          p5.push();
          if (cell.isAlive) {
            p5.fill(0);
            p5.square(cell.x * pixelSize, cell.y * pixelSize, pixelSize);
          } else {
            p5.fill(255);
            p5.square(cell.x * pixelSize, cell.y * pixelSize, pixelSize);
          }
          p5.pop();
        }
      }
    };

    p5.draw = () => {
      if (!isPaused) {
        p5.frameRate(frameRate);
        processTick();
      } else {
        p5.frameRate(60);
      }

	  const boardAs2DArray = board.cellsAs2DArray;

      for (let i = 0; i < boardAs2DArray.length; i++) {
        for (let j = 0; j < boardAs2DArray.length; j++) {
          const cell = boardAs2DArray[i][j];
          p5.push();
          if (cell.isAlive) {
            p5.fill(0);
            p5.square(cell.x * pixelSize, cell.y * pixelSize, pixelSize);
          } else {
            p5.fill(255);
            p5.square(cell.x * pixelSize, cell.y * pixelSize, pixelSize);
          }
          p5.pop();
        }
      }
    };

    //TODO This just doesn't work anymore. I think the hasBeenClicked function is broken
    p5.mouseClicked = () => {
      const { mouseX, mouseY } = p5;

      if (mouseX < 0 || mouseX > canvasSize) {
        return;
      }

      if (mouseY < 0 || mouseY > canvasSize) {
        return;
      }

	  const boardAs2DArray = board.cellsAs2DArray;

      for (let i = 0; i < boardAs2DArray.length; i++) {
        for (let j = 0; j < boardAs2DArray.length; j++) {
          const cell = boardAs2DArray[i][j];

          if (cell.hasBeenClicked(mouseX, mouseY)) {
            cell.isAlive ? cell.kill() : cell.spawn();
          }
        }
      }

      pastBoardStates.push(board);

      board = new Board({
        boardSize: gridLength,
        boardCells: board.boardCells,
        randomiseFunction: () => {
          const newCells: GoLCell[] = [];

          for (let i = 0; i < gridLength; i++) {
            for (let j = 0; j < gridLength; j++) {
              const newCell = new GoLCell(i, j, false, pixelSize);

              if (Math.random() > 0.5) {
                newCell.spawn();
              } else {
                newCell.kill();
              }

              newCells.push(newCell);
            }
          }

          return newCells;
        },
      });
    };
  };
</script>

<section class="flex flex-col gap-3 p-3">
  <Toolbar
    bind:frameRate
    bind:isPaused
    on:playPauseClicked={handlePlayPauseClicked}
    on:resetClicked={handleResetClicked}
    on:randomiseClicked={handleRandomiseClicked}
  />
  <P5 {sketch} />
</section>
