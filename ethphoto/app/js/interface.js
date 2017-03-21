/*
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

}
*/

// function pointclick(x,y){
//   /******* pointclick

//   This function takes latitude and longitude as arguments and this calls the backend function
//   eth_Photo.pointclick() to get the hashString, and category array
//   this hashString consists of hash strings separated by spaces.
//   It is split by the spaces into an array hasharr which is an array containing all the hashes of the images
//   present at the clicked location.
//   catarr is an array of category ids and this array has a one-one correspondence with the hashes of the images present in the
//   hasharr. All the Urls of images are obtained by calling the function eth_Photo.get_url() present in the backend
//   Finally, an object rval is returned which contains the following:
//   1. Array of URLs of images
//   2. Array of Hashes of images
//   3. Array of Categories of images
//   All the three arrays have one-to-one correspondence.
//   *****/
//   eth_Photo.pointclick(x.toString(),y.toString()).then(function(hashString,catarr){
//   });
//   var hasharr= hashString.split(" ");
//   url_arr=new Array(hasharr.length);
//   var i;
//   for(i=0;i<hasharr.length;i++)
//     url_arr[i]=eth_Photo.get_url(hasharr[i]);
//   var rval={u_arr:url_arr, h_arr:hasharr,c_arr:catarr};
//   //for example access url_arr by using rval.u_arr
//   return rval;
// }


// function view_my_images(){
//   eth_Photo.view_my_images().then(function(latString,longString,hashString,catarr){
//   });

//   var hasharr= hashString.split(" ");
//   var latarr = latString.split(" ");
//   var longarr= longString.split(" ");
//   url_arr=new Array(hasharr.length);
//   var i;
//   for(i=0;i<hasharr.length;i++)
//     url_arr[i]=eth_Photo.get_url(hasharr[i]);
//   var rval={lat_arr:latarr, lon_arr:longarr, h_arr:hasharr, u_arr:url_arr,c_arr:catarr};
//   return rval;
// }

// function category(x1,y1,x2,y2,cat){
//   //byte array to string should also be implemented
//   eth_Photo.category(x1.toString(),y1.toString(),x2.toString(),y2.toString(),cat).then(function(imagearr){
//   });
//   return imagearr;
// }

// function delete(url){
//   eth_Photo.delete(url).then(function(flag){
//   });
//   return flag;
// }

function upload() {
  /**** Upload
  Upload function is called by the arguments latitude,longitude, file, category.
  Hash of the image uploaded is obtained by calling the function eth_Photo.uploadFile()
  The uploaded image data is sent through the function eth_Photo.insert() so that the contracts
  can be appended in solidity.
  Finally the object returned has the following:
  1. latitude
  2. longitude
  3. file URL
  4. category
  5. hashkey
  ****/
  var x = 40
  var y = -70
  var file = "file:///home/sayan/Pictures/activityDiagIssueRes.png"
  var category = 1
  console.log("Hello");
  EmbarkJS.Storage.uploadFile(input).then(function(hash) {
  });

  var value = {lat:x,long:y, img:file, cat:category, hash:Hash};
  eth_Photo.insert(x.toString(),y.toString(),cat,hash);

  return value;
}