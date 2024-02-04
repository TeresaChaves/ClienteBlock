// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MyTokenRoyalties {
    struct RoyaltiesInfo {
        uint256 totalAssigned;
        uint256 totalClaimed;
        uint256 totalIterations;
    }
    mapping(address => mapping(uint256 => RoyaltiesInfo)) public royaltiesInfo;

    function updateAssignedRoyalties(
        address _myTokenTemplate,
        uint256 totalSupply,
        uint256 amountPerToken
    ) public payable {
        // update the total assigned royalties for each specific token
        // update the total assigned royalties for each specific token iteration
        for (uint256 i = 0; i < totalSupply; i++) {
            royaltiesInfo[_myTokenTemplate][i].totalAssigned += amountPerToken;
            royaltiesInfo[_myTokenTemplate][i].totalIterations += 1;
        }
    }

    function getAmountToReceive(
        address _myTokenTemplate,
        uint256 tokenId
    ) public returns (uint256 amountToReceive) {
        uint256 assigned = royaltiesInfo[_myTokenTemplate][tokenId]
            .totalAssigned;
        uint256 claimed = royaltiesInfo[_myTokenTemplate][tokenId].totalClaimed;

        // Ensure that there are royalties to claim
        require(
            assigned > claimed,
            "There are no royalties to claim for this token"
        );

        // update the claimed royalties for the specific token
        royaltiesInfo[_myTokenTemplate][tokenId].totalClaimed = assigned;

        amountToReceive = assigned - claimed;

        return amountToReceive;
    }

    function getAmountToReceiveDetails(
        address _myTokenTemplate,
        uint256 tokenId
    ) public view returns (uint256 amountToReceive) {
        uint256 assigned = royaltiesInfo[_myTokenTemplate][tokenId]
            .totalAssigned;
        uint256 claimed = royaltiesInfo[_myTokenTemplate][tokenId].totalClaimed;

        amountToReceive = assigned - claimed;

        return amountToReceive;
    }
}
