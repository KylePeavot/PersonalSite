<script lang="ts">
    import {onMount} from 'svelte';
    import mapboxgl from 'mapbox-gl';

    onMount(() => {
        (mapboxgl as any).accessToken = 'pk.eyJ1Ijoia3BlYXZvdCIsImEiOiJjbHo2bjY2ZTIwMDR5Mm1zYXoycTVycmo4In0.ywwLol76JctHogLSw8sJQg';
        const map = new mapboxgl.Map({
            container: 'mapbox-map',
            style: 'mapbox://styles/mapbox/streets-v11'
        });
    })
</script>

<div id="mapbox-map" class="h-full w-full"></div>