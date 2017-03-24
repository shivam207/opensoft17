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
    function ScaleSlider() {
        var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
        if (refSize) {
            refSize = Math.min(refSize, 809);
            jssor_1_slider.$ScaleWidth(refSize);
        } else {
            window.setTimeout(ScaleSlider, 30);
        }
    }
    ScaleSlider();
    $Jssor$.$AddEvent(window, "load", ScaleSlider);
    $Jssor$.$AddEvent(window, "resize", ScaleSlider);
    $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
    /*responsive code end*/
};



function load_slider(images) {
    // $("#jssor_1").remove();
    $('#container').html(savedhtml);

    

    $(images).each(function(index) {
        element = '<div> \
                    <a data-toggle="modal" data-target="#myModal" href=#> \
                        <img  data-u="image" src="images/' + this + '" onclick="showimg(this)"/> \
                    </a> \
                </div>';
        $("#images").append(element);

    });
    jssor_1_slider_init();
}
