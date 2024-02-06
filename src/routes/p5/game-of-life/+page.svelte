<script lang="ts">
	import P5, { type Sketch, type p5 } from "p5-svelte";
	import { Cell } from "../../../lib/game-of-life/models";
	import { Toolbar } from "$lib/game-of-life";

	let isPaused = true;
	let frameRate = 3;

	const numberOfPixelsInGrid = 40;
	const pixelSize = 20;
	const gridSize = numberOfPixelsInGrid * pixelSize;

	const gridCells: Cell[][] = initCellState();

	function initCellState(): Cell[][] {
		const initialArray: Cell[][] = [];

		for (let i = 0; i < numberOfPixelsInGrid; i++) {
			initialArray[i] = [];
			for (let j = 0; j < numberOfPixelsInGrid; j++) {
				initialArray[i].push(
					new Cell(i * pixelSize, j * pixelSize, false, pixelSize),
				);
			}
		}

		return initialArray;
	}

	function handlePlayPauseClicked() {
		isPaused = !isPaused;
	}

	function handleResetClicked() {
		isPaused = true;

		for (let i = 0; i < gridCells.length; i++) {
			for (let j = 0; j < gridCells.length; j++) {
				gridCells[i][j].kill();
			}
		}
	}

	function handleRandomiseClicked() {
		isPaused = true;

		for (let i = 0; i < gridCells.length; i++) {
			for (let j = 0; j < gridCells.length; j++) {
				if (Math.random() > 0.5) {
					gridCells[i][j].spawn();
				} else {
					gridCells[i][j].kill();
				}
			}
		}
	}

	function processTick() {
		for (let i = 0; i < gridCells.length; i++) {
			for (let j = 0; j < gridCells.length; j++) {
				const currentCell = gridCells[i][j];

				const northWestNeighbour = gridCells[i + 1]?.[j - 1];
				const northNeighbour = gridCells[i + 1]?.[j];
				const northEastNeighbour = gridCells[i + 1]?.[j + 1];

				const southWestNeighbour = gridCells[i - 1]?.[j - 1];
				const southNeighbour = gridCells[i - 1]?.[j];
				const southEastNeighbour = gridCells[i - 1]?.[j + 1];

				const eastNeighbour = gridCells[i]?.[j + 1];
				const westNeighbour = gridCells[i]?.[j - 1];

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

				currentCell.loadNextMove(numberOfNeighbours);
			}
		}

		for (let i = 0; i < gridCells.length; i++) {
			for (let j = 0; j < gridCells.length; j++) {
				const currentCell = gridCells[i][j];

				currentCell.executeNextMove();
			}
		}
	}

	const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(gridSize, gridSize);
			p5.background(255);

			for (let i = 0; i < gridCells.length; i++) {
				for (let j = 0; j < gridCells.length; j++) {
					const cell = gridCells[i][j];

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

			for (let i = 0; i < gridCells.length; i++) {
				for (let j = 0; j < gridCells.length; j++) {
					const cell = gridCells[i][j];
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

			if (mouseX < 0 || mouseX > gridSize) {
				return;
			}

			if (mouseY < 0 || mouseY > gridSize) {
				return;
			}

			for (let i = 0; i < gridCells.length; i++) {
				for (let j = 0; j < gridCells.length; j++) {
					const cell = gridCells[i][j];

					if (cell.hasBeenClicked(mouseX, mouseY)) {
						cell.isAlive ? cell.kill() : cell.spawn();
					}
				}
			}
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
