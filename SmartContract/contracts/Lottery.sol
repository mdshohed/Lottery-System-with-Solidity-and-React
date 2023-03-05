// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.18;

contract Lottery {
    address public manager;
    address payable[] public players;
    address[] public winners;
    uint public lotteryId; 
    
    constructor(){
        manager = msg.sender;
        lotteryId = 0; 
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(manager, block.timestamp)));
    }
    
    function pickWinner() public {
        require( msg.sender==manager );
        uint index = random() % players.length;
        players[index].transfer( address(this).balance); 
        winners.push(players[index]); 

        //Clear the playes array to start new lottery
        players = new address payable[](0);
        lotteryId++; 
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    function getBalance() public view returns (uint){
        // Solidity works in Wei
        return address(this).balance; 
    }

    function getPlayers()  public view returns (address payable[] memory) {
        return players;
    }

    function getWinners() public view returns(address[] memory){
        return winners;
    }
}   