pragma solidity ^0.4.7;
contract ethPhoto {
  uint private noOfImages;
 
  bytes c=new bytes(0);
  bytes d=new bytes(0);

  struct Image{
    string latitude;
    string longitude;
    string hash1;
    string hash2;
    uint tag;
    address userid;
  }

  mapping (uint => Image) _images;


  function ethPhoto() {
    noOfImages = 0;
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

  /*function set(uint x) {
    storedData = x;
  }

  function get() constant returns (uint retVal) {
    return storedData;
  }*/

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

  function getNoofImages() constant returns (uint result){
    //result=noOfImages;
    return noOfImages;
  }


  function saveImage(string hash1,uint tag1 ){
    //Image tmp(hash1, tag1, tmp, tmp2);
   // _images[noOfImages]=Image(hash1,tag1,tmp,tmp2);
    _images[noOfImages].hash1=hash1;
    _images[noOfImages].tag=tag1;
    _images[noOfImages].userid=msg.sender;
   // _images[noOfImages].latitude=tmp;
   // _images[noOfImages].longitude=tmp2;
    //noOfImages++;
  }

  function saveImage1(string lat,string long ){

    _images[noOfImages].latitude=lat;
    _images[noOfImages].longitude=long;
    //_images[noOfImages].latitude=latitude1;
    //_images[noOfImages].tag=l2;
    // noOfImages++;
  }
  function saveImage2(string hash2){

    _images[noOfImages].hash2=hash2;
    //_images[noOfImages].latitude=latitude1;
    //_images[noOfImages].tag=l2;
    noOfImages++;
  }

  function stringToBytes32(string memory source) returns (bytes32 result) {
    assembly {
        result := mload(add(source, 32))
    }
  }

  function stringToUint(bytes memory b) constant returns (uint result) {
       // bytes memory b=bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint c = uint(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }

// compare string values
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
      //return c.length==0;
      //printf("%d",stringToUint(c));
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
   // val=stringToUint(c);
    
    return false;
  }

  function browseImageOnMap (string lat1,string long1,string lat2,string long2)constant returns(string _imageHash,string lat,string lng){
      uint i=0;
      uint flag1=0;
      uint flag2=0;
      if(compareValues(lat1,lat2)==false){
          flag1=1;
      }
      if(compareValues(long1,long2)==false){
          flag2=1;
      }
      _imageHash="";
      lat = "";
      lng = ""; //&& compareValues(lat1,_images[i].latitude) && compareValues(_images[i].latitude,lat2) && compareValues(long1,_images[i].longitude) && compareValues(_images[i].longitude,long2);
      for(i=0;i<noOfImages;i++)
      {
        if(bytes(_images[i].hash1).length == 0 || bytes(_images[i].hash2).length==0 || bytes(_images[i].latitude).length==0 || bytes(_images[i].longitude).length==0)
        {
            continue;
        }
        if(flag1 == 0 && flag2==0)
        {
          if(compareValues(lat1,_images[i].latitude) && compareValues(_images[i].latitude,lat2) && compareValues(long1,_images[i].longitude) && compareValues(_images[i].longitude,long2)){
            if (bytes(_imageHash).length == 0)
            {_imageHash = strConcat("",_images[i].hash1,_images[i].hash2);
            lat = strConcat("","",_images[i].latitude);
            lng = strConcat("","",_images[i].longitude);
            }
            else
            { 
                _imageHash=strConcat(_imageHash," ",_images[i].hash1);
                _imageHash = strConcat(_imageHash,_images[i].hash2,"");
                lat =strConcat(lat," ",_images[i].latitude);
                lng = strConcat(lng," ",_images[i].longitude);

            }
          }
        }   
        else {
              
              if( (flag1==1 && (compareValues(lat1,_images[i].latitude) || compareValues(_images[i].latitude,lat2)) ) || (flag1==0 && (compareValues(lat1,_images[i].latitude) && compareValues(_images[i].latitude,lat2)) ) )
              {
                if( (flag2==1 && (compareValues(long1,_images[i].longitude) || compareValues(_images[i].longitude,long2)) ) || (flag2==0 && (compareValues(long1,_images[i].longitude) && compareValues(_images[i].longitude,long2)) ) )  
                {
                    if (bytes(_imageHash).length == 0)
                     {_imageHash = strConcat("",_images[i].hash1,_images[i].hash2);
                      lat = strConcat("","",_images[i].latitude);
                      lng = strConcat("","",_images[i].longitude);
                    }
                    else
                    {_imageHash=strConcat(_imageHash," ",_images[i].hash1);
                      _imageHash = strConcat(_imageHash,_images[i].hash2,"");
                      lat =strConcat(lat," ",_images[i].latitude);
                      lng = strConcat(lng," ",_images[i].longitude);
                    }   
                }
              }
        }

    }
  }
  // function getImage(string longitude,string latitude) constant returns (string _imageHash){
  //  uint i = 0;
   
  //  _imageHash="";
  //  for(i=0;i<noOfImages;i++){
  //     string a=_images[i].longitude;
  //     string b=_images[i].latitude;
  //     if( compare(a,longitude)==true && compare(b,latitude)==true){
  //       if (bytes(_imageHash).length == 0)
  //         {
  //           _imageHash = strConcat("","",_images[i].hash);
  //         } 
  //       else  
  //      _imageHash=strConcat(_imageHash," ",_images[i].hash);
  //      //_imageTag[size]=_images[i].tag;
       
  //     }
  //   }
  // }

  // function deleteImage(string hash) constant returns (uint status){
  //   uint i=0;
  //   uint deleteIndex;
  //   for(i=0;i<noOfImages;i++){
  //     if(compare(_images[i].hash,hash)==true){
  //       if(_images[i].userid==msg.sender){
  //         deleteIndex=i;
  //         status=1;
  //       }
  //       else {
  //         status=0;
  //       }
  //       break;
  //     }
  //   }
  //   if(status==1){
  //     for(i=deleteIndex;i<noOfImages-1;i++){
  //       _images[i]=_images[i+1];
  //     }
  //     noOfImages--;
  //   }
  // }

  function getNum() constant returns(uint _result){
    // if(noOfImages > 0){

    //   _result = _images[noOfImages-1].hash;
    // }
    // else{
    //   _result = "Notset";
    // }
    _result = noOfImages;
  }
  function getHash() constant returns(string _result1,string _result2){
    // if(noOfImages > 0){

    //   _result = _images[noOfImages-1].hash;
    // }
    // else{
    //   _result = "Notset";
    // }
    if(noOfImages>0)
    {
       _result1 = _images[noOfImages-1].hash1;
       _result2 = _images[noOfImages-1].hash2;
    }
    else{
      _result1 = "Didnt Get 1";
      _result2 = "Didnt Get 2";
    } 
  }

  function getlong() constant returns(string _result){
    if(noOfImages>0)
    {
       _result = _images[noOfImages-1].longitude;

    }
    else{
      _result = "Didnt Get";
    } 
  }

  function getLat() constant returns(string _result){
    // if(noOfImages > 0){

    //   _result = _images[noOfImages-1].hash;
    // }
    // else{
    //   _result = "Notset";
    // }
    if(noOfImages>0)
    {
       _result = _images[noOfImages-1].latitude;
    }
    else{
      _result = "Didnt Get";
    } 
  }
  /*
  function showMyImages() internal constant returns (string _imageHash,uint[] _imageTag,string[] _imageLat,string[] _imageLong){
    uint size=0;
    uint i;
    for(i=0;i<noOfImages;i++){
      if(_images[i].userid==msg.sender){
        _imageHash[size]=_images[i].hash;
        _imageTag[size]=_images[i].tag;
        _imageLong[size]=_images[i].longitude;
        _imageLat[size]=_images[i].latitude;
        size++;
      }
    }
  }
  */

}