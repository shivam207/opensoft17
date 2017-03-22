pragma solidity ^0.4.7;
contract SimpleStorage {
  
  struct storedData {
    uint data;
  }
  

  mapping (uint => storedData) _storedDataArray;

  uint _count;

  function SimpleStorage() {
		_count = 0;
		
	}
  
  //function SimpleStorage(uint initialValue) {
  //  storedData = initialValue;
  //}

  //function set(uint x) {
  //  storedData = x;
  //}

  //function get() constant returns (uint retVal) {
  //  return storedData;
  //}

  
  function setNew(uint x) {
			_storedDataArray[_count].data = x;
			_count++;
	}
  
  function getNew(uint id) constant returns (uint retVal) {
		
		retVal = _storedDataArray[id].data;
		
	}


}
