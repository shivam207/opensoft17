// File Upload
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
        $("#filename").text(input.files[0].name);
        console.log(input.files[0].name);
        $("#filename").removeClass("hidden");
    }
};

function load_slider(images) {

    // $("#mycarousel").destroy();

    var len = images.length

    var template = '<div>  \
                        <div class="thumbnails_map" data-markerid={{idx}}>\
                            <a class = "slider" data-lightbox="example-set" data-eth_lat={{lat}} href={{href}}>\
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
       element = Mustache.render(template, { "src": this, "lat": "'Some random shit'", "idx": index, "href": this});
        // element = '<div><div class="image"><img data-lazy="' + this + '"/></div></div>';
        accumulator += element;
    });
    accumulator += "</div>";
    $("#carousel_container").html("");
    // Slider
    if (len > 0) {
        $("#carousel_container").html(accumulator);
        var initialSlide = 2;
        if(len < 5)
            initialSlide = 0;
        else if(len == 5)
            initialSlide = 1;
        $('#mycarousel').slick({
            initialSlide: initialSlide,
            infinite: false,
            slidesToShow: 5,
            lazyLoad: 'ondemand',
            slidesToScroll: 4,
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
        dialog.showModal();
    });
    dialog.querySelector('#cancel_button').addEventListener('click', function() {
        dialog.close();
    });
    dialog.querySelector('#ok_button').addEventListener('click', function() {
        upload();
        dialog.close();
    });

    $("#viewphotoBtn").on('click', myImages);


    // turn the element to select2 select style
    $('#select2').select2();

    $('#select2').select2({
        placeholder: "Search By Tags"
    });

    /*For managing Searchbox Locations*/
    document.getElementById("manualLocation").addEventListener('click', function() {
        $(".pac-container").appendTo("#upload_box");
        $(".pac-container").removeClass('otherclass');
        $(".pac-container").addClass('class');
    });

    document.getElementById("pac-input").addEventListener('click', function() {
        $(".pac-container").appendTo("body");
        $(".pac-container").removeClass('class');
        $(".pac-container").addClass('otherclass');
    });

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

function hide_slider(){

    console.log("In hide");
    var text = document.getElementById("hidebutton").innerHTML
    if(text == "expand_more"){
        document.getElementById("hidebutton").innerHTML = "expand_less";
        document.getElementById("mycarousel").style.display = "none";
        //document.getElementById('hidebuttonclass').style.width='6px';
        //document.getElementById("floating-panel").style.background = "rgba(255, 255, 255, 0);"
    } 
    else{
        document.getElementById("hidebutton").innerHTML = "expand_more";
        document.getElementById("mycarousel").style.display = "block";
        //document.getElementById('hidebuttonclass').style.width='6px';
    }
}

function myImages()
{
    var x = retParam();
    var elm = document.getElementById("viewphotoBtn");
    // if(elm.checked){
    //     //console.log("setScreenPoints")
    //     setScreenPoints(x.lat1, x.long1, x.lat2, x.long2);
    // }
    setScreenPoints(x.lat1, x.long1, x.lat2, x.long2);
}

function notifyMe(message, bodytext) {
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
            icon: '../images/upload2.png'});
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message, { 
            bodytext: 'shdsjjsjhd sdshh',
            icon: '../images/upload2.png'});
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

function getTagImages() {
    var i;

    //data contains an object where data[i].text contains name of tags
    var data = $('#select2').select2('data');

    for (i = 0; i < data.length; ++i) {
        console.log(data[i].text + "\n");
    }

}
