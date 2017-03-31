// File Upload
var user_hide=false;

function readURL(input) {
    
    console.log("---------")
    // console.log(input)
    if (input && input[0].files[0]) {
        console.log("inside")
        var reader = new FileReader();
        // $("#filename").text(input[0].files[0].name);
        console.log(input[0].files[0].name);
        // $("#filename").removeClass("hidden");
        photoLocation(input);
    }

};

function photoLocation(input){

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //     function() {
    //         console.log("Location Available");
    //         var elm = document.getElementById("current_loc");
    //         if (true != elm.checked) {
    //             elm.click();
    //         }
    //     },
    //     function() { 
    //         console.log("Location Blocked"); 
    //         document.querySelector('#current_loc').parentElement.MaterialCheckbox.disable();
    //     });
            
    // } 
    // else {
    //     document.querySelector('#current_loc').parentElement.MaterialCheckbox.disable();
    //     console.log("Location Not.");
    // }

    console.log("photoloc");

    EXIF.getData(input[0].files[0], function() {
        // console.log("Happy");
        var lat = EXIF.getTag(this, "GPSLatitude");
        // var lon = EXIF.getTag(this, "GPSLongitude");
        // var latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";
        // var lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "W";
        console.log(lat)
        console.log("----------")
        if (lat == undefined) {
            toggle(false, "geotag_loc");
            document.querySelector('#geotag_loc').parentElement.MaterialCheckbox.disable();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                function() {
                    console.log("Location Available");
                    var elm = document.getElementById("current_loc");
                    if (true != elm.checked) {
                        elm.click();
                    }
                },
                function() { 
                    console.log("Location Blocked"); 
                    document.querySelector('#current_loc').parentElement.MaterialCheckbox.disable();
                });
            
            } 
        else {
            document.querySelector('#current_loc').parentElement.MaterialCheckbox.disable();
            console.log("Location Not.");
            }
        }
        else {

            document.querySelector('#geotag_loc').parentElement.MaterialCheckbox.enable();
            toggle(true, "geotag_loc");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                function() {
                    console.log("Location Available");
                    // var elm = document.getElementById("current_loc");
                    // if (true != elm.checked) {
                    //     elm.click();
                    // }
                },
                function() { 
                    console.log("Location Blocked"); 
                    document.querySelector('#current_loc').parentElement.MaterialCheckbox.disable();
                });
            
            } 
            else {
                document.querySelector('#current_loc').parentElement.MaterialCheckbox.disable();
                console.log("Location Not.");
            }
        }


    })
}

function toggle(checked, checkboxId) {
    var elm = document.getElementById(checkboxId);
    if (checked != elm.checked) {
        elm.click();
    }
}

