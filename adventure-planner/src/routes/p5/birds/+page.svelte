<script lang="ts">
  import { Bird } from "$lib/common/models/Bird";
  import { clamp } from "$lib/utils/my-math";
  import P5, { type Sketch, type p5 } from "p5-svelte";

  const canvasSize = 600;
  const frameRate = 120;

  const acceleration = 0.2;

  function initBirds(): Bird[] {
    const numBirds = 100;

    const birds = [];

    for (let i = 0; i < numBirds; i++) {
      birds.push(
        new Bird(
          Math.random() * canvasSize,
          Math.random() * canvasSize,
          0,
          0,
          0
        )
      );
    }

    return birds;
  }

  const birds: Bird[] = initBirds();

  function getAngleInRadians(x1: number, y1: number, x2: number, y2: number) {
    // Calculate the differences in x and y
    let dx = x2 - x1;
    let dy = y2 - y1;

    // Use atan2 to calculate the angle in radians
    let angle = Math.atan2(dy, dx);

    return angle; // The angle in radians
  }

  const sketch: Sketch = (p5: p5) => {
    p5.setup = () => {
      p5.createCanvas(canvasSize, canvasSize);
      p5.background(255);
    };

    p5.draw = () => {
      p5.frameRate(frameRate);

      p5.createCanvas(canvasSize, canvasSize);
      p5.background(255);

      birds.forEach((bird) => {
        const angle = getAngleInRadians(bird.x, bird.y, p5.mouseX, p5.mouseY);

        bird.vx = clamp(bird.vx + (acceleration * Math.cos(angle)), -2, 2) + Math.random() * 0.1;
        bird.vy = clamp(bird.vy + (acceleration * Math.sin(angle)), -2, 2) + Math.random() * 0.1;

        bird.x = clamp(bird.x + bird.vx, 0, canvasSize);
        bird.y = clamp(bird.y + bird.vy, 0, canvasSize);

        p5.fill(0);
        p5.circle(bird.x, bird.y, 2);
      });
    };
  };
</script>

<section class="flex flex-col gap-3 p-3">
  <P5 {sketch} />
</section>
