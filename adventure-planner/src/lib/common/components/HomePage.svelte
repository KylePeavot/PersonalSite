<script lang="ts">
    import type {UrlItem} from "../interfaces/index";
    import ProjectItem from "./ProjectItem.svelte";

    const typescriptUrlItem: UrlItem = {
        name: "TypeScript",
        url: "https://www.typescriptlang.org/",
    };
    const p5jsUrlItem: UrlItem = {name: "p5.js", url: "https://p5js.org"};
</script>

<section class="flex flex-col gap-3 p-3 max-w-[50%]">
    <header>
        <h1 class="text-3xl font-medium">Kyle Peavot</h1>
        <h2 class="text-slate-700">Full Stack Software Engineer</h2>
    </header>

    <div class="flex flex-col gap-2">
        <h2 class="text-xl">Projects</h2>
        <ul class="list-none flex flex-col gap-2">
            <ProjectItem
                title="Game of Life"
                url="p5/game-of-life"
                description="A simple implementation of Conway's Game of Life using p5.js."
                techList={[typescriptUrlItem, p5jsUrlItem]}
            />
            <ProjectItem
                title="Adventure Planner"
                url="adventure-planner"
                description="A virtual corkbord world map to track 'Adventures' across the world"
                techList={[]}
            />
        </ul>
    </div>
</section>