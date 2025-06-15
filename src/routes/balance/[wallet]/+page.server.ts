import type { PageServerLoad } from './$types';
import { Alchemy, Network } from "alchemy-sdk";
let api_key = process.env.API_KEY || '';
import { API_KEY } from '$env/static/private';
let balances = {
  'ANT': 0,
  'ARBETH': 0}
const arb_config = {
  apiKey: API_KEY,
  network: Network.ARB_MAINNET,
};
const alchemy_arb = new Alchemy(arb_config);

export  const load: PageServerLoad = async ( event ) => {
    const { wallet } = event.params;
    const arb_main = alchemy_arb.core.getTokenBalances(wallet);
    arb_main.then((res) => {
    console.log(res)
    console.log("<BALANCE>");
    console.log("<WALLET>" + wallet + "</WALLET>");
    console.log("<NETWORK>ARB</NETWORK>");
  res.tokenBalances.map((token) => {
    if (token.contractAddress === '0xa78d8321b20c4ef90ecd72f2588aa985a4bdb684') {
        balances['ANT']=parseInt(token.tokenBalance, 16);
        console.log("<ANT>" + parseInt(token.tokenBalance, 16) + "</ANT>");
    }
    if (token.contractAddress === '0x82af49447d8a07e3bd95bd0d56f35241523fbab1') {
        balances['ARBETH']=parseInt(token.tokenBalance, 16);
        console.log("<ARBETH>" + parseInt(token.tokenBalance, 16) + "</ARBETH>");
    }
  });
    console.log("</BALANCE>");
}).catch((err) => {
  console.error("Error fetching token balances:", err);
});


    return {
        message: 'Hello Dawning!',
        wallet,
        balances
    }

};