<script lang="ts">
	import P5, { type Sketch, type p5 } from "p5-svelte";
	import { Toolbar } from "$lib/game-of-life";
  import { Bird } from "$lib/common/models/Bird";
  import { randomCoord } from "$lib/utils/coords";
  import { draw } from "svelte/transition";

	let isPaused = true;
	let frameRate = 10;

    const noOfBirds = 100;
	const gridLength = 600;
	const pixelSize = 1;
	const canvasSize = gridLength * pixelSize;

    let birds: Bird[] = [];

    function initBirds() {
        birds = [];

        for (let i = 0; i < noOfBirds; i++) {
            birds.push(new Bird(randomCoord(gridLength), randomCoord(gridLength), 0, 0));
        }
    }

	function handlePlayPauseClicked() {
		isPaused = !isPaused;
	}

	function handleResetClicked() {
		isPaused = true;
        // board.reset();
        //what does reset mean for this project?
	}

	function handleRandomiseClicked() {
		isPaused = true;
        
        initBirds();
	}

    function drawBirds(p5: p5) {
        birds.forEach((bird) => {
            p5.fill(0);
            p5.circle(bird.x, bird.y, pixelSize);
        });
    }

	function processTick(p5: p5) {
		drawBirds(p5);
	}

	const sketch: Sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(canvasSize, canvasSize);
			p5.background(255);

            initBirds();

            drawBirds(p5);

		};

		p5.draw = () => {
            p5.frameRate(frameRate);

            p5.createCanvas(canvasSize, canvasSize);
			p5.background(255);

            processTick(p5);
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