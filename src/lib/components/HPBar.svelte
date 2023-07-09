<script lang="ts">
	import type { Enemy } from '$lib/core/Piece';

	export let enemy: Enemy;
	let color = enemy.allegiance == 1 ? 'r' : 'b';
</script>

<div class="hp outside" style={`background-image: url(/assets/game/${color}empty.png)`}>
	<div
		class="hp inside"
		style={`background-image: url(/assets/game/${color}full.png); transform: scaleX(${
			enemy.pieceStats.health / enemy.pieceStats.maxHealth
		});`}
	/>
</div>

<style>
	.hp {
		background-repeat: no-repeat;
		background-size: contain;
		image-rendering: pixelated;
		overflow: hidden;
	}
	.outside {
		width: 100%;
		height: 100%;
	}
	.inside {
		transform-origin: center left;
		transform: scaleX(0.25);

		height: 100%;
		z-index: -10;
	}
</style>
