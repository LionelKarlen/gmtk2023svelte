<script lang="ts">
	import { goto } from '$app/navigation';
	import GameView from '$lib/view/GameView.svelte';
	import Gameover from '$lib/view/Gameover.svelte';

	export let data;
	let gameover = false;
	let winner: string;
</script>

{#key data.slug}
	{#if !gameover}
		<GameView
			seed={data.slug}
			on:gameover={(e) => {
				gameover = true;
				winner = e.detail;
			}}
		/>
	{:else}
		<Gameover
			won={winner == 'red'}
			on:nextLevel={async () => {
				await goto('/game/' + (Number.parseInt(data.slug) + 1), { replaceState: true });
				gameover = false;
			}}
			on:retry={() => {
				gameover = false;
			}}
		/>
	{/if}
{/key}
