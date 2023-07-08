<script lang="ts">
	import { EmptyEnemy, Enemy, PlacedObstacle } from '$lib/core/Piece';
	import Game from '$lib/core/game';
	import type Tile from '../core/Tile';
	import { EmptyTile, ExplosionTile, OccupiedTile } from '../core/Tile';
	import HpBar from './HPBar.svelte';

	export let tile: Tile;

	function handleClick() {
		if (tile.isEmpty()) {
			tile = new OccupiedTile(tile.coordinates, new PlacedObstacle());
		} else if (tile.getPiece() instanceof PlacedObstacle) {
			tile = new EmptyTile(tile.coordinates);
		}
		Game.updateTile(tile);
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
	function getEnemy() {
		let piece = tile.getPiece();
		if (piece instanceof Enemy) {
			return piece;
		}
		return new EmptyEnemy();
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
	{#if tile.getPiece() instanceof Enemy}
		<div class="handler">
			<HpBar enemy={getEnemy()} />
		</div>
	{/if}
</div>

<style>
	.handler {
		position: relative;
		height: 100%;
		top: -60%;
		overflow: visible;
		left: 0px;
	}
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
