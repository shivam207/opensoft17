jssor_1_slider_init = function() {

    var jssor_1_options = {
        $AutoPlay: true,
        $Idle: 0,
        $AutoPlaySteps: 4,
        $SlideDuration: 2500,
        $SlideEasing: $Jease$.$Linear,
        $PauseOnHover: 4,
        $SlideWidth: 140,
        $Cols: 7
    };

    var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

    /*responsive code begin*/
    /*remove responsive code if you don't want the slider scales while window resizing*/
    // function ScaleSlider() {
    //     var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
    //     if (refSize) {
    //         refSize = Math.min(refSize, 809);
    //         jssor_1_slider.$ScaleWidth(refSize);
    //     } else {
    //         window.setTimeout(ScaleSlider, 30);
    //     }
    // }
    // ScaleSlider();
    // $Jssor$.$AddEvent(window, "load", ScaleSlider);
    // $Jssor$.$AddEvent(window, "resize", ScaleSlider);
    // $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
    /*responsive code end*/
};



function load_slider(images) {
    $("#jssor_1").remove();
    $('#slider_container').append(savedhtml);



    console.log("here");
    console.log(images);
    $(images).each(function(index) {
        element = '<div> \
                        <img  data-u="image" src="' + this + '" /> \
                </div>';
        $("#images").append(element);
        console.log(element);

    });
    return false;
    jssor_1_slider_init();
}


function addImages(images) {
    
    var carousel = document.querySelector('#mdlext-carousel-demo2');
    for (var i = 0; i < images.length; i++) {
        var slide_fragment = 
        '<li class="mdlext-carousel__slide">\
            <figure>\
                <img src="'+images[i]+'" alt="image" />\
            </figure>\
        </li>';
        
        carousel.insertAdjacentHTML('beforeend', slide_fragment);
        carousel.MaterialExtCarousel.upgradeSlides();

    }

}
