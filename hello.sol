pragma solidity >=0.6.0 <0.8.0;

contract Hello {


	string  greeting;

	constructor() public {
		greeting = "Hello World";
	}

	function getGreeting() public view returns(string memory) {
		return greeting;
	}


	function setGreeting(string memory _greeting) public {
		greeting = _greeting;
	}


}