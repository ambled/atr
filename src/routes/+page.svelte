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

<h2>Wallets</h2>

{#if form?.wallets && form.wallets.length > 0}
	<ul>
		{#each form.wallets as wallet}
			<li>
				<a href="/balance/{wallet.address}">{wallet.address.slice(0, 10)}...</a>
				<span>({wallet.name})</span>
			</li>
		{/each}
	</ul>
	<p>Total wallets: {form.wallets.length}</p>
{:else}
	<p>No wallets found.</p>
{/if}

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