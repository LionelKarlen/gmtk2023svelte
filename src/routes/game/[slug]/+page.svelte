<script>
	import GameView from '$lib/view/GameView.svelte';

	export let data;
</script>

{#key data.slug}
	<GameView seed={data.slug} />
{/key}
