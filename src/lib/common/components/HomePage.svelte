<script lang="ts">
    import { TechnologyList } from ".";
    import type { UrlItem } from "../interfaces";

    const typescriptUrlItem: UrlItem = {
        name: "TypeScript",
        url: "https://www.typescriptlang.org/",
    };
    const p5jsUrlItem: UrlItem = { name: "p5.js", url: "https://p5js.org" };

    const gameOfLifeTechList: UrlItem[] = [typescriptUrlItem, p5jsUrlItem];
</script>


<header>
    <h1>Kyle Peavot</h1>
    <p>Full Stack Software Engineer</p>
</header>

<ul style="list-style-type: none">
    <li>
        <div>
            <h2><a href="projects/game-of-life">Game of Life</a></h2>
            <p>Add some blurb here about what this is</p>
            <TechnologyList technologies={gameOfLifeTechList} />
        </div>
    </li>
</ul>
