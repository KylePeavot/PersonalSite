<script lang="ts">
	import P5, { type Sketch, type p5 } from "p5-svelte";
	import { Toolbar } from "$lib/game-of-life";
    import { Board } from "$lib/common/models";

	let isPaused = true;
	let frameRate = 3;

	const gridLength = 60;
	const pixelSize = 10;
	const canvasSize = gridLength * pixelSize;

	const pastBoardStates: Board[] = [];
	let board = Board.fromScratch(gridLength, pixelSize);

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
		const newBoard = Board.fromScratch(gridLength, pixelSize);

		for (let i = 0; i < board.boardCells.length; i++) {
			for (let j = 0; j < board.boardCells.length; j++) {
				const currentCell = board.boardCells[i][j];

				const northWestNeighbour = board.boardCells[i + 1]?.[j - 1];
				const northNeighbour = board.boardCells[i + 1]?.[j];
				const northEastNeighbour = board.boardCells[i + 1]?.[j + 1];

				const southWestNeighbour = board.boardCells[i - 1]?.[j - 1];
				const southNeighbour = board.boardCells[i - 1]?.[j];
				const southEastNeighbour = board.boardCells[i - 1]?.[j + 1];

				const eastNeighbour = board.boardCells[i]?.[j + 1];
				const westNeighbour = board.boardCells[i]?.[j - 1];

				const numberOfNeighbours = [
					northNeighbour,
					southNeighbour,
					eastNeighbour,
					westNeighbour,
					northWestNeighbour,
					northEastNeighbour,
					southWestNeighbour,
					southEastNeighbour,
				].filter(
					(neighbour) => !!neighbour && neighbour.isAlive,
				).length;

				const nextMove = currentCell.getNextMove(numberOfNeighbours);

				newBoard.boardCells[i][j].isAlive = nextMove;
			}
		}

		pastBoardStates.push(board);
		board = newBoard;
	}

	const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(canvasSize, canvasSize);
			p5.background(255);

			for (let i = 0; i < board.boardCells.length; i++) {
				for (let j = 0; j < board.boardCells.length; j++) {
					const cell = board.boardCells[i][j];

					p5.push();
					if (cell.isAlive) {
						p5.fill(0);
						p5.square(cell.x, cell.y, pixelSize);
					} else {
						p5.fill(255);
						p5.square(cell.x, cell.y, pixelSize);
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

			for (let i = 0; i < board.boardCells.length; i++) {
				for (let j = 0; j < board.boardCells.length; j++) {
					const cell = board.boardCells[i][j];
					p5.push();
					if (cell.isAlive) {
						p5.fill(0);
						p5.square(cell.x, cell.y, pixelSize);
					} else {
						p5.fill(255);
						p5.square(cell.x, cell.y, pixelSize);
					}
					p5.pop();
				}
			}
		};

		p5.mouseClicked = () => {
			const { mouseX, mouseY } = p5;

			if (mouseX < 0 || mouseX > canvasSize) {
				return;
			}

			if (mouseY < 0 || mouseY > canvasSize) {
				return;
			}

			for (let i = 0; i < board.boardCells.length; i++) {
				for (let j = 0; j < board.boardCells.length; j++) {
					const cell = board.boardCells[i][j];

					if (cell.hasBeenClicked(mouseX, mouseY)) {
						cell.isAlive ? cell.kill() : cell.spawn();
					}
				}
			}

			pastBoardStates.push(board);

			board = Board.fromPreviousState(board, gridLength, pixelSize);
		};
	};
</script>

<section class="container" class:container--is-paused={isPaused}>
	<Toolbar
		bind:frameRate
		bind:isPaused
		on:playPauseClicked={handlePlayPauseClicked}
		on:resetClicked={handleResetClicked}
		on:randomiseClicked={handleRandomiseClicked}
	/>
	<P5 {sketch} />
</section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
