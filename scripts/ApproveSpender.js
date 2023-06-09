const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://rpc.api.moonbase.moonbeam.network')

const wallet = new ethers.Wallet('57e0a0649aa48db041c9b486e61ac7addd80f972dff82a7c01dac2d08b596b3f', provider);

// ERC20 Token contract address
const tokenAddress = '0x1862a4107D2Db1def799d8884eAA47Eb96fc797a';

// Spender address
const spenderAddress = '0xD720165D294224A7d16F22ffc6320eb31f3006e1';

// ERC20 ABI

const erc20Abi = [
  // ... your ERC20 token contract ABI
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function balanceOf(address account) public view returns (uint256)",
];

// Create contract instance
const contract = new ethers.Contract(tokenAddress, erc20Abi, wallet);

async function approveSpender() {
  // Get balance
  const balance = await contract.balanceOf(wallet.address);

  // Approve spender
  const approveTx = await contract.approve(spenderAddress, balance);

  // Wait for transaction to be mined
  const receipt = await approveTx.wait();

  console.log(`Transaction hash: ${receipt.transactionHash}`);
}

approveSpender().catch(console.error);

