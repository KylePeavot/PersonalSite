<script lang="ts">
    import "../app.css";
    import { Sidebar } from "$lib/common/components/index";
    import { onMount } from "svelte";
    import Hotjar from "@hotjar/browser";

    onMount(() => {
        const siteId = 3878067;
        const hotjarVersion = 6;

        Hotjar.init(siteId, hotjarVersion);
    });
</script>

<div class="flex flex-col bg-yellow-700/10 w-full h-full">
    <Sidebar>
        <slot />
    </Sidebar>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
    }
</style>
