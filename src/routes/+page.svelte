<script lang="ts">
	import P5, { type Sketch, type p5 } from 'p5-svelte';
	import { Cell } from '../lib/index'

	/**
	 * Any live cell with fewer than two live neighbors dies, as if by underpopulation.
	 * Any live cell with two or three live neighbors lives on to the next generation.
	 * Any live cell with more than three live neighbors dies, as if by overpopulation.
	 * Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
	 */
	
	let isPaused = true;
	let frameRate = 60;

	const numberOfPixelsInGrid = 20;
	const pixelSize = 20;
	const gridSize = numberOfPixelsInGrid * pixelSize;
	
	const gridCells: Cell[][] = initCellState();

	function initCellState(): Cell[][] {
		const initialArray: Cell[][] = [];

		for(let i = 0; i < numberOfPixelsInGrid; i++){
			initialArray[i] = [];
			for(let j = 0; j < numberOfPixelsInGrid; j++) {
				initialArray[i].push(new Cell(i * pixelSize, j * pixelSize, false, pixelSize));
			}
		}

		return initialArray;
	}

	function handlePlayPauseClicked() {
		isPaused = !isPaused;

		frameRate = isPaused ? 60 : 4;
	}

	function handleResetClicked() {
		isPaused = true;

		for(let i = 0; i < gridCells.length; i++){
			for(let j = 0; j < gridCells.length; j++) {
				gridCells[i][j].kill();
			}
		}
	}
	
	
	function handleRandomiseClicked() {
		isPaused = true;

		for(let i = 0; i < gridCells.length; i++){
			for(let j = 0; j < gridCells.length; j++) {
				if (Math.random() > 0.5) {
					gridCells[i][j].spawn();
				} else {
					gridCells[i][j].kill();
				}
			}
		}
	}

	function processTick() {
		gridCells.forEach((cellRow, i) => {
			cellRow.forEach((cell, j) => {
				const currentCell = gridCells[i][j];
				
				//Get each neighbour
				const northWestNeighbour = gridCells[i + 1]?.[j - 1];
				const northNeighbour = gridCells[i + 1]?.[j];
				const northEastNeighbour = gridCells[i + 1]?.[j + 1];

				const southWestNeighbour = gridCells[i - 1]?.[j - 1];
				const southNeighbour = gridCells[i - 1]?.[j];
				const southEastNeighbour = gridCells[i - 1]?.[j + 1];
				
				const eastNeighbour = gridCells[i]?.[j + 1];
				const westNeighbour = gridCells[i]?.[j - 1];

				//Generate counts from them
				const numberOfNeighbours = [
					northNeighbour,
					southNeighbour,
					eastNeighbour,
					westNeighbour,
					northWestNeighbour,
					northEastNeighbour,
					southWestNeighbour,
					southEastNeighbour
				].filter((neighbour) => !!neighbour && neighbour.isAlive).length;
				
				currentCell.loadNextMove(numberOfNeighbours);
			})
		})

		gridCells.forEach((cellRow, i) => {
			cellRow.forEach((cell, j) => {
				const currentCell = gridCells[i][j];
				
				currentCell.executeNextMove();
			})
		})
	}

	const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(gridSize, gridSize);
			p5.background(255);

			gridCells.forEach((cellRow) => {
				cellRow.forEach((cell) => {
					p5.push();
					if (cell.isAlive) {
						p5.fill(0);
						p5.square(cell.x, cell.y, pixelSize);
					} else {
						p5.fill(255);
						p5.square(cell.x, cell.y, pixelSize);
					}
					p5.pop();
				})
			})
		};

		p5.draw = () => {
			p5.frameRate(frameRate);
			
			if (!isPaused) {
				processTick();
			}

			gridCells.forEach((cellRow) => {
				cellRow.forEach((cell) => {
					p5.push();
					if (cell.isAlive) {
						p5.fill(0);
						p5.square(cell.x, cell.y, pixelSize);
					} else {
						p5.fill(255);
						p5.square(cell.x, cell.y, pixelSize);
					}
					p5.pop();
				})
			})
		};

		p5.mouseClicked = () => {
			const { mouseX, mouseY } = p5;

			if (mouseX < 0 || mouseX > gridSize) {
				return;
			}

			if (mouseY < 0 || mouseY > gridSize) {
				return;
			}
			
			gridCells.forEach((row) => {
				const cellClicked = row.find((cell) => cell.hasBeenClicked(mouseX, mouseY))

				if (!cellClicked) {
					return;
				}

				cellClicked.isAlive ? cellClicked.kill() : cellClicked.spawn();
			})
		}
	};
</script>

<section class="container" class:container--is-paused={isPaused}>
	<div class="menu-container">
		<button class="button" on:click={() => handlePlayPauseClicked()}>
			{isPaused ? "Play" : "Pause"}
		</button>

		<button class="button" on:click={() => handleResetClicked()}>
			Reset
		</button>

		<button class="button" on:click={() => handleRandomiseClicked()}>
			Randomise
		</button>
	</div>

	<P5 {sketch} />
</section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.menu-container {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}

	.button {
		width: fit-content;
	}
</style>