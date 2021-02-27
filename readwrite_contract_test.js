const ethTx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const dotenv = require('dotenv').config()
var url = process.env.ROPSTEN


const testnet = new Web3(url)

const acc1 = process.env.ACCOUNT_1
const acc2 = process.env.ACCOUNT_1

const key1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const key2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')


//testnet.eth.getBalance(acc1, (err, bal) => {console.log('acc1 balance: ',testnet.utils.fromWei(bal,'ether'))})

//Contract Address is from Ropsten
//Contract ABI is from truffle project -> Build folder -> ABI

const contractAddress= '0x471B19448d081Ad706F7B09DA0a4689E8C0f2819'
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getGreeting",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
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
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

//Instantiate Contract  

var hello_contract = new testnet.eth.Contract(contractABI,contractAddress)
 

//Read from smart contract

hello_contract.methods.getGreeting().call((err,result) => {console.log(result)})


//Write to smart contract

testnet.eth.getTransactionCount(acc1, (err, txCount) => {

	//Get Smart Contract Data
	//Smart contract byte code is taken from truffle -> build folder -> Hello.json

  const Data = hello_contract.methods.setGreeting('Fuck Yes').encodeABI()

	//Transaction Data

 	//console.log(txCount)
	const tx = new ethTx({ 
		nonce: testnet.utils.toHex(txCount), 
		gasLimit: testnet.utils.toHex(1000000), 
		gasPrice: testnet.utils.toHex(testnet.utils.toWei('10','gwei')),
		to: contractAddress,
		data: Data}, 
		{chain:'ropsten'})

	//Sign the transaction
	tx.sign(key1)
	const serialTx = tx.serialize() //raw needs to be serialized
	const raw = '0x' + serialTx.toString('hex')

	//Broadcast the transaction 
	testnet.eth.sendSignedTransaction(raw, (err, txHash) => {
		console.log('Error: ',err,'Transaction Successful, txHash: ',txHash)

	})


})



















