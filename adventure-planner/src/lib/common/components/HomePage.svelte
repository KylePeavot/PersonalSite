<script lang="ts">
  import type { UrlItem } from "../interfaces/index";
  import ProjectItem from "./ProjectItem.svelte";

  const typescriptUrlItem: UrlItem = {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
  };
  const p5jsUrlItem: UrlItem = { name: "p5.js", url: "https://p5js.org" };
  const mapboxUrlItem: UrlItem = {
    name: "mapbox",
    url: "https://www.mapbox.com/",
  };
</script>

<section class="flex flex-col gap-3 p-3">
  <header>
    <h1 class="text-3xl font-medium">Kyle Peavot</h1>
    <h2 class="text-slate-700">Full Stack Software Engineer</h2>
  </header>

  <section class="max-w-[60%] text-sm italic text-slate-600">
    <p>
      INFO: This site is a WIP project-ish CV-esque thing intended to show that
      I am:
    </p>
    <ol class="list-decimal list-inside">
      <li>A real person</li>
      <li>Capable of software engineering</li>
      <li>A real fun guy</li>
    </ol>
  </section>

  <div class="flex flex-col gap-2 max-w-[50%]">
    <h2 class="text-xl">Projects</h2>
    <ul class="list-none flex flex-col gap-2">
      <ProjectItem
        title="Game of Life"
        url="p5/game-of-life"
        description="A simple implementation of Conway's Game of Life using p5.js."
        techList={[typescriptUrlItem, p5jsUrlItem]}
      />
      <ProjectItem
        title="Bird simulator"
        url="p5/birds"
        description="Just some birds"
        techList={[typescriptUrlItem, p5jsUrlItem]}
      />
      <ProjectItem
        title="Adventure Planner"
        url="https://adventures.peavot.com"
        description="A virtual corkbord world map to track 'Adventures' across the world"
        techList={[typescriptUrlItem, mapboxUrlItem]}
      />
    </ul>
  </div>
</section>
