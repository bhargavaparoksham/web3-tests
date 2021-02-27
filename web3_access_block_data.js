const Web3 = require('web3')
const dotenv = require('dotenv').config()
var url = process.env.MAINET

const mainnet = new Web3(url)


mainnet.eth.getBlockNumber().then(console.log)

//The above then function does the same thing as below funciton

//mainnet.eth.getBlockNumber((err, num) => {console.log(num)})

//(err, num) => {console.log(num) is a call back function to handle javascript promises.

//We can also use then function to handle js promises	

// mainnet.eth.getBlock('latest').then((block) => {
// 	console.log(block.hash)
// })


// mainnet.eth.getBlock(11914502).then((block) => {
// 	console.log({
// 		blockHash: block.hash,
// 		blockNum: block.number
// 	})
// })


mainnet.eth.getBlockNumber().then((latest) => {
	for(let i=0; i<10; i++) {
		mainnet.eth.getBlock(latest-i).then(console.log)
	}
})

//Note: Average block size in ethereum is ~ 25 to 50 KB


//Get Gas Price

//mainnet.eth.getGasPrice().then(console.log)

mainnet.eth.getGasPrice().then((result) => {

	console.log(mainnet.utils.fromWei(result,'gwei'))

})


//Use inbuit hashing function

console.log(mainnet.utils.sha3('TEST'))

console.log(mainnet.utils.keccak256('TEST'))

//Note: keccak256 is alias of sha3


//web3 & solidity generate different output for sha3 so,

console.log(mainnet.utils.soliditySha3('TEST'))


//Random Number Generator

//randomHex(length)

console.log(mainnet.utils.randomHex(2)) 


//underscore.js


console.log(mainnet.utils._) 










