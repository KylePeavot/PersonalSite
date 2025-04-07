<script lang="ts">
  import { Board } from "$lib/common/models";
  import { Bird } from "$lib/common/models/Bird";
  import { clamp } from "$lib/utils/my-math";
  import P5, { type Sketch, type p5 } from "p5-svelte";

  const canvasSize = 600;
  const frameRate = 60;

  const acceleration = 1;
  const maxSpeed = 1.5;

  function initBirds(): Bird[] {
    const numBirds = 400;

    const birds = [];

    for (let i = 0; i < numBirds; i++) {
      birds.push(
        new Bird(
          Math.random() * canvasSize,
          Math.random() * canvasSize,
          0,
          0,
          Math.random() * 2 * Math.PI
        )
      );
    }

    return birds;
  }

  const board = new Board<Bird>({
    boardSize: canvasSize,
    boardCells: initBirds(),
    randomiseFunction: () => {
      const newBirds: Bird[] = [];

      for (let i = 0; i < canvasSize; i++) {
        for (let j = 0; j < canvasSize; j++) {
          if (Math.random() > 0.5) {
            newBirds.push(new Bird(i, j, 0, 0, 0));
          }
        }
      }

      return newBirds;
    },
  });

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

      //Average angle in radians of all birds
      const alignment =
        board.boardCells.reduce((acc, bird) => acc + bird.direction, 0) /
        board.boardCells.length;

      //X,Y coordinates of the center of the flock
      const cohesion = board.boardCells.reduce(
        (acc, bird) => {
          acc.x = (acc.x + bird.x) / 2; //not correct on first bird because it'll be 0 + bird.x/y / 2
          acc.y = (acc.x + bird.y) / 2; //not correct on first bird because it'll be 0 + bird.x/y / 2

          return acc;
        },
        { x: 0, y: 0 }
      );

      board.boardCells.forEach((bird) => {
        //Follow the rules
        //1. Alignment: Move in the same direction as the other birds
        //2. Cohesion: Move towards the center of the flock
        //3. Replusion: Avoid getting too close to other birds

        //if too close to other bird, move opposite to center of flock
        //if not, get angle from cohesion and average with alignment

        const searchRadius = 10;
        const birdNeighbours = board.getNeighboursWithinDistance(
          bird,
          searchRadius
        );
        const isTooClose = birdNeighbours.length >= 2;

        const directionTowardsCenter = getAngleInRadians(
          bird.x,
          bird.y,
          cohesion.x,
          cohesion.y
        );

        console.log({
          birdx: bird.x,
          birdy: bird.y,
        });

        if (isTooClose) {
          // const averageNeighbourLocation = birdNeighbours.reduce(
          //   (acc, neighbour) => {
          //     acc.x += neighbour.x;
          //     acc.y += neighbour.y;

          //     return acc;
          //   },
          //   { x: 0, y: 0 }
          // );

          // const directionToAverageLocation = getAngleInRadians(
          //   bird.x,
          //   bird.y,
          //   averageNeighbourLocation.x / birdNeighbours.length,
          //   averageNeighbourLocation.y / birdNeighbours.length
          // );

          // const oppositeDirection =
          //   (directionToAverageLocation + Math.PI) % (2 * Math.PI);

          // bird.direction = oppositeDirection;

          // construct searchRadius x searchRadius array of valid (inside canvasSize bounds) coordinates
          // remove all coordinates that are N away from neighbours, the neighbours themselves, and the bird's coordinates
          // Then choose a random available coordinate and move towards it

          let newRandomCoordinate = {
            x: Math.round(
              bird.x + (Math.random() * (searchRadius * 2) - searchRadius)
            ),
            y: Math.round(
              bird.y + (Math.random() * (searchRadius * 2) - searchRadius)
            ),
          };
          let count = 0;

          while (
            count <= 5 &&
            birdNeighbours.some((neighbour) => {
              const distance = Math.sqrt(
                Math.pow(neighbour.x - newRandomCoordinate.x, 2) +
                  Math.pow(neighbour.y - newRandomCoordinate.y, 2)
              );

              return distance < 2;
            })
          ) {
            newRandomCoordinate = {
              x: Math.round(
                bird.x + (Math.random() * (searchRadius * 2) - searchRadius)
              ),
              y: Math.round(
                bird.y + (Math.random() * (searchRadius * 2) - searchRadius)
              ),
            };

            count++;
          }

          if (count >= 5) {
            bird.direction = alignment;
          } else {
            bird.direction = getAngleInRadians(
              bird.x,
              bird.y,
              newRandomCoordinate.x,
              newRandomCoordinate.y
            );
          }
        } else {
          const directionTowardsCenterRatio = 0.9;

          bird.direction =
            directionTowardsCenterRatio * directionTowardsCenter +
            (1 - directionTowardsCenterRatio) * alignment;
        }

        //Change in bird direction should be gradual! As in, the new direction should be e.g. halfway between old and new.
        //No bird in real life can do an instant 180 but mine apparently can

        bird.vx = Math.round(
          clamp(
            bird.vx + acceleration * Math.cos(bird.direction), //Not sure about this. It works but I don't fully understand why
            -maxSpeed,
            maxSpeed
          )
        );
        bird.vy = Math.round(
          clamp(
            bird.vy + acceleration * Math.sin(bird.direction),
            -maxSpeed,
            maxSpeed
          )
        );

        bird.x = clamp(bird.x + bird.vx, 20, canvasSize - 20);
        bird.y = clamp(bird.y + bird.vy, 20, canvasSize - 20);

        p5.fill(0);
        p5.circle(bird.x, bird.y, 2);
      });
    };
  };
</script>

<section class="flex flex-col gap-3 p-3">
  <P5 {sketch} />
</section>
