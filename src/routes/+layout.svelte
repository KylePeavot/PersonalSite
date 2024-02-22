<script lang="ts">
    import "../app.css";
    import { Sidebar } from "$lib/common/components/index";
</script>

<div class="flex flex-col bg-slate-100 w-full h-full">
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
