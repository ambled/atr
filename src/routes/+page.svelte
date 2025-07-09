<script lang="ts">
    import type { PageProps } from './$types';
	let { form }: PageProps = $props();
</script>

<a href="/balance">Wallet shortcuts</a>

<form method="POST" action="?/add">
	<label>
		enter the wallet address
		<input name="wallet" />
		<button type="submit">Add Wallet</button>
	</label>
</form>


{#if form?.invalid}
	<p class="error">Invalid wallet address.</p>
{/if}
{#if form?.success}
	<p class="success">Wallet added successfully!</p>
{/if}

{#if form?.missing}
	<p class="error">Please enter a wallet address.</p>
{/if}

{#if form?.error}
	<p class="error">Error adding wallet: {form.error}</p>
{/if}
{#if form?.exists}
	<p class="error">Wallet already exists!</p>
{/if}

<style>
	.error {
		color: red;
	}
</style>