function load_slider(images,locations) {

    // $("#mycarousel").destroy();

    var len = images.length

    var template = '<div>  \
                        <div class="thumbnails_map" data-markerid={{idx}}>\
                            <a class = "slider" data-lightbox="example-set" data-eth_lat={{lat}} data-eth_lng={{lng}} href={{href}}>\
                                <img  data-lazy={{src}} height="130" alt="" />\
                            </a>\
                        </div>\
                    </div> ';

    // var template = '<div class="mdl-card">  \
    //                     <div class="mdl-card__media thumbnails_map" data-markerid={{idx}}><a class="slider" data-lightbox="example-set" href={{href}}><img  data-lazy={{src}} width="180" height="180" border="10"  alt="" /></a>\
    //                     </div>\
    //                 </div> ';                


    accumulator = "<div><label id='hidebuttonclass' class='image_input_button mdl-button mdl-js-button mdl-js-ripple-effect' onclick='hide_slider()'>\
    <i class='material-icons' id='hidebutton'>expand_more</i></label></div><div id='mycarousel'>";
    $(images).each(function(index) {
       element = Mustache.render(template, { "src": this, "lat": locations[index].lat, "lng": locations[index].lng, "idx": index, "href": this});
        //console.log("index is " + index);
        // element = '<div><div class="image"><img data-lazy="' + this + '"/></div></div>';
        accumulator += element;
    });
    accumulator += "</div>";
    $("#carousel_container").html("");
    // Slider
    if (len > 0) {
        $("#carousel_container").html(accumulator);
        var initialSlide = 0;
        if(len < 5)
            initialSlide = 0;
        else if(len == 5)
            initialSlide = 1;
        $('#mycarousel').slick({
            initialSlide: initialSlide,
            infinite: false,
            slidesToShow: 5,
            lazyLoad: 'ondemand',
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            variableWidth: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 3
                }
            }, {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 1
                }
            }]
        });
        $(".thumbnails_map").on("mouseenter", function(){
            //console.log("hovered");
            gmarkers[$(this).data('markerid')].setAnimation(google.maps.Animation.BOUNCE);

        });
        $(".thumbnails_map").on("click", function(){
            //console.log("hovered");
            //gmarkers[$(this).data('markerid')].setAnimation(google.maps.Animation.BOUNCE);
            //console.log("hidshdi");
            // var hash1 = "QmdT2KSpm8ZxV1rCof3hxGV";
            // var hash2 = "2McNrEo8dYJzr1MhNVHdf4q";
            // //var hash1 = "QmUAUoEKfBjHyoyyuqxBaDw";
            // //var hash2 = "rXfZPS9re9Pp6VVY1nvvGSE";
            // ethPhoto.deleteImage(hash1.toString(),hash2.toString());
            // console.log("deleting image");
            //QmQZeXbWrUvvcq3CTRFZeiv hSosywphAsCc69LY15inWaq

        });
        $(".thumbnails_map").on("mouseleave", function(){
            //console.log("hovered");
            gmarkers[$(this).data('markerid')].setAnimation(null);

        });

        checkUserCommand();

    }
}


// function toggleBounce(marker) {
//   console.log(marker.getAnimation())
//   if (marker.getAnimation() !== null) {
    

//   }
// }

var savedhtml = "";

$(function() {


    //Dialog

    var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#show-dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    showDialogButton.addEventListener('click', function() {
        $("#manualLocation").addClass("hidden");
        dialog.showModal();
    });

    document.getElementById("tag").addEventListener("change", function() {
    var skillsSelect = document.getElementById("tag");
    var category_input = skillsSelect.options[skillsSelect.selectedIndex].text;
    if(category_input=="Other") {
    console.log("Other True");
    document.getElementById("othertag").className="mdl-textfield mdl-js-textfield otherTrue";
    }
    if(category_input!="Other") {
    console.log("OtherFalse");
    document.getElementById("othertag").className="mdl-textfield mdl-js-textfield otherFalse";
    }
    });
    
    document.querySelector('#tourbtn').addEventListener('click', function() {
        taketour();
    });

    dialog.querySelector('#cancel_button').addEventListener('click', function() {
        $(".pac-container").addClass('otherclass');
        $(".pac-container").removeClass('class');
        dialog.close();
        dialogOriginalState();
    });
    dialog.querySelector('#ok_button').addEventListener('click', okclicked);

    $("#viewphotoBtn").on('click', myImages1);

    //$("#categoryBtn").on('click', getTags);


    // turn the element to select2 select style

    $('#select2').select2({
        placeholder: "Search By Tags"
    });

    $('#select2').select2({placeholder: "Search By Tags"})
        .on("change", function(e) {
          // mostly used event, fired to the original element when the value changes
          console.log("CHANGE_VALUE=" + e.val);
          callScreenAgain();
          //tagChange();
        })

    $("#geotag_loc").on('click', clearGroup);
    $("#enter_loc").on('click', clearGroup);
    $("#current_loc").on('click', clearGroup);

    /*For managing Searchbox Locations*/
    document.getElementById("manualLocation").addEventListener('click', function() {
        $(".pac-container").appendTo("#upload_box");
        $(".pac-container").removeClass('otherclass');
        $(".pac-container").addClass('class');
    });

    document.getElementById("pac-input").addEventListener('click', function() {
        $(".pac-container").appendTo("body");
        // $(".pac-container").removeClass('class');
        // $(".pac-container").addClass('otherclass');
    });

    document.getElementById("enter_loc").addEventListener('click', function() {
        if (this.checked){
            $("#manualLocation").removeClass("hidden");
        }
        else{
            $("#manualLocation").addClass("hidden");
            
        }
    });

    var element = document.querySelector('.droppable');
    makeDroppable(element, callback);


    // test();

    // Zoom Modal
    /*var modal = document.getElementById('myModal');
    var i;

    function showimg(img) {
        // var imag = document.getElementById(img.id);
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        document.getElementById(img.id).onclick = function() {
            modal.style.display = "block";
            modalImg.src = img.src;
            captionText.innerHTML = img.alt;
        }
    }


    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
*/
    // End Modal
});

