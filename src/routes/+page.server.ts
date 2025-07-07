import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';
import { wallet, type Wallet, type NewWallet } from '$lib/server/db/schema';
import { eq, lt, gte, ne, and } from 'drizzle-orm';

export const actions = {
    add: async ({ cookies, request }) => {
		const data = await request.formData();
		const tempWallet = data.get('wallet');

        if (!tempWallet || typeof tempWallet !== 'string' || tempWallet.trim() === '') {
            return fail(400, { tempWallet, missing: true });
        }

        //return fail(400, { tempWallet, missing: false });
        console.log("<pre>tempWallet: " + tempWallet + "</pre>");

        //const existingWallet = await db.getWallet(tempWallet);
        const existingWallet = await db.db.select().from(wallet).where(eq(wallet.address,tempWallet)).limit(1);
        //const existingWallet = await db.db.select().from(wallet).limit(1).run();
        //const existingWallet = await db.db.select().from(wallet).limit(1);
        console.log("<pre>existingWallet: " + JSON.stringify(existingWallet, null, 2) + "</pre>");
        if (existingWallet.length > 0) {
            return fail(400, { tempWallet, exists: true });
        }

        const newWallet = {
            address: tempWallet,
            status: 'new',
            updatedAt: new Date(),
            name: tempWallet, // or some other logic to set the name
            ant: '0',
            ant_value: 0.0,
            arbeth: '0',
            arbeth_value: 0.0,
            arbusdc: '0',
            arbusdc_value: 0.0,
            maineth: '0',
            maineth_value: 0.0,
            emaid: '0',
            emaid_value: 0.0,
        } satisfies NewWallet;
        console.log("<pre>newWallet: " + JSON.stringify(newWallet, null, 2) + "</pre>");
        const result = await db.db.insert(wallet).values(newWallet);
        console.log("<pre>result: " + JSON.stringify(result, null, 2) + "</pre>");

        if (result.changes === 1) {
    		return { success: true };
        }
        else {
            return fail(500, { error: 'Failed to add wallet' });
        }
	},
} satisfies Actions;

export const load: PageServerLoad = async (event) => {
    console.log("Loading wallets...");
	return {
		form: {
            wallets: await db.db.select().from(wallet).orderBy(wallet.updatedAt)
        }
	};
};
export const ssr = true; // Enable server-side rendering for this page
export const csr = false; // Disable client-side rendering for this page