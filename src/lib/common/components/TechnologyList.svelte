<script lang="ts">
    import type { UrlItem } from '../interfaces'

    export let technologies: UrlItem[] = []
</script>

<div class="technology-list">
    {#each technologies as technology, i}
        <a href={technology.url}>{technology.name}</a> 
        
        {#if i < technologies.length - 1}
            •
        {/if}
    {/each}
</div>

<style>
    .technology-list {
        display: flex;
        gap: 12px;
    }
</style>