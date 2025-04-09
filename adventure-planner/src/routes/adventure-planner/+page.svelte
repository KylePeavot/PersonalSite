<script lang="ts">
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";
  import type { IAdventure } from "$lib/adventure-planner/interfaces/IAdventure";
  import { v4 as uuidv4 } from "uuid";
  import { getRandomCoords } from "$lib/adventure-planner/utils/coordinates";

  let adventures: IAdventure[] = [];
  let map: mapboxgl.Map | undefined = undefined;

  onMount(() => {
    (mapboxgl as any).accessToken =
      "pk.eyJ1Ijoia3BlYXZvdCIsImEiOiJjbHo2bjY2ZTIwMDR5Mm1zYXoycTVycmo4In0.ywwLol76JctHogLSw8sJQg";
    map = new mapboxgl.Map({
      container: "mapbox-map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [0.54566, 50.892861],
      zoom: 4,
    });
    //TODO, add all existing adventures to the map
  });

  function addAdventure() {
    if (!map) {
      throw new Error("Map not defined");
    }

    const id = uuidv4();
    const newAdventure: IAdventure = {
      id,
      name: `An adventure ${id}`,
      adventurePoints: [
        {
          startTime: new Date(),
          endTime: new Date(),
          coordinates: getRandomCoords(),
        },
      ],
    };

    adventures = { ...adventures, ...newAdventure };

    map.addSource(`adventure-${id}`, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            newAdventure.adventurePoints[0].coordinates.lng,
            newAdventure.adventurePoints[0].coordinates.lat,
          ],
        },
        properties: {},
      },
    });

    map.addLayer({
      id: `circle-${id}`,
      type: "circle",
      source: `adventure-${id}`,
      paint: {
        "circle-color": "#4264fb",
        "circle-radius": 8,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });

    map.flyTo({
      center: newAdventure.adventurePoints[0].coordinates,
    });
  }

  // const adventures: IAdventure[] = [
  //     {
  //         id: 'id-one',
  //         name: 'Adventure One',
  //         adventurePoints: [
  //             {
  //                 startTime: new Date('2025-01-12T08:00:00'),
  //                 endTime
  //             }
  //         ]
  //     }
  // ]
</script>

<div id="mapbox-map" class="h-full w-full"></div>

<section>
  <button class="add-adventure-button" on:click={addAdventure}
    >+ Add adventure</button
  >
</section>

<style>
  .add-adventure-button {
    @apply bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded absolute right-0 bottom-0 mb-7 mr-2 z-10 w-fit;
  }
</style>
