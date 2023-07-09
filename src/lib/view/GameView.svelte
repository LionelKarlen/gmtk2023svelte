<script lang="ts">
	import { goto } from '$app/navigation';
	import FancyButton from '$lib/components/FancyButton.svelte';
	import { Stages } from '$lib/core/Stage';
	import { onDestroy, onMount } from 'svelte';
	import DisplayTile from '../../lib/components/DisplayTile.svelte';
	import Game from '../../lib/core/game';

	export let seed: string;
	let game: Game | null;
	onMount(() => {
		console.log('mount');
		game = new Game(seed);
	});
	onDestroy(() => {
		console.log('destroy');
		game = null;
		location.reload();
	});
	let forceRerender = false;
</script>

{#if game}
	<div class="game flex justify-center flex-col items-center h-full">
		{#if game.stage != Stages.SETUP}
			{#key forceRerender}
				<div class="flex flex-row flex-wrap w-full board">
					{#each Game.grid as tile}
						<DisplayTile {tile} />
					{/each}
				</div>
			{/key}
		{/if}
		<div class="bottomControl">
			<FancyButton
				assetName="Next"
				on:click={() => {
					if (game) {
						game.cycleGameLoop();
						forceRerender = !forceRerender;
					}
				}}
			/>
		</div>
		<div class="topControl flex flex-row justify-around">
			<FancyButton assetName="MenuReturnGameplay" on:click={() => goto('/')} />
			<FancyButton assetName="Next" />
		</div>
	</div>
{/if}

<style>
	.game {
		width: 85%;
		max-width: 850px;
	}
	.board {
		max-height: 70vh;
	}
	.bottomControl {
		position: absolute;
		bottom: 10%;
	}
	.topControl {
		position: absolute;
		top: 10%;
		width: 100%;
	}
</style>
