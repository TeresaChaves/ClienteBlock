// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyTokenTemplate is ERC721Royalty, Pausable, Ownable {
    //Contadores para los IDs de los NFTs
    using Counters for Counters.Counter;
    Counters.Counter private _tokensIds;

    uint256 private totalIssuedTokens;

    string public uri;
    uint256 public totalSupply;

    ////////////////////////////////////
    //Constructor
    ////////////////////////////////////
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        uint256 _totalSupply
    ) ERC721(_name, _symbol) {
        uri = _uri;
        totalSupply = _totalSupply;
    }

    ////////////////////////////////////
    //Public Functions
    ////////////////////////////////////

    function createNFT(address _buyer, uint256 _amount) public {
        require(
            totalSupply - _tokensIds.current() >= _amount,
            "Not enough token left to buy"
        );

        for (uint256 i = 0; i < _amount; i++) {
            _tokensIds.increment();
            uint256 newTokenId = _tokensIds.current();
            _safeMint(_buyer, newTokenId);
        }

        totalIssuedTokens = _tokensIds.current();
    }

    function getUserTokensIds(
        address _owner
    ) public view returns (uint256[] memory userTokensIds) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 resultIndex = 0;

            for (uint256 i = 1; i <= totalIssuedTokens; i++) {
                if (ownerOf(i) == _owner) {
                    result[resultIndex] = i;
                    resultIndex++;
                }
            }

            return result;
        }
    }

    ////////////////////////////////////
    //Overrided Functions
    ////////////////////////////////////

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireMinted(tokenId);

        return string(abi.encodePacked(uri));
    }
}
