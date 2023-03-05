import { contractAddress, contractABI } from "./utils/constants";

const lotteryContract = web3 =>{
  return new web3.eth.Contract(contractABI, contractAddress); 
}
export default lotteryContract;