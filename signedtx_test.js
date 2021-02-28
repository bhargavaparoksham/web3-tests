const ethTx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const dotenv = require('dotenv').config()

//Rpsten testnet link using Infura
var url = process.env.ROPSTEN 


const testnet = new Web3(url)

// To crosscheck transactions: https://ropsten.etherscan.io/ 
//To send Raw transaction: https://ropsten.etherscan.io/pushTx

//create 2 new accounts in metamask and copy the address
//use https://faucet.ropsten.be/ to get test ether in one of the accounts
//rinkeyby faucet: https://faucet.rinkeby.io/

const acc1 = process.env.ACCOUNT_1
const acc2 = process.env.ACCOUNT_2

//console.log(testnet.eth.accounts.create())
//you can also create a new account using the above line, in node commandline, instead of metamask and get the address from there.


const key1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const key2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

//Buffer converts privatekey into binary data (buffer needs private key without 0x)


//testnet.eth.getBalance(acc1, (err, bal) => {console.log('acc1 balance: ',testnet.utils.fromWei(bal,'ether'))})

//Get transaction count for nonce, wait & then once you get it initiate the transaction

testnet.eth.getTransactionCount(acc1, (err, txCount) => {


	//Build the transaction

 	//console.log(txCount)
	const tx = new ethTx({ 
		nonce: testnet.utils.toHex(txCount), 
		to: acc2, 
		value: testnet.utils.toHex(testnet.utils.toWei('0.1','ether')), 
		gasLimit: testnet.utils.toHex(21000), 
		gasPrice: testnet.utils.toHex(testnet.utils.toWei('10','gwei'))}, 
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
