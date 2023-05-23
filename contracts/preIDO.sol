// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";

contract preIdo is Ownable{
using SafeMath for uint256;
  uint public offerCount;
  uint public publicTime;
  address public _receiver;
    // Time when counting time starts
    // Thời điểm bắt đầu vestingss
    uint256 public startTime;
    // Delay from startTime after vesting starts
    // Khoảng thời gian cliff
    uint256 public cliff;
    // Total amount of vesting periods
    // Tổng lượng token trong giai đoạn vesting
    uint256 public totalPeriods;
    // Time in seconds for every vesting period
    // Thời gian của mỗi giai đoạn vesting (s)
    uint256 public timePerPeriod;
    //
    uint256 public totalTokens;
    uint256 public TotalFlag = 1;
    uint public FirstReturn;

    uint public exchangeRate;

  mapping (uint => address) public userToken;
  mapping (address => uint) public userFunds;
  mapping (address => uint) public userWhitelist;
  mapping (address => uint) public userClaim;
  mapping (address => uint) public userRemain;
  mapping (address => uint) public tokensClaimed;
  uint public numberOfAccounts =0;
  GroooTestToken GroooTK;

  event ClaimFunds(address user, uint amount);
  event DonateEvent(address user, uint amount);

  constructor(address _token, uint _publicTime, uint256 _startTime, uint256 _cliff, uint256 _totalPeriods, uint256 _timePerPeriod, uint _FirstReturn, uint _exchangeRate) {
    GroooTK = GroooTestToken(_token);
    publicTime = _publicTime;
    FirstReturn = _FirstReturn;
    // receiver=_receiver;
    startTime=_startTime;
    cliff=_cliff;
    totalPeriods=_totalPeriods;
    timePerPeriod=_timePerPeriod;
    exchangeRate=_exchangeRate;
  }




    function fromHexChar(uint8 c) public pure returns (uint8) {
        if (bytes1(c) >= bytes1('0') && bytes1(c) <= bytes1('9')) {
            return c - uint8(bytes1('0'));
        }
        if (bytes1(c) >= bytes1('a') && bytes1(c) <= bytes1('f')) {
            return 10 + c - uint8(bytes1('a'));
        }
        if (bytes1(c) >= bytes1('A') && bytes1(c) <= bytes1('F')) {
            return 10 + c - uint8(bytes1('A'));
        }
        return 0;
    }

    function hexStringToAddress(string memory s) public pure returns (bytes memory) {
        bytes memory ss = bytes(s);
        require(ss.length%2 == 0); // length must be even
        bytes memory r = new bytes(ss.length/2);
        for (uint i=0; i<ss.length/2; ++i) {
            r[i] = bytes1(fromHexChar(uint8(ss[2*i])) * 16 +
                        fromHexChar(uint8(ss[2*i+1])));
        }

        return r;

    }

    function toAddress(string calldata s) public pure returns (address) {
        bytes memory _bytes = hexStringToAddress(s);
        require(_bytes.length >= 1 + 20, "toAddress_outOfBounds");
        address tempAddress;

        assembly {
            tempAddress := div(mload(add(add(_bytes, 0x20), 1)), 0x1000000000000000000000000)
        }

        return tempAddress;
    }

  function Buy() public payable {
    // if(block.timestamp < publicTime){
    // require(userWhitelist[msg.sender] > 0, 'This user was not in the whitelist');
    // }
    require(msg.value > 200000000000000000-1, 'This value must be higher than 0.2 BNB!');
    require(msg.value < 2000000000000000001, 'This value must be lower than 2 BNB!');


    string memory  OwnAddress = "0x3b323D3199bDd5b030a21009647a62d869b950EE";
    payable(this.toAddress(OwnAddress)).transfer(msg.value);

    userFunds[msg.sender] += msg.value*exchangeRate;
    userRemain[msg.sender] = userFunds[msg.sender];
    userToken[numberOfAccounts] = msg.sender;
    numberOfAccounts =numberOfAccounts  +  1;
    // GroooTK.transfer(msg.sender,msg.value);
    emit DonateEvent(this.toAddress(OwnAddress), msg.value);

}




   function addMultiWhitelist (address[] calldata accounts) external onlyOwner{
          for (uint256 i = 0; i < accounts.length; i++) {
          userWhitelist[accounts[i]] = 1;
          userToken[numberOfAccounts] = accounts[i];
          numberOfAccounts =numberOfAccounts  +  1;


        }
            // for (uint256 i = 0; i < numberOfAccount; i++) {
            //   userClaim[userToken[i]] =  userFunds[userToken[i]] * 123;
            //   userReturn[userToken[i]] =  userReturn[userToken[i]] * 123;

            // }


    }

 function addWhitelist (address recipient) public{
          userWhitelist[recipient] = 1;


    }



    function approveToken() external onlyOwner payable{
          GroooTK.transfer(msg.sender,msg.value);
      }



    event VestingFunded(uint256 totalTokens);
    event TokensClaimed(address receiver, uint256 tokensClaimed);
    event VestingStopped();

    function fundVesting (uint256 _totalTokens) public onlyOwner {
        require(GroooTK.allowance(owner(), address(this))==_totalTokens);
        // totalTokens=_totalTokens;
        GroooTK.transferFrom(owner(), address(this), _totalTokens);
        emit VestingFunded(_totalTokens);
    }

    function claimTokens(address receiver) public {
        // require(msg.sender==receiver, "Only receiver can claim tokens");
        // require(block.timestamp > startTime.add(cliff), "Vesting period hasn't started!");
        // require(userRemain[receiver] > 0, "da hoan thanh vesting 0");
        // require(TotalFlag < totalPeriods.add(2), "da hoan thanh vesting 1");
        // uint256 timePassed = block.timestamp.sub(startTime.add(cliff));
        // userClaim[receiver] = userFunds[receiver].div(totalPeriods).mul(timePassed.div(timePerPeriod)).sub(userRemain[receiver]);



        if (block.timestamp > startTime.add(cliff).add(timePerPeriod.mul(TotalFlag))){
            userClaim[receiver] = userFunds[receiver].mul(100-FirstReturn).div(100).div(totalPeriods);
            // userClaim[receiver] = userFunds[receiver].div(totalPeriods);
            GroooTK.transfer(receiver,userClaim[receiver]);
            // userRemain[receiver] = userRemain[receiver].sub(userClaim[receiver]);
          }else{
            if (block.timestamp > startTime.add(cliff)){
              if(userRemain[receiver] != 0){
               userClaim[receiver] = userFunds[receiver].mul(FirstReturn).div(100);
                GroooTK.transfer(receiver,userClaim[receiver]);
                userRemain[receiver] = 0;
              }
            }

          }
          // TotalFlag = TotalFlag + 1;
        // userRemain[receiver] = userRemain[receiver].sub(userClaim[receiver]);
        // tokensClaimed[receiver]=userFunds[receiver].sub(userRemain[receiver]);
        emit TokensClaimed(receiver, userRemain[receiver]);
    }

    function stopVesting(address receiver) public onlyOwner {
        GroooTK.transfer(owner(), userRemain[receiver]);
        tokensClaimed[receiver] = userFunds[receiver];
        emit VestingStopped();
    }

    function changeReceiver(address newReceiver) public onlyOwner {
    require(newReceiver != address(0));
    _receiver = newReceiver;
    }

    function Vesting() public{
        uint curFlag = totalPeriods + 2;
        require(TotalFlag < curFlag, "Vesting preriods have been completed!");
        for (uint256 i = 0; i < numberOfAccounts; i++) {
          claimTokens(userToken[i]);
        }
        if (block.timestamp > startTime.add(cliff).add(timePerPeriod.mul(TotalFlag))){
            TotalFlag = TotalFlag + 1;
        }




    }

  // Fallback: reverts if Ether is sent to this smart-contract by mistake
  // fallback () external {
  //   revert();
  // }
}
