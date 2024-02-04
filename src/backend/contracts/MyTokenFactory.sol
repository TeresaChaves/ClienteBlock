// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./MyTokenTemplate.sol";
import "./MyTokenRoyalties.sol";

contract MyTokenFactory {
    MyTokenTemplate[] private myTokenTemplates;

    MyTokenRoyalties private mtr;

    struct MyTokenTemplateExtended {
        address contractAddress;
        string name;
        string symbol;
        string uri;
        uint256 totalSupply;
        uint256 availableSupply;
        uint256 price;
        uint256 sellBalance; //lo que se ha vendido de cada canción
        uint256 royaltyBalance; // el dinero a repartir generado = lo que habia que repartir - lo repartido + lo nuevo a repartir en la siguiente vez que se reciben royalties del sgae
    }

    mapping(address => MyTokenTemplateExtended) public myTokenTemplateExtendeds;

    constructor(address _myTokenRoyalties) {
        mtr = MyTokenRoyalties(_myTokenRoyalties);
    }

    /////////////////////////////////////////////////////////
    //MyTokenTemplate functions
    /////////////////////////////////////////////////////////

    function createMyTokenTemplate(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        uint256 _totalSupply,
        uint256 _price
    ) public {
        //Create the new token template
        MyTokenTemplate NewMyTokenTemplate = new MyTokenTemplate(
            _name,
            _symbol,
            _uri,
            _totalSupply
        );

        myTokenTemplates.push(NewMyTokenTemplate);

        MyTokenTemplateExtended
            storage newMyTokenTemplateExtended = myTokenTemplateExtendeds[
                address(NewMyTokenTemplate)
            ];

        newMyTokenTemplateExtended.contractAddress = address(
            NewMyTokenTemplate
        );
        newMyTokenTemplateExtended.name = _name;
        newMyTokenTemplateExtended.symbol = _symbol;
        newMyTokenTemplateExtended.uri = _uri;
        newMyTokenTemplateExtended.totalSupply = _totalSupply;
        newMyTokenTemplateExtended.availableSupply = _totalSupply;
        newMyTokenTemplateExtended.price = _price;
        newMyTokenTemplateExtended.sellBalance = 0;
        newMyTokenTemplateExtended.royaltyBalance = 0;
    }

    function getUserNFTIds(
        address _address
    ) public view returns (uint256[] memory numNFTs) {
        MyTokenTemplate myTokenTemplate = MyTokenTemplate(_address);

        return myTokenTemplate.getUserTokensIds(msg.sender);
    }

    function getMyTokenTemplateList() public view returns (address[] memory) {
        uint256 len = myTokenTemplates.length;

        if (len == 0) {
            // Return an empty array
            return new address[](0);
        } else {
            address[] memory result = new address[](len);
            uint256 resultIndex = 0;

            for (uint256 i = 0; i < len; i++) {
                result[resultIndex] = address(myTokenTemplates[i]);
                resultIndex++;
            }

            return result;
        }
    }

    function getMyTokenTemplateDetails(
        address _address
    )
        public
        view
        returns (MyTokenTemplateExtended memory myTokenTemplateExtended)
    {
        return myTokenTemplateExtendeds[_address];
    }

    /////////////////////////////////////////////////////////
    //Buy nfts functions
    /////////////////////////////////////////////////////////

    function buyMyTokenTemplateNFTs(
        address _address,
        uint256 _amount
    ) public payable {
        MyTokenTemplate myTokenTemplate = MyTokenTemplate(_address);

        require(_amount > 0, "The amount of tokens should be bigger than 0");
        require(
            _amount < myTokenTemplateExtendeds[_address].availableSupply,
            "The amount of tokens should be less than available supply"
        );
        require(
            msg.value == myTokenTemplateExtendeds[_address].price * _amount,
            "You should pay the exact amount of money"
        );

        myTokenTemplate.createNFT(msg.sender, _amount);
        myTokenTemplateExtendeds[_address].sellBalance += msg.value;
        myTokenTemplateExtendeds[_address].availableSupply -= _amount;
    }

    function addMyTokenTemplateRoyaltyBalance(
        address _myTokenTemplate
    ) public payable {
        myTokenTemplateExtendeds[_myTokenTemplate].royaltyBalance += msg.value;
        require(msg.value > 0, "RoyaltyAmount should be bigger than 0");

        uint256 totalSupply = myTokenTemplateExtendeds[_myTokenTemplate]
            .totalSupply;
        uint256 amountPerToken = msg.value / totalSupply;

        mtr.updateAssignedRoyalties(
            _myTokenTemplate,
            totalSupply,
            amountPerToken
        );
    }

    /////////////////////////////////////////////////////////
    //Function to claim portfolio royalties
    /////////////////////////////////////////////////////////

    function claimRoyalties(
        address _myTokenTemplate,
        uint256[] memory tokenIds
    ) public {
        uint256 totalAmountToReceive = 0;

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];

            // Check that the caller is the owner of each token
            require(
                MyTokenTemplate(_myTokenTemplate).ownerOf(tokenId) ==
                    msg.sender,
                "Caller not the owner of token"
            );

            //get totalAmountToReceive
            uint256 amountToReceive = mtr.getAmountToReceive(
                _myTokenTemplate,
                tokenId
            );

            totalAmountToReceive += amountToReceive;
        }
        // Ensure that the contract has enough balance to pay
        require(
            address(this).balance >= totalAmountToReceive,
            "Contract has insufficient balance"
        );

        address payable _to = payable(msg.sender);
        _to.transfer(totalAmountToReceive);
    }

    function getRoyaltiesInfo(
        address _myTokenTemplate,
        uint256 tokenId
    ) public view returns (uint256 royaltyInfobyToken) {
        return mtr.getAmountToReceiveDetails(_myTokenTemplate, tokenId);
    }
}
