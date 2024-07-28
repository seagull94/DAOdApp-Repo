import Web3 from 'web3';

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try {
    window.ethereum.enable(); // Request access to MetaMask
  } catch (error) {
    console.error("User denied account access");
  }
} else if (window.web3) { // Legacy dapp browsers...
  web3 = new Web3(window.web3.currentProvider);
} else { // Non-dapp browsers...
  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

export default web3;
