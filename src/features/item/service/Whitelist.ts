import {ethers} from 'ethers';
import {environments} from '../../../environments/environments';
let provider = new ethers.providers.StaticJsonRpcProvider(environments.provider);
let whitelist_abi = [{
    "inputs": [
     {
      "internalType": "address",
      "name": "_addr",
      "type": "address"
     },
     {
      "internalType": "uint256",
      "name": "count",
      "type": "uint256"
     }
    ],
    "name": "setNFTWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
   }];

let wsf_game_contract = environments.wsf_contract;
let private_key = environments.private_key;

export async function set_whitelist(
    walletId: any, count: number
) {
    try {
    let wallet = new ethers.Wallet(private_key)
    let walletSigner = wallet.connect(provider)
    let contract = new ethers.Contract(
        wsf_game_contract,
        whitelist_abi,
        walletSigner
    )

    return await contract.setNFTWhitelist(walletId, count);
    } catch (error) {
    return { message: error };
    }

}
