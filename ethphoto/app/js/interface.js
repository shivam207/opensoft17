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
var actualTags = []
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
function retParam(){
    return {
        lat1 : lat1,
        long1 : long1,
        lat2 : lat2,
        long2 : long2

    };
}

function beforeUpload(){
    document.querySelector('#show-dialog').disabled = true;
                notifyMe("Uploading Photo", "You will be notified after the photo is uploaded.", '../images/upload2.png');   
}

function afterUpload(fileName){
    document.querySelector('#show-dialog').disabled = false;
    notifyMe("Photo Uploaded", fileName, '../images/upload2.png');
    callScreenAgain();
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
    var data = $('#select2').select2('data');
    var tags = [];
    for(var i=0;i<data.length;i++)
    {   if(data[i].text=='Animals') tags.push(0);
        else if(data[i].text == 'Nature') tags.push(1);
        else if(data[i].text == 'Objects') tags.push(2);
        else if(data[i].text == 'People') tags.push(3);
        else if(data[i].text == 'Birds') tags.push(4);
    }
    console.log("printing tags");
    console.log(tags)
    ethPhoto.browseImageOnMap(lat2.toString(), long2.toString(), lat1.toString(), long1.toString(),isAdmin,tags).then(function(final) {
        // console.log("the url retrieved is :");
        if (final[0] != "") {
            var locations = [];

            actualTags = final[3];
            arr = final[0].split(' ');
            for (var i = 0; i < arr.length; i++) {
                arr[i] = EmbarkJS.Storage.getUrl(arr[i]);
                // console.log(arr[i]);
            };
            var arr1 = final[1].split(' ');
            var arr2 = final[2].split(' ');
            for (var i = 0; i < arr2.length; i++) {
                locations.push({ lat: Number(arr1[i]), lng: Number(arr2[i]) });
            }
            
             
            // if(tags.length == 0 )
            //     {tagImage = arr;
            //      tagLocation = locations;  
            //      tagCategory = actualTags; 
            //  }
            //     else
            //     {   for(var i=0;i<arr.length;i++)
            //         {
            //         for(var j=0;j<tags.length;j++)
            //         {
            //             if(actualTags[i] == tags[j])
            //                 break;
            //         }
            //         if(j<tags.length)
            //         {
            //             tagImage.push(arr[i]);
            //             tagLocation.push(locations[i]);
            //             tagCategory.push(actualTags[i]);
            //         }
            //         }
            //     } 
            
            load_slider(arr,locations);
            setMarkers(locations)
        } else {
            load_slider([],[]);
            setMarkers([]);
        }
        return false;
    });
    
    // locations = get_locations(lat1,lat2,long1,long2);
    // setMarkers(locations);
}

// function setLatLang(lat,long) {
//   latitude = lat;
//   longitude = long;
//   // console.log("hiii" + latitude);
// }

function upload(x, y) {
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
    var input = $("#takeimage input[type=file]")
        // console.log(input)
    var skillsSelect = document.getElementById("tag");
    var category_input = skillsSelect.options[skillsSelect.selectedIndex].text;
    var category = 0
    switch (category_input) {
        case "Animals":
            category=0;
            break;
        case "Nature":
            category=1;
            break;
        case "Objects":
            category=2;
            break;
        case "People":
            category=3;
            break;
        case "Birds":
            category=4;
            break;
    }

    EmbarkJS.Storage.uploadFile(input).then(function(hash) {
        console.log("BEFORE")
        beforeUpload();
        singleSetMarker({lat:Number(x),lng:Number(y)});
        ethPhoto.saveImage(hash,x.toString(), y.toString(),category,{"gas":4712388}).then(function() {
            console.log("uploaded1");
            deleteSingleMarker();
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