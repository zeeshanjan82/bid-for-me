// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Bidder {

    struct OptionPos {
        uint pos;
        bool exists;
    }

    uint[] public bids;
    mapping (address => bool) hasDoneBiding;
    mapping (string => OptionPos) posOfOption;
    string[] public options;
    bool biddingStarted;

    function addOption(string memory option) public {
        require(!biddingStarted, "Bidding has already started");
        options.push(option);
    }

    function getOption(string memory option) public view returns (bool) {
        for(uint i; i < options.length; i++) {
            if(keccak256(abi.encodePacked(options[i])) == keccak256(abi.encodePacked(option))) {
                return true;
            }
        }
        return false;
    } 

    function getOptionsCount() public view returns (uint) {
        return options.length;
    }

    function startBidding() public {
        require(!biddingStarted, "Bidding has already started");
        bids.length = options.length;

        for(uint i = 0; i < options.length; i++) {
            OptionPos memory option = OptionPos(i, true);
            posOfOption[options[i]] = option;
        }
        biddingStarted = true;
    }

    function bid(uint option) public {
        require(0 <= option && option < options.length, "Invalid option");
        require(!hasDoneBiding[msg.sender], "Account has already done bidding");

        hasDoneBiding[msg.sender] = true;
        bids[option] = bids[option] + 1;
    }

    function bid(string memory option) public {
        require(!hasDoneBiding[msg.sender], "Account has already done biding");
        OptionPos memory optionPos = posOfOption[option];
        require(optionPos.exists, "Option does not exist");

        hasDoneBiding[msg.sender] = true;
        bids[optionPos.pos] = bids[optionPos.pos] + 1;
    }

    function getBids() public view returns (uint[] memory) {
        return bids;
    }
}