<script lang="ts">
	import Layout from '../+layout.svelte';
	import DisplayTile from '../../lib/components/DisplayTile.svelte';
	import Game from '../../lib/core/game';

	let game = new Game();
	let grid = Game.grid;
	let forceRerender = false;
</script>

<div class="game flex justify-center flex-col items-center">
	{#key forceRerender}
		<div class="container flex flex-row flex-wrap w-full">
			{#each grid as tile}
				<DisplayTile {tile} />
			{/each}
		</div>
	{/key}
	<button
		on:click={() => {
			grid = game.cycleGameLoop();
			forceRerender = !forceRerender;
		}}
	>
		Next turn
	</button>
</div>
