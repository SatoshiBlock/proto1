pragma solidity ^0.5.0;
import "installed_contracts/oraclizeAPI.sol";

contract CropSure is usingOraclize {

    address owner;

    event ConsoleLog(string data);
    event PaymentSucceeded();
    event PaymentFailed();

    constructor() 
    payable
    public {
        // set owner address
        owner = msg.sender;

        // log to the JS console
        emit ConsoleLog("Smart contract initialized.");

        // set smart contract address
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
    }

    function test() public returns (uint succeeded) {
        emit PaymentSucceeded();

        return 1;
    }
}
