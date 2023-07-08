<script lang="ts">
	import { Enemy, PlacedObstacle, RangedEnemy } from '$lib/core/Piece';
	import Game from '$lib/core/game';
	import type Tile from '../core/Tile';
	import { EmptyTile, ExplosionTile, OccupiedTile } from '../core/Tile';

	export let tile: Tile;

	function handleClick() {
		if (tile.isEmpty()) {
			tile = new OccupiedTile(tile.coordinates, new PlacedObstacle());
		} else if (tile.getPiece() instanceof PlacedObstacle) {
			tile = new EmptyTile(tile.coordinates);
		}
		Game.updateTile(tile);
	}

	function getHP(): string {
		let piece = tile.getPiece();
		if (piece instanceof Enemy) {
			return piece.pieceStats.health.toString();
		}
		return '';
	}

	function getAsset(): string {
		let piece = tile.getPiece();
		if (piece instanceof Enemy) {
			return `background-image: url(/assets/${piece.asset}.png)`;
		}
		if (tile instanceof ExplosionTile) {
			return `background-image: url(/assets/bump${tile.size}.png)`;
		}
		return '';
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="displayTile"
	style={`width: ${100 / 32}%;${getAsset()}`}
	class:black={tile.getPiece()?.isObstacle()}
	class:yellow={tile.getPiece() instanceof PlacedObstacle}
	on:click={handleClick}
>
	{getHP()}
</div>

<style>
	.displayTile {
		aspect-ratio: 1;
		border: 1px black solid;
		color: black;
		font-size: 10px;
		background-repeat: no-repeat;
		background-size: cover;
		image-rendering: pixelated;
	}
	.black {
		background-image: url(/assets/block1.png);
	}
	.yellow {
		background-image: url(/assets/block2.png);
	}
</style>
