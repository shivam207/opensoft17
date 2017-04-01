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
// var latitude = 3.4;
// var longitude = 2.3;

var lat1 = 3.4;
var long1 = 10.2;
var lat2 = 20.8;
var long2 = 50.3;

var deleted = [];
var arr=[];
var actualTags = [];
var locations = [];
var names = [];
var deletable = [];
// var tagImage = [];
// var tagLocation = [];
// var tagCategory = [];
function getImage1(){
    return arr;
    //return tagImage;
}

function getTags(){
    return actualTags;
    //return tagCategory;
}

function getTagandImage(){

    tagOutput = getTagOutput();
    return {img:tagOutput.img,
        loc:tagOutput.loc,
        cat:tagOutput.cat,
        name:tagOutput.name,
        delete:tagOutput.delete
    };

}

function InverseTag(tag)
{
    if(tag==0)
        return 'Animals';
    else if(tag==1)
        return 'Nature';
    else if(tag==2)
        return 'Objects';
    else if(tag==3)
        return 'People';
    else if(tag==4)
        return 'Birds';
}
var userName;

function getUserName() {
    return userName;
}

$("txtBox").bind("keydown", function(e) {
   if (e.keyCode === 13) return false;
});



$("myModal").bind("keydown", function(e) {
   if (e.keyCode === 13) return false;
});

function submitClicked(){
    //console.log("manish");
    userName=document.getElementById("txtBox").value;
    //console.log(userName);
    console.log(userName);
    if(userName!=''){
        //_username = username;

        ethPhoto.setUserName(userName.toString(),{"gas":4712388}).then(function(){
            ethPhoto.getUserName().then(function(username){
                console.log("the username is " + username)
              });
            });
        document.getElementById("Username").textContent=userName;
        modal.style.display = "none";
    }

    //return userName;
}

function retParam(){
    return {
        lat1 : lat1,
        long1 : long1,
        lat2 : lat2,
        long2 : long2

    };
}

function beforeUpload(){
    //document.querySelector('#show-dialog').disabled = true;
                notifyMe("Uploading Photo", "You will be notified after the photo is uploaded.", '../images/upload2.png');   
}

function afterUpload(fileName){
    //document.querySelector('#show-dialog').disabled = false;
    notifyMe("Photo Uploaded", fileName, '../images/upload2.png');
    callScreenAgain();
}
function getTagOutput() {
    var data = $('#select2').select2('data');
    var tags = [];

    for(var i=0;i<data.length;i++)
    {   tags.push(data[i].text)
    }

    var tagImage = [];
    var tagLocation = [];
    var tagCategory = [];
    var tagName = [];
    var tagDelete = [];
    if(tags.length == 0 )
        {tagImage = arr;
         tagLocation = locations;  
         tagCategory = actualTags; 
         tagName = names;
         tagDelete = deletable;
        }
    else
    {   
        for(var i=0;i<arr.length;i++)
        {
        for(var j=0;j<tags.length;j++)
        {
            if(actualTags[i] == tags[j])
                break;
        }
        if(j<tags.length)
        {  
            tagImage.push(arr[i]);
            tagLocation.push(locations[i]);
            tagCategory.push(actualTags[i]);
            tagName.push(names[i]);
            tagDelete.push(deletable[i]);
        }
        }
    }

    return {img:tagImage,
        loc:tagLocation,
        cat:tagCategory,
        name:tagName,
        delete:tagDelete
    };
} 

function setScreenPoints(latne, longne, latsw, longsw) {
    lat1 = latne;
    long1 = longne;
    lat2 = latsw;
    long2 = longsw;
    // console.log(lat1);
    // console.log(long1);
    // console.log(lat2);
    // console.log(long2);
    var elm = document.getElementById("viewphotoBtn");
    var isAdmin = elm.checked;
    //console.log("\n\n Admin\n\n" + isAdmin);
    
    
    console.log("printing tags");
    //console.log(tags)
    //var temp = []
    ethPhoto.browseImageOnMap(lat2.toString(), long2.toString(), lat1.toString(), long1.toString(),isAdmin).then(function(final) {
        // console.log("the url retrieved is :");
        if (final[0] != "") {
            locations = [];

            
            arr = final[0].split(' ');
            for (var i = 0; i < arr.length; i++) {
                arr[i] = EmbarkJS.Storage.getUrl(arr[i]);
                // console.log(arr[i]);
            };
            var arr1 = final[1].split(' ');
            var arr2 = final[2].split(' ');
            actualTags = final[3].split(' ');

            console.log("the tags is " + actualTags + 'and length is '+actualTags.length);
            for (var i = 0; i < arr2.length; i++) {
                locations.push({ lat: Number(arr1[i]), lng: Number(arr2[i]) });
            }
            names = final[4].split(' ');
            deletable = final[5];
            tagResult = getTagOutput();
            arr = tagResult.img;
            locations = tagResult.loc;
            actualTags = tagResult.cat;

            names = tagResult.name;

            // for (var i=0; i<arr.length; i++){
            //     console.log(arr[i]);
            //     imageExists(arr[i], function(exists){
            //         console.log(arr);
            //         console.log(arr[i]);
            //         console.log('RESULT: url=' + arr[i] + ', exists=' + exists);
            //         if (!exists){
            //             arr[i]='../images/load.gif'
            //         }
            //     });
            // }   
            
            console.log("can be deleted or not");
            console.log(Number(deletable[0]));
            //console.log("the new tags is " + actualTags + 'and length is '+actualTags.length);
            load_slider(arr,locations);
            setMarkers(locations,actualTags,arr,names);
        } else {
            load_slider([],[]);
            setMarkers([]);
        }
        return false;
    });
    
    // locations = get_locations(lat1,lat2,long1,long2);
    // setMarkers(locations);
}

// function imageExists(url, callback) {
//   var img = new Image();
//   img.onload = function() { callback(true); };
//   img.onerror = function() { callback(false); };
//   img.src = url;
//   console.log("-----")
//   console.log(url)
// }

// function setLatLang(lat,long) {
//   latitude = lat;
//   longitude = long;
//   // console.log("hiii" + latitude);
// }

function upload(input, x, y) {
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
    // console.log("ARBIT")
    var skillsSelect = document.getElementById("tag");
    var category_input = skillsSelect.options[skillsSelect.selectedIndex].text;
    if(category_input == 'Other')
        category_input = document.getElementById("othertext").value;
    console.log(category_input);
    var category = 0

    EmbarkJS.Storage.uploadFile(input).then(function(hash) {
        console.log("BEFORE")
        beforeUpload();
        singleSetMarker({lat:Number(x),lng:Number(y)});
        ethPhoto.saveImage(hash,x.toString(), y.toString(),category_input,{"gas":4712388}).then(function() {
            console.log("uploaded1");
            deleteSingleMarker(x,y);
            afterUpload(input[0].files[0].name);
        });

    });
}

function deleteImage(hash,lat,lng)
{
    console.log("before delete");
    notifyMe("Deleting Photo", "You will be notified after the photo is deleted.", '../images/delete1.png')
    ethPhoto.deleteImage_1(hash.toString(),lat.toString(),lng.toString(),{"gas":4712388}).then(function() {
        console.log("after delete");
        notifyMe("Photo Deleted", "", '../images/delete1.png');
        callScreenAgain();
    });
}