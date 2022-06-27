import {ethers} from 'ethers';
import {environments} from '../../../environments/environments';
let provider = new ethers.providers.StaticJsonRpcProvider(environments.provider);
let whitelist_abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "setNFTWhitelist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let wsf_game_contract = environments.wsf_contract;
let private_key = environments.private_key;

export function set_whitelist(
    walletId: any
) {
    console.log(':: ~ wsf_game_contract', wsf_game_contract)
    console.log(':: ~ private_key', private_key)
    let wallet = new ethers.Wallet(private_key)
    let walletSigner = wallet.connect(provider)
    let contract = new ethers.Contract(
        wsf_game_contract,
        whitelist_abi,
        walletSigner
    )

    contract.setNFTWhitelist(walletId).then((transferResult: any) => {
        return { message: transferResult };

    }).catch((err: any) => {
        return { message: err };
    });

}
