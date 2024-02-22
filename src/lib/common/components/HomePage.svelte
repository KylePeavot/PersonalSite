<script lang="ts">
    import TechnologyList from "./TechnologyList.svelte";
    import type { UrlItem } from "../interfaces/index";

    const typescriptUrlItem: UrlItem = {
        name: "TypeScript",
        url: "https://www.typescriptlang.org/",
    };
    const p5jsUrlItem: UrlItem = { name: "p5.js", url: "https://p5js.org" };

    const gameOfLifeTechList: UrlItem[] = [typescriptUrlItem, p5jsUrlItem];
</script>

<section class="flex flex-col gap-3 p-3 max-w-[50%]">
    <header>
        <h1 class="text-3xl font-medium">Kyle Peavot</h1>
        <h2 class="text-slate-700">Full Stack Software Engineer</h2>
    </header>

    <div class="flex flex-col gap-2">
        <h2 class="text-xl">Projects</h2>
        <ul style="list-style-type: none">
            <li
                class="border-solid border-slate-400 bg-slate-200 border-2 rounded-md p-1">
                <div>
                    <h2 class="text-blue-600 underline"><a href="p5/game-of-life">Game of Life</a></h2>
                    <p>
                        A simple implementation of Conway's Game of Life using p5.js.
                    </p>
                    <TechnologyList technologies={gameOfLifeTechList} />
                </div>
            </li>
        </ul>
    </div>
</section>