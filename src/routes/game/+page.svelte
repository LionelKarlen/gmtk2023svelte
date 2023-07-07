<script lang="ts">
	import DisplayTile from '../../lib/components/DisplayTile.svelte';
	import Game from '../../lib/core/game';

	let game = new Game();
</script>

<div class="game flex justify-center">
	<div class="container flex flex-row flex-wrap w-full">
		{#each game.grid as tile}
			<DisplayTile {tile} />
		{/each}
	</div>
</div>