function makeDroppable(element, callback) {
  console.log("file UP")
  var input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  // input.setAttribute('multiple', true);
  input.style.display = 'none';

  var input2 = document.createElement('input');
  input2.setAttribute('type', 'file');
  input2.setAttribute('accept', 'image/*');
  // input.setAttribute('multiple', true);
  input2.style.display = 'none';

  input.addEventListener('change', function(e){
    console.log("Manually");
    console.log(e);
    // readURL($("#takeimage input[type=file]"));
  });;
  element.appendChild(input);
  
  element.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    element.classList.add('dragover');
  });

  element.addEventListener('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    element.classList.remove('dragover');
  });

  element.addEventListener('drop', function(e) {
    console.log("2 times")
    e.preventDefault();
    e.stopPropagation();
    element.classList.remove('dragover');
    triggerCallback(e);
  });
  
  element.addEventListener('click', function() {
    input.value = null;
    input.click();
  });

  function triggerCallback(e) {
    console.log("file UP2")
    if(e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if(e.target) {
      files = e.target.files;
    }
    callback.call(null, files);
  }
}


function callback(files) {
  // Here, we simply log the Array of files to the console.
  console.log(files);
  var input2 = $("#takeimage input[type=file]")
  input2[0].files=files
  // readURL(files);
  readURL(input2);
}

function clearGroup() {
    var checkbox = ['geotag_loc', 'enter_loc', 'current_loc'];
    for (var i = 0; i < 3; i++) {
        if (this != checkbox[i])
            toggle(false, checkbox[i]);
    }

}

function okclicked(){
    console.log("ok...")
    var final_checked;
    var lat, lon;
    var input = $("#takeimage input[type=file]")
    $(".pac-container").addClass('otherclass');
    $(".pac-container").removeClass('class');
    if (document.getElementById('geotag_loc').checked == true){
        final_checked = 1;
        EXIF.getData(input[0].files[0], function() {
            lat = EXIF.getTag(this, "GPSLatitude");
            lon = EXIF.getTag(this, "GPSLongitude");
            var latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";
            var lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "W";
            lat = (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef == "N" ? 1 : -1);
            lon = (lon[0] + lon[1] / 60 + lon[2] / 3600) * (lonRef == "W" ? -1 : 1);
            console.log(lat);
            console.log(lon);
            upload(lat, lon);
        })

    }
    else if (document.getElementById('current_loc').checked == true){
        final_checked = 2;
        navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                lat=pos.lat;
                lon=pos.lng;
                console.log(lat, lon, "nav");

                upload(lat, lon);
            })
    }
    else if (document.getElementById('enter_loc').  checked == true) {
        var address = document.getElementById('manualLocation').value;
        var geocoder = new google.maps.Geocoder();
        console.log(address)
        //Not handled when address is empty case
        geocoder.geocode({ 'address': address }, function(results, status) {
            if (status == 'OK') {
                lat=results[0].geometry.location.lat();
                lon=results[0].geometry.location.lng();
                console.log(lat, lon, "Enter");
                upload(lat, lon);
            }
        });
        final_checked = 3;
    }
    console.log(final_checked);
    console.log(lat, lon);
    dialog.close();  
    dialogOriginalState();
}

