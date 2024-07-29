<script lang="ts">
    import TechnologyList from "./TechnologyList.svelte";
    import type {UrlItem} from '../interfaces'

    export let title: string;
    export let url: string;
    export let description: string;
    export let techList: UrlItem[] = [];

</script>

<li class="border-solid border-slate-400 bg-slate-200 border-2 rounded-md p-1">
    <div>
        <h2 class="text-blue-600 underline"><a href="{url}">{title}</a></h2>
        <p>
            {description}
        </p>
        <TechnologyList technologies={techList}/>
    </div>
</li>