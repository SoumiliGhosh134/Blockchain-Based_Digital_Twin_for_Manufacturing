// Contract Info
const contractAddress = "0xA7bEce154c0D4CB72C7a92401713feC7811C2815";
const contractABI = [[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "assetId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "assetType",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "metadata",
				"type": "string"
			}
		],
		"name": "TwinCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "assetId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "metadata",
				"type": "string"
			}
		],
		"name": "TwinUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_assetId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_assetType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_metadata",
				"type": "string"
			}
		],
		"name": "createTwin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_assetId",
				"type": "string"
			}
		],
		"name": "getTwin",
		"outputs": [
			{
				"internalType": "string",
				"name": "assetId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "assetType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "metadata",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "twins",
		"outputs": [
			{
				"internalType": "string",
				"name": "assetId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "assetType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "metadata",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_assetId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_metadata",
				"type": "string"
			}
		],
		"name": "updateTwin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]];

let web3;
let contract;

// Initialize Web3 and contract
async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(contractABI, contractAddress, {
            from: accounts[0]
        });
        console.log("Web3 Initialized.");
    } else {
        alert("Please install MetaMask to use this application.");
    }
}

// Create Twin
document.getElementById("createTwinForm").onsubmit = async (e) => {
    e.preventDefault();
    const assetId = document.getElementById("assetId").value;
    const assetType = document.getElementById("assetType").value;
    const metadata = document.getElementById("metadata").value;

    try {
        await contract.methods.createTwin(assetId, assetType, metadata).send();
        alert("Digital Twin Created Successfully!");
    } catch (error) {
        console.error(error);
        alert("Error while creating twin.");
    }
};

// Update Twin
document.getElementById("updateTwinForm").onsubmit = async (e) => {
    e.preventDefault();
    const assetId = document.getElementById("updateAssetId").value;
    const status = document.getElementById("status").value;
    const metadata = document.getElementById("updateMetadata").value;

    try {
        await contract.methods.updateTwin(assetId, status, metadata).send();
        alert("Digital Twin Updated Successfully!");
    } catch (error) {
        console.error(error);
        alert("Error while updating twin.");
    }
};

// Get Twin Info
async function getTwin() {
    const assetId = document.getElementById("getAssetId").value;
    try {
        const twin = await contract.methods.getTwin(assetId).call();
        if (twin.assetId) {
            document.getElementById("twinInfo").innerHTML = `
                <p><strong>Asset ID:</strong> ${twin.assetId}</p>
                <p><strong>Asset Type:</strong> ${twin.assetType}</p>
                <p><strong>Status:</strong> ${twin.status}</p>
                <p><strong>Last Updated:</strong> ${new Date(twin.timestamp * 1000).toLocaleString()}</p>
                <p><strong>Metadata:</strong> ${twin.metadata}</p>
            `;
        } else {
            document.getElementById("twinInfo").innerHTML = "<p>Digital Twin not found.</p>";
        }
    } catch (error) {
        console.error(error);
        alert("Error retrieving twin data.");
    }
}

// Initialize App
window.addEventListener("load", init);
