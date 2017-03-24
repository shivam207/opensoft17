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
    }
};

function load_slider(images) {

    // $("#mycarousel").destroy();

    var len = images.length

    var template = '<div class="mdl-card">  \
                        <div class="mdl-card__media"><img data-lazy={{src}} width="180" height="180" border="10"  alt="" >\
                        </div>\
                    </div> ';



    accumulator = "<div id='mycarousel'>";
    $(images).each(function(index) {
        element = Mustache.render(template, { "src": this, "text": "Some random shit" });
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
            infinite: true,
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 5,
            lazyLoad: 'ondemand',
            slidesToScroll: 3,
            autoplay: false,
            autoplaySpeed: 2000,
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            }, {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }]
        });
    }
}

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
