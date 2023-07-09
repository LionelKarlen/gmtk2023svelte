<script lang="ts">
	import { goto } from '$app/navigation';
	import FancyButton from '$lib/components/FancyButton.svelte';
	import { Stages } from '$lib/core/Stage';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import DisplayTile from '../../lib/components/DisplayTile.svelte';
	import Game from '../../lib/core/game';

	export let seed: string;

	const dispatch = createEventDispatcher();
	let game: Game | null;
	let refresh = true;
	onMount(() => {
		console.log('mount');
		Game.blueArmy=[];
		Game.redArmy=[];
		Game.grid=[];
		game = new Game(seed);
	});
	onDestroy(() => {
		console.log('destroy');
		game = null;
		if (refresh) {
			// location.reload();
		}
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
						let gameover = game.isGameOver();
						if (gameover) {
							console.log(gameover);
							dispatch('gameover', gameover);
						}
						forceRerender = !forceRerender;
					}
				}}
			/>
		</div>
		<div class="topControl flex flex-row justify-around">
			<FancyButton assetName="MenuReturnGameplay" on:click={() => goto('/levels')} />
		</div>

		<audio autoplay loop volume="0.3">
			<source src="/assets/music/shit_going_down.mp3" type="audio/mpeg" />
		</audio>
	</div>
{/if}

<style global>
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
		left: 10%;
	}
</style>
