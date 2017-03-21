function btnfun() {
    var src='/home/sasi/Desktop/minato.jpg';
    var img = document.createElement('img');
    img.src = src;
    document.body.appendChild(img);
}

function zoom(x1,y1,x2,y2) {
  eth_Photo.zoom(x1,y1,x2,y2).then(function(imagearr) {
  });
  return imagearr;
/*
  var imagearr=[{url:'/home/sasi/Desktop/minato.jpg',category:"none",lati=0.0, longi=0.0,hashval="ABCD"}]
  // document.body.appendChild(imagearr[0].url)
  document.getElementById("p1").innerHTML = imagearr[0].url;
  // document.getElementById("p1").innerHTML = "imagearr[0].url";
  document.getElementById(theImage).src='/home/sasi/Desktop/minato.jpg';
*/
}

function pointclick(x,y){
  eth_Photo.pointclick(x.toString(),y.toString()).then(function(hashString,catarr){
  });
  var hasharr= hashString.split(" ");
  url_arr=new Array(hasharr.length);
  var i;
  for(i=0;i<hasharr.length;i++)
    url_arr[i]=eth_Photo.get_url(hasharr[i]);
  var rval={u_arr:url_arr, h_arr:hasharr,c_arr:catarr};
  //for example access url_arr by using rval.u_arr
  return rval;
}


function view_my_images(){
  eth_Photo.view_my_images().then(function(latString,longString,hashString,catarr){
  });

  var hasharr= hashString.split(" ");
  var latarr = latString.split(" ");
  var longarr= longString.split(" ");
  url_arr=new Array(hasharr.length);
  var i;
  for(i=0;i<hasharr.length;i++)
    url_arr[i]=eth_Photo.get_url(hasharr[i]);
  var rval={lat_arr:latarr, lon_arr:longarr, h_arr:hasharr, u_arr:url_arr,c_arr:catarr};
  return rval;
}

function category(x1,y1,x2,y2,cat){
  //byte array to string should also be implemented
  eth_Photo.category(x1.toString(),y1.toString(),x2.toString(),y2.toString(),cat).then(function(imagearr){
  });
  return imagearr;
}

function delete(url){
  eth_Photo.delete(url).then(function(flag){
  });
  return flag;
}

function upload(x,y,file,category) {

  eth_Photo.uploadFile(file).then(function(Hash) {
  });

  var value = {lat:x,long:y, img:file, cat:category, hash:Hash};
  eth_Photo.insert(value);

  return value;
}