function dialogOriginalState(){
    var checkbox = ['geotag_loc', 'enter_loc', 'current_loc'];
    document.getElementById('manualLocation').value="";
    $("#filename").addClass("hidden");
    document.querySelector('#geotag_loc').parentElement.MaterialCheckbox.enable();
    document.querySelector('#current_loc').parentElement.MaterialCheckbox.enable();
    document.querySelector('#enter_loc').parentElement.MaterialCheckbox.enable();

    if (document.getElementById("geotag_loc").checked)
        toggle(false, "geotag_loc");
    if (document.getElementById("enter_loc").checked)
        toggle(false, "enter_loc");
    if (document.getElementById("current_loc").checked)
        toggle(false, "current_loc");


}

function checkUserCommand(){
    console.log("IN_CHECK_USER_COMMAND");
    var text = document.getElementById("hidebutton").innerHTML
    if(user_hide==true){
        document.getElementById("hidebutton").innerHTML = "expand_less";
        document.getElementById("mycarousel").style.display = "none";
        document.getElementById("hidebuttonclass").setAttribute('title','Show Images');
    }
    else{
        document.getElementById("hidebutton").innerHTML = "expand_more";
        document.getElementById("mycarousel").style.display = "block";
        if(text=='expand_more'){
            document.getElementById("hidebuttonclass").setAttribute('title','Hide Images');
        }
        else{
            document.getElementById("hidebuttonclass").setAttribute('title','Show Images');
        }
    }
}

function hide_slider(){

    console.log("In hide");
    var text = document.getElementById("hidebutton").innerHTML
    if(text == "expand_more"){
        user_hide=true;
        document.getElementById("hidebutton").innerHTML = "expand_less";
        document.getElementById("mycarousel").style.display = "none";
        document.getElementById("hidebuttonclass").setAttribute('title','Show Images');
        //document.getElementById('hidebuttonclass').style.width='6px';
        //document.getElementById("floating-panel").style.background = "rgba(255, 255, 255, 0);"
    } 
    else{
        user_hide=false;
        document.getElementById("hidebutton").innerHTML = "expand_more";
        document.getElementById("mycarousel").style.display = "block";
        document.getElementById("hidebuttonclass").setAttribute('title','Hide Images');
        //document.getElementById('hidebuttonclass').style.width='6px';
    }
}

function myImages1()
{
    var x = retParam();
    var elm = document.getElementById("viewphotoBtn");
    if (elm.checked){
        // $(".lb-close").removeClass("myhidden");
        zoomComplete();
    }
    else{
        // $(".lb-close").addClass("myhidden");
        zoomNormal();
        }
    
}

function notifyMe(message, bodytext, icon_loc) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("received1")
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message, { 
            body: bodytext,
            icon: icon_loc});
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message, { 
            bodytext: bodytext,
            icon: icon_loc});
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

function test(){
    var data = $('#select2').select2('data');
    console.log("inside get tags");
    for (i = 0; i < data.length; ++i) {
        tags.push(data[i].text);
        console.log(data[i].text);
    }
}

function callScreenAgain() {
    var x = retParam();
    setScreenPoints(x.lat1, x.long1, x.lat2, x.long2);  
}

function tagChange() {

    tagOutput = getTagandImage();
    locations = tagOutput.loc;
    images = tagOutput.img;
    tags = tagOutput.cat;
    names = tagOutput.name;
    load_slider(images,locations);
    setMarkers(locations,tags,images,names);
}

