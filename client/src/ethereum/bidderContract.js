import { web3 } from './web3';
import bidderAbi from './bidderAbi';

export function createContract(contractAddress) {
    return new web3.eth.Contract(bidderAbi, contractAddress)
}