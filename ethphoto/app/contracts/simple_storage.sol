pragma solidity ^0.4.7;
contract ethPhoto{
  // ethPhoto1 et = new ethPhoto1();
  uint public noOfImages;
  uint noOfUsers;
  bytes c=new bytes(0);
  bytes d=new bytes(0); 
  
  uint[] _deletable;
  
  struct Image{
    string latitude;
    string longitude;
    string hash;
    string tag;
    string name;
    address userid;

  }

  mapping (uint => Image) public _images;
  mapping (address => string) _usernames;
  address[] _address;

  function ethPhoto() {
    noOfImages = 0;
    noOfUsers = 0;

  }


  function isUserRegistered() constant returns (bool){
    uint i=0;
    for(i=0;i<noOfUsers;i++){
      if(_address[i]==msg.sender)return true;
    }
    return false;
  }
    
    function strConcat(string _a, string _b,string _c) constant returns (string _result){
    bytes memory _ba = bytes(_a);
    bytes memory _bb = bytes(_b);
    bytes memory _bc = bytes(_c);
    string memory abcde = new string(_ba.length + _bb.length + _bc.length);
    bytes memory babcde = bytes(abcde);
    uint k = 0;
    for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
    for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
    for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
    return string(babcde);
  }

  function compare(string _a, string _b) returns (bool) {
    bytes memory a = bytes(_a);
    bytes memory b = bytes(_b);
    uint minLength = a.length;
    if(a.length!=b.length)return false;
    if (b.length < minLength) minLength = b.length;
    for (uint i = 0; i < minLength; i ++){
      if (a[i] != b[i])return false;
    }
        return true;
  }
  function stringToUint(bytes memory b) constant returns (uint result) {
        result = 0;
        for (uint i = 0; i < b.length; i++) {
            uint c = uint(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }
  function compareValues(string _a,string _b) constant returns (bool ){
    bytes memory a = bytes(_a);
    bytes memory b = bytes(_b);

    uint l1=a.length;
    uint l2=b.length;

    c=new bytes(0);
    d=new bytes(0);
    

    if(a[0]=='-' && b[0]!='-')return true;
    if(a[0]!='-' && b[0]=='-')return false;

    uint _i=0;
    uint i;

    uint flag=0;


    if(a[0]=='-'){
      _i=1;
    }

    uint minLength = a.length;
    if (b.length < minLength) minLength = b.length;
    for(i=_i;i<minLength;i++){
      if(a[i]=='.' && b[i]=='.'){

        if(stringToUint(c) < stringToUint(d)){
            if(_i==0) return true;
            else return false;
        }
        if(stringToUint(c) > stringToUint(d)){
            if(_i==0) return false;
            else return true;
        }
        flag=1;
        continue;
      }
      if(a[i]=='.'){
        if(_i==0) return true;
        else return false;
      }
      if(b[i]=='.'){
        if(_i==0) return false;
        else return true;
      }      
      if(flag==1){
        if(a[i]<b[i]){
            if(_i==0) return true;
            else return false;
        }
        if(a[i]>b[i]){
            if(_i==0) return false;
            else return true;
        }
        continue;
      }
      c.push(a[i]);
      d.push(b[i]);
    }

    if(flag==1){
      if(stringToUint(c) < stringToUint(d))
      {
            if(_i==0) return true;
            else return false;
      }
      if(stringToUint(c) > stringToUint(d))
      {
            if(_i==0) return false;
            else return true;
      }
    }
    if(a.length < b.length)
    {
        if(_i==0) return true;
        else return false;
    }
    if(a.length > b.length)
    {
        if(_i==0) return false;
        else return true;
    }
    if(flag==0){
      if(stringToUint(c) < stringToUint(d))
      {
        if(_i==0) return true;
        else return false;
      }
      if(stringToUint(c) > stringToUint(d))
      {
        if(_i==0) return false;
        else return true;
      }
    }
    
    return false;
  }

  function setUserName(string username) {
    _usernames[msg.sender]=username;
    _address.push(msg.sender);
    noOfUsers++;

  }


  function getUserName() constant returns(string username){
    username = _usernames[msg.sender];

  }
  

  function saveImage(string hash,string lat,string long,string tag1){
    _images[noOfImages].hash=hash;
    _images[noOfImages].tag=tag1;
    _images[noOfImages].latitude=lat;
    _images[noOfImages].longitude=long;
    _images[noOfImages].userid=msg.sender;
    _images[noOfImages].name = _usernames[msg.sender];
    noOfImages++;
    //
  }
    
  

  function browseImageOnMap (string lat1,string long1,string lat2,string long2,bool isAdmin)constant returns(string _imageHash,string lat,string lng,string _finalTags,string _username,uint[] _isDelete){
      uint i=0;
      uint flag1=0;
      uint flag2=0;
      //_finalTags.length = 0;
      if(compareValues(lat1,lat2)==false){
          flag1=1;
      }
      if(compareValues(long1,long2)==false){
          flag2=1;
      }
      _imageHash="";
      lat = "";
      lng = ""; //&& compareValues(lat1,_images[i].latitude) && compareValues(_images[i].latitude,lat2) && compareValues(long1,_images[i].longitude) && compareValues(_images[i].longitude,long2);
      _finalTags = "";
      _username = "";
      for(i=0;i<noOfImages;i++)
      { 
        if (isAdmin == true && msg.sender != _images[i].userid)continue;
        if(bytes(_images[i].hash).length == 0 || bytes(_images[i].latitude).length==0 || bytes(_images[i].longitude).length==0)
        {
            continue;
        }
        
        if(flag1 == 0 && flag2==0)
        {
          if(compareValues(lat1,_images[i].latitude) && compareValues(_images[i].latitude,lat2) && compareValues(long1,_images[i].longitude) && compareValues(_images[i].longitude,long2)){
            if (bytes(_imageHash).length == 0)
            {
              _imageHash = strConcat("","",_images[i].hash);
              lat = strConcat("","",_images[i].latitude);
              lng = strConcat("","",_images[i].longitude);
              _finalTags = strConcat("","",_images[i].tag);
              _username = strConcat("","",_images[i].name);
            }
            else
            { 
              _imageHash=strConcat(_imageHash," ",_images[i].hash);
              lat =strConcat(lat," ",_images[i].latitude);
              lng = strConcat(lng," ",_images[i].longitude);
              _finalTags = strConcat(_finalTags," ",_images[i].tag);
              _username = strConcat(_username," ",_images[i].name);

            }
            if(msg.sender == _images[i].userid) _deletable.push(1);
            else _deletable.push(0);
              
          }
        }   
        else {
              if( (flag1==1 && (compareValues(lat1,_images[i].latitude) || compareValues(_images[i].latitude,lat2)) ) || (flag1==0 && (compareValues(lat1,_images[i].latitude) && compareValues(_images[i].latitude,lat2)) ) )
              {
                if( (flag2==1 && (compareValues(long1,_images[i].longitude) || compareValues(_images[i].longitude,long2)) ) || (flag2==0 && (compareValues(long1,_images[i].longitude) && compareValues(_images[i].longitude,long2)) ) )  
                {
                    if (bytes(_imageHash).length == 0)
                    {
                     _imageHash = strConcat("","",_images[i].hash);
                    lat = strConcat("","",_images[i].latitude);
                    lng = strConcat("","",_images[i].longitude);
                    _finalTags = strConcat("","",_images[i].tag);
                    _username = strConcat("","",_images[i].name);
                    }
                    else
                    {
                      _imageHash=strConcat(_imageHash," ",_images[i].hash);
                      lat =strConcat(lat," ",_images[i].latitude);
                      lng = strConcat(lng," ",_images[i].longitude);
                      _finalTags = strConcat(_finalTags," ",_images[i].tag);
                      _username = strConcat(_username," ",_images[i].name);
                    }

                    if(msg.sender == _images[i].userid) _deletable.push(1);
                    else _deletable.push(0);  
                }
              }
        }
    }
    _isDelete = _deletable;
  }
  function deleteImage_1(string hash,string lat,string lng){
    uint deleteIndex;
    uint status = 0;
    for(uint i=0;i<noOfImages;i++)
    {
      if(compare(_images[i].hash,hash) && compare(_images[i].latitude,lat) && compare(_images[i].longitude,lng) && _images[i].userid==msg.sender){
        _images[i].hash = _images[noOfImages-1].hash;
        _images[i].latitude = _images[noOfImages-1].latitude;
        _images[i].longitude = _images[noOfImages-1].longitude;
        _images[i].userid = _images[noOfImages-1].userid;
        _images[i].tag = _images[noOfImages-1].tag;
        _images[i].name = _images[noOfImages-1].name;
        //index = i;
        noOfImages--;
        break;
      }
    }
  }

}