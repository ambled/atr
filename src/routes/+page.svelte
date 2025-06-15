<script>
	let { form } = $props();
</script>

<a href="/balance">Wallet shortcuts</a>

<form method="POST">
	<label>
		enter the wallet address
		<input name="wallet" autocomplete="off" />
	</label>
</form>

{#if form?.incorrect}
	<p class="error">invalid passphrase!</p>
{/if}

<style>
	.error {
		color: red;
	}
</style>