pragma solidity ^0.5.0;
import "installed_contracts/oraclizeAPI.sol";

contract CropSure is usingOraclize {

    address owner;

    event ConsoleLog(string data);
    event PaymentSucceeded();
    event PaymentFailed();
    event PaymentFailedNotEnoughEth();

    constructor() 
    payable
    public {
        // set owner address
        owner = msg.sender;

        // log to the JS console
        // emit ConsoleLog("Smart contract initialized.");

        // set smart contract address
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
    }

    function toString(address x) private returns (string memory str) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));

	string memory return_value = string(b);
        return return_value;
    }

    function __callback(bytes32 id, string memory result, bytes memory proof)
    public {
        // require(msg.sender == oraclize_cbAddress());

        emit PaymentSucceeded();
   }

    function executePayment(int32 amount, int32 condition) payable public returns (int32 succeeded) {
        emit PaymentSucceeded();

	// if (oraclize_getPrice("URL") > address(this).balance) {
	//	emit PaymentFailedNotEnoughEth();
	//} else {
		oraclize_query("URL", "json(http://weerlive.nl/api/json-data-10min.php?key=23576abdeb&locatie=Amsterdam).liveweer.0.d0neerslag");
	//}

        return 1;
    }
}
