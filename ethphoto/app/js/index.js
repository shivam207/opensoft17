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
                        <div class="thumbnails_map" data-markerid={{idx}}><a class = "slider" data-lightbox="example-set" href={{href}}><img  data-lazy={{src}} height="130" alt="" /></a>\
                        </div>\
                    </div> ';

    // var template = '<div class="mdl-card">  \
    //                     <div class="mdl-card__media thumbnails_map" data-markerid={{idx}}><a class="slider" data-lightbox="example-set" href={{href}}><img  data-lazy={{src}} width="180" height="180" border="10"  alt="" /></a>\
    //                     </div>\
    //                 </div> ';                


    accumulator = "<div id='mycarousel'>";
    $(images).each(function(index) {
       element = Mustache.render(template, { "src": this, "text": "Some random shit", "idx": index, "href": this});
        // element = '<div><div class="image"><img data-lazy="' + this + '"/></div></div>';
        accumulator += element;
    });
    accumulator += "</div>";

    $("#carousel_container").html(accumulator);
    // Slider
    if (len > 0) {
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

function myImages()
{
    var x = retParam();
    console.log("received")
    var elm = document.getElementById("viewphotoBtn");
    // if(elm.checked){
    //     //console.log("setScreenPoints")
    //     setScreenPoints(x.lat1, x.long1, x.lat2, x.long2);
    // }
    setScreenPoints(x.lat1, x.long1, x.lat2, x.long2);
}
