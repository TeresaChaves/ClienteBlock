// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


//falta añadir el tema de royalties

contract NFTcollection is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public totalSupply;
    uint256 public price;
    string public baseUri;

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply, uint256 _price) ERC721(_name, _symbol) {
        totalSupply =_totalSupply;
        price =_price;
    }

    /////////////////////////////////////////////
    // Pause functions
    /////////////////////////////////////////////
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /////////////////////////////////////////////
    // Price functions
    /////////////////////////////////////////////
    function updatePrice(uint256 _price) external onlyOwner{
        price = _price;
    }

    /////////////////////////////////////////////
    // Uri functions
    /////////////////////////////////////////////
    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.creditsong"; //esto hay que mejorarlo pasando tambien a la url el nombre del token para que asi cada coleccion sea unica
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI)) : "";
    }

    /////////////////////////////////////////////
    // Mint functions
    /////////////////////////////////////////////
    function safeMint(uint256 _amount) public payable {
        require(totalSupply > _amount + _tokenIdCounter.current() + 1,"Not enough tokens left to buy."); 
        require(msg.value >= price * _amount, "Amount of ether sent not correct."); 
    
    for(uint256 i = 0; i < _amount; i++){
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(msg.sender, tokenId);
        }
}

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}

