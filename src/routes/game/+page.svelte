<script lang="ts">
	import DisplayTile from '../../lib/components/DisplayTile.svelte';
	import Game from '../../lib/core/game';

	let game = new Game();
	let grid = Game.grid;
	let forceRerender = false;
</script>

<div class="game flex justify-center flex-col items-center h-full">
	{#key forceRerender}
		<div class="flex flex-row flex-wrap w-full board">
			{#each grid as tile}
				<DisplayTile {tile} />
			{/each}
		</div>
	{/key}
	<!-- <button
		class="btn"
		on:click={() => {
			grid = game.cycleGameLoop();
			forceRerender = !forceRerender;
		}}
	>
		Next turn
	</button> -->
</div>

<style>
	.game {
		width: 85%;
		max-width: 850px;
	}
	.board {
		max-height: 70vh;
	}
</style>
