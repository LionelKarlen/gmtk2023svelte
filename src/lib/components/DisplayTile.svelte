<script lang="ts">
	import { Obstacle, PlacedObstacle } from '$lib/core/Piece';
	import type Tile from '../core/Tile';
	import { EmptyTile, OccupiedTile } from '../core/Tile';

	export let tile: Tile;

	function handleClick() {
		if (tile.isEmpty()) {
			tile = new OccupiedTile(tile.coordinates, new PlacedObstacle());
		} else if (tile.getPiece() instanceof PlacedObstacle) {
			tile = new EmptyTile(tile.coordinates);
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="displayTile"
	style={`width: ${100 / 32}%`}
	class:black={tile.getPiece()?.isObstacle()}
	class:yellow={tile.getPiece() instanceof PlacedObstacle}
	on:click={handleClick}
>
	{''}
</div>

<style>
	.displayTile {
		aspect-ratio: 1;
		border: 1px black solid;
	}
	.black {
		background-color: black;
	}
	.yellow {
		background-color: yellow;
	}
</style>
