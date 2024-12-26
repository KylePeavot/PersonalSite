<script lang="ts">
	import P5, { type Sketch, type p5 } from "p5-svelte";
	import { Toolbar } from "$lib/game-of-life";
    import { Board } from "$lib/common/models";

	let isPaused = true;
	let frameRate = 10;

	const gridLength = 60;
	const pixelSize = 10;
	const canvasSize = gridLength * pixelSize;

	function handlePlayPauseClicked() {
		isPaused = !isPaused;
	}

	function handleResetClicked() {
		isPaused = true;
	}

	function handleRandomiseClicked() {
		isPaused = true;
	}

	function processTick() {
		
	}

	const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(canvasSize, canvasSize);
			p5.background(255);

		};

		p5.draw = () => {
			if (!isPaused) {
				p5.frameRate(frameRate);
				processTick();
			} else {
				p5.frameRate(60);
			}
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