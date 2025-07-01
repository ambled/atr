import type { PageServerLoad } from './$types';
import BigNumber from 'bignumber.js';
import { API_KEY } from '$env/static/private';
const api_url = 'https://api.g.alchemy.com/data/v1/'+API_KEY+'/assets/tokens/by-address';
let balances = {
  'ANT': "0",
  'ARBETH': "0",
   'ARBETH': "0",
   'ARBETH': "0",
  'ARBETH': "0",
};
let prices = {
  'ARBETH': "0",
    'ARBETH': "0",
     'ARBETH': "0",
     'ARBETH': "0",
   'ARBETH': "0",
}
let values = {
  'ARBETH': 0.0,
  'ARBETH': 0.0,
   'ARBETH': 0.0,
   'ARBETH': 0.0,
   'ARBETH': 0.0,

}
let balance = new BigNumber(0);
let price = new BigNumber(0);
let total = 0.0;

export  const load: PageServerLoad = async ( event ) => {
    const { wallet } = await event.params;
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: '{"addresses":[{"address":"'+wallet+'","networks":["eth-mainnet","arb-mainnet"]}]}',
    };
    //console.dir([api_url, options], { depth: null });
    console.log(JSON.stringify([api_url, options], null, 2))
    try {
        const response = await fetch(api_url, options);
        const data = await response.json();
        console.log(data.data.tokens);
        data.data.tokens.forEach((token: any) => {
            if (token.network === 'arb-mainnet' && token.tokenAddress === '0xa78d8321b20c4ef90ecd72f2588aa985a4bdb684') {
                balance = new BigNumber(token.tokenBalance, 16)/ Math.pow(10, 18);
                price = new BigNumber(token.tokenPrices[0].value);
                balances['ANT'] = balance.toFixed(18);
                prices['ANT'] = price.toFixed();
                values['ANT'] = price.times(balance).toFixed(5);
                console.log("<ANT>" + balances['ANT'] + "</ANT>");
                console.log(token.tokenPrices);
                console.log("Value: " + values['ANT']);
            }
            if (token.network === 'arb-mainnet' && token.tokenAddress === '0xaf88d065e77c8cc2239327c5edb3a432268e5831') {
                balance = new BigNumber(token.tokenBalance, 16)/ Math.pow(10, 6);
                price = new BigNumber(token.tokenPrices[0].value);
                balances['ARBUSDC'] = balance.toFixed(6);
                prices['ARBUSDC'] = price.toFixed();
                values['ARBUSDC'] = price.times(balance).toFixed(5);
                console.log("<ARBUSDC>" + balances['ARBUSDC'] + "</ARBUSDC>");
                console.log(token.tokenPrices[0].value)
                console.log("Value: " + values['ARBUSDC']);
            }
            if (token.network === 'arb-mainnet' && token.tokenAddress === null) {
                balance = new BigNumber(token.tokenBalance, 16)/ Math.pow(10, 18);
                price = new BigNumber(prices['MAINETH'] || token.tokenPrices[0].value);
                balances['ARBETH'] = balance.toFixed(18);
                prices['ARBETH'] = price.toFixed(12);
                values['ARBETH'] = price.times(balance).toFixed(5);
                console.log("<ARBETH>" + balances['ARBETH'] + "</ARBETH>");
                console.log(token.tokenPrices)
                console.log("Value: " + values['ARBETH']);
            }
            if (token.network === 'eth-mainnet' && token.tokenAddress === null) {
                balance = new BigNumber(token.tokenBalance, 16)/ Math.pow(10, 18);
                price = new BigNumber(token.tokenPrices[0].value);
                balances['MAINETH'] = balance.toFixed(18);
                prices['MAINETH'] = price.toFixed(12);
                values['MAINETH'] = price.times(balance).toFixed(5);
                console.log("<MAINETH>" + balances['MAINETH'] + "</MAINETH>");
                console.log(token.tokenPrices)
                console.log("Value: " + values['MAINETH']);
            }
            if (token.network === 'eth-mainnet' && token.tokenAddress === '0x329c6e459ffa7475718838145e5e85802db2a303') {
                balance = new BigNumber(token.tokenBalance, 16)/ Math.pow(10, 18);
                price = new BigNumber(token.tokenPrices[0].value);
                balances['EMAID'] = balance.toFixed(18);
                prices['EMAID'] = price.toFixed(12);
                values['EMAID'] = price.times(balance).toFixed(5);
                console.log("<EMAID>" + balances['EMAID'] + "</EMAID>");
                console.log(token.tokenPrices)
                console.log("Value: " + values['EMAID']);
            }

        });

        const tokens = Object.keys(values);
        total = Object.values(tokens).reduce((acc, key) => {
            let bigacc = new BigNumber(acc);
            let bigvalue = new BigNumber(values[key]);
            if (bigvalue.isNaN()) {
                return acc; // Skip if value is NaN
            }
            if (bigvalue.isZero()) {
                return acc; // Skip if value is zero
            }
            if (bigvalue.isNegative()) {
                console.warn(`Negative value for ${key}: ${bigvalue.toString()}`);
                return acc; // Skip if value is negative
            }
            return bigacc.plus(bigvalue).toFixed();
        }, 0);
    } catch (error) {
        console.error(error);
    }

    return {
        wallet,
        balances,
        prices,
        values,
        total
    }

};