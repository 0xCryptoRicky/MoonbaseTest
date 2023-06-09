const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://rpc.api.moonbase.moonbeam.network');

const tokenAddress = '0x1862a4107D2Db1def799d8884eAA47Eb96fc797a';

const address = '0x94A74b2bC1d38661e945D4172F3448F3bcDBA6fd';

const erc20Abi = [
  "function balanceOf(address owner) view returns (uint256)"
];

async function getBalance() {

  const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);

  const balance = await contract.balanceOf(address);

  console.log(`Balance: ${ethers.utils.formatEther(balance)} tokens`);
}

getBalance().catch(console.error);
