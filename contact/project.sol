// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DigitalTwinFactory {
    struct DigitalTwin {
        string assetId;
        string assetType;
        string status;
        uint256 timestamp;
        string metadata;
    }

    address public owner;
    mapping(string => DigitalTwin) public twins;

    event TwinCreated(string assetId, string assetType, uint256 timestamp, string metadata);
    event TwinUpdated(string assetId, string status, uint256 timestamp, string metadata);

    // Modifier to allow only the contract owner to perform certain actions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Constructor to set the contract owner as the deployer
    constructor() {
        owner = msg.sender;
    }

    // Create a new digital twin for a factory asset
    function createTwin(
        string memory _assetId,
        string memory _assetType,
        string memory _metadata
    ) public onlyOwner {
        require(bytes(twins[_assetId].assetId).length == 0, "Digital Twin already exists");

        twins[_assetId] = DigitalTwin({
            assetId: _assetId,
            assetType: _assetType,
            status: "Created",
            timestamp: block.timestamp,
            metadata: _metadata
        });

        emit TwinCreated(_assetId, _assetType, block.timestamp, _metadata);
    }

    // Update an existing digital twin's status and metadata
    function updateTwin(
        string memory _assetId,
        string memory _status,
        string memory _metadata
    ) public onlyOwner {
        require(bytes(twins[_assetId].assetId).length != 0, "Digital Twin not found");

        twins[_assetId].status = _status;
        twins[_assetId].timestamp = block.timestamp;
        twins[_assetId].metadata = _metadata;

        emit TwinUpdated(_assetId, _status, block.timestamp, _metadata);
    }

    // Retrieve details of a digital twin using its assetId
    function getTwin(string memory _assetId) public view returns (
        string memory assetId,
        string memory assetType,
        string memory status,
        uint256 timestamp,
        string memory metadata
    ) {
        require(bytes(twins[_assetId].assetId).length != 0, "Digital Twin not found");

        DigitalTwin memory twin = twins[_assetId];
        return (twin.assetId, twin.assetType, twin.status, twin.timestamp, twin.metadata);
    }
}
