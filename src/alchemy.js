// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";
let api_key = process.env.API_KEY || '';
let balances = {};

const arb_config = {
  apiKey: api_key,
  network: Network.ARB_MAINNET,
};
const alchemy_arb = new Alchemy(arb_config);
const eth_config = {
  apiKey: api_key,
  network: Network.ETH_MAINNET,
};
const alchemy_eth = new Alchemy(eth_config);

// Address we want get balances for
const toAddress = "0x9C1b147e73A46DDd1a59E3E00A2A88DFFA67e63e";


/*
const res = await alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  //fromAddress: "0x0000000000000000000000000000000000000000",
  //fromAddress: "0x36b5c208fb86d802af97573fe9c8c7590da55f93",
  toAddress: toAddress,
  maxCount: 1,
  excludeZeroValue: true,
  contractAddresses: ["0xa78d8321B20c4Ef90eCd72f2588AA985A4BDb684"],
  category: ["erc20", "external"],
});
console.log(res);
*/
function getBalance(wallet) {

const arb_main = alchemy_arb.core.getTokenBalances(wallet);
arb_main.then((res) => {
    console.log("<BALANCE>");
    console.log("<WALLET>" + wallet + "</WALLET>");
    console.log("<NETWORK>ARB</NETWORK>");
  res.tokenBalances.map((token) => {
    if (token.contractAddress === '0xa78d8321b20c4ef90ecd72f2588aa985a4bdb684') {
        balances['ANT']=parseInt(token.tokenBalance, 16);
        console.log("<ANT>" + parseInt(token.tokenBalance, 16) + "</ANT>");
    }
    if (token.contractAddress === '0xf224dbc383874ecf3d8c1a63736fd914c30448a3') {
        balances['ARBETH']=parseInt(token.tokenBalance, 16);
        console.log("<ARBETH>" + parseInt(token.tokenBalance, 16) + "</ARBETH>");
    }
  });
    console.log("</BALANCE>");
}).catch((err) => {
  console.error("Error fetching token balances:", err);
});
}

getBalance(toAddress);
getBalance("0x77Cf50945Db7A93DE3CAb535220570E2dCe7f91E");