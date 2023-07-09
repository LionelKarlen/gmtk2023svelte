<script>
	import '../app.postcss';
</script>

<div class="flex justify-center background h-screen w-screen">
	<div class="w-full h-full image" />
	<div class="content h-full w-full">
		<slot />
	</div>
</div>

<style>
	.background {
		background-color: black;
	}
	.image {
		position: absolute;
		opacity: 0.6;
		background-repeat: no-repeat;
		max-width: 1000px;

		image-rendering: pixelated;
		background-size: contain;
		background-position: 50% 50%;
		background-image: url(/assets/ui/bg.png);
	}
	.content {
		z-index: 10;
		max-width: 1000px;
	}
</style>
