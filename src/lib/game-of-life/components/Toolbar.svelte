<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let isPaused = true;
    export let frameRate = 3;

    const dispatcher = createEventDispatcher();

    function handlePlayPauseClicked() {
        dispatcher('playPauseClicked')
    }
    function handleResetClicked() {
        dispatcher('resetClicked')
    }
    function handleRandomiseClicked() {
        dispatcher('randomiseClicked')
    }

</script>

<div class="menu-container">
    <button class="button" on:click={() => handlePlayPauseClicked()}>
        {isPaused ? "Play" : "Pause"}
    </button>

    <button class="button" on:click={() => handleResetClicked()}>
        Reset
    </button>

    <button class="button" on:click={() => handleRandomiseClicked()}>
        Randomise
    </button>

    <div>
        <label for="framerate-range">{frameRate} ticks/sec</label>
        <input id="framerate-range" type="range" min="1" max="30" bind:value={frameRate} />
    </div>
</div>

<style>
	.menu-container {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}

	.button {
		width: fit-content;
	}
</style>