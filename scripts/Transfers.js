require('dotenv').config();

const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://rpc.api.moonbase.moonbeam.network');

const privateKey = '57e0a0649aa48db041c9b486e61ac7addd80f972dff82a7c01dac2d08b596b3f';

const wallet = new ethers.Wallet(privateKey, provider);

console.log(process.env.PRIVATE_KEY);

const tokenAddress = '0x1862a4107D2Db1def799d8884eAA47Eb96fc797a';

const receiverAddress = '0xD720165D294224A7d16F22ffc6320eb31f3006e1';

const erc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)"
];


const contract = new ethers.Contract(tokenAddress, erc20Abi, wallet);

async function transferHalfBalance() {

  const balance = await contract.balanceOf(wallet.address);


  const halfBalance = balance.div(2);

  
  const tx = await contract.transfer(receiverAddress, halfBalance);
  
  const receipt = await tx.wait();

  console.log(`Transaction hash: ${receipt.transactionHash}`);
}

transferHalfBalance().catch(console.error);
console.log(process.env.PRIVATE_KEY);






