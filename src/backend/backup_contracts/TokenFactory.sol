// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NFTcollection.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MyTokenFactory is Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    event CollectionCreated(
        address indexed collectionAddress, 
        string name, 
        uint256 totalSupply, 
        uint256 initial_price,
        uint256 index
    );

    struct NFTCollectionInfo {
        string name;
        uint256 totalSupply;
        uint256 royaltiesToDistribute;
        uint256 initial_price;
        uint256 nextRoyalties;
        uint256 index;
    }

    address private newOwner;
    mapping(uint256 => address) public indexToAddress;
    mapping(address => NFTCollectionInfo) public nftCollections;
    Counters.Counter private _collectionIdCounter;


    function assignEth(address collection) public payable onlyOwner {
        require(msg.value > 0, "Amount must be higher than 0");
        require(
            nftCollections[collection].royaltiesToDistribute + msg.value > nftCollections[collection].royaltiesToDistribute, 
            "Overflow detected."
        );

        nftCollections[collection].royaltiesToDistribute += msg.value;
    }

    function unassignEth(address collection, uint256 _ethAmount) public onlyOwner {
        require(
            nftCollections[collection].royaltiesToDistribute > _ethAmount, 
            "The collection holdings is lower than the amount to withdraw."
        );
        require(
            nftCollections[collection].royaltiesToDistribute - _ethAmount < nftCollections[collection].royaltiesToDistribute, 
            "Overflow detected."
        );

        nftCollections[collection].royaltiesToDistribute -= _ethAmount;
        payable(owner()).transfer(_ethAmount);
    }

    function getRoyaltyAmount (address collection, address user) public view returns (uint256) {
        uint256 _ethAssigned = nftCollections[collection].royaltiesToDistribute;
        IERC721 _nftCollectionContract = IERC721(collection);
        uint256 _userBalance = _nftCollectionContract.balanceOf(user);
        uint256 proportion = _userBalance.mul(1 ether).div(_ethAssigned);
        return _ethAssigned.mul(proportion).div(1 wei);
    }

    function claimRoyalty (address collection, address _to) public {
        require(
            block.timestamp > nftCollections[collection].nextRoyalties, 
            "Royalties are not available yet."
        );
        uint256 weiAmount = getRoyaltyAmount(collection, msg.sender);
        require(weiAmount > 0, "User does not hold any hold any token of this collection");

        require(address(this).balance >= weiAmount, "Not enough balance");
        payable(_to).transfer(weiAmount);
    }


    function createNFTcollection (
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        uint256 _initial_price
    ) public onlyOwner {
        NFTcollection collection = new NFTcollection (
            _name,
            _symbol,
            _totalSupply,
            _initial_price
        );

        indexToAddress[_collectionIdCounter.current()] = address(collection);
        nftCollections[address(collection)] = NFTCollectionInfo(_name, _totalSupply, 0, _initial_price, 0, _collectionIdCounter.current());

        emit CollectionCreated(address(collection), _name, _totalSupply, _initial_price, _collectionIdCounter.current());
    }

    function setNextRoyaltyDate(address collection, uint256 date) public onlyOwner {
        nftCollections[collection].nextRoyalties = date;
    }

    // Transfer ownership
    function setNewOwner(address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }

    function acceptOwnership() public {
        require(msg.sender == newOwner, "Only new owner can accept ownership");
        transferOwnership(newOwner);
        emit OwnershipTransferred(owner(), newOwner);
        newOwner = address(0);
    }

    function getCollectionByIndex(uint256 _index) public view returns (NFTCollectionInfo memory) {
        return nftCollections[indexToAddress[_index]];
    }
}