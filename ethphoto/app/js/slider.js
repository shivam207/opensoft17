function refresh(images) {
    $("#jssor_1").remove();
    $('#container').append(savedhtml);

    

    $(images).each(function(index) {
        element = '<div> \
                    <a data-toggle="modal" data-target="#myModal" href=#><img id="id" data-u="image" src="images/' + this + '" onclick="showimg(this)"/> \
                    </a> \
                </div>';
        $("#images").append(element);

    });
    jssor_1_slider_init();
}
var savedhtml = "";
$(function() {


    savedhtml = $('#container').html();
    var images = [];//["005.jpg", "006.jpg"];

    $(images).each(function(index) {
        element = '<div> \
                 <a data-toggle="modal" data-target="#myModal" href=#><img id="id" data-u="image" src="images/' + this + '" onclick="showimg(this)"/> \
                    </a> \
            </div>';
        $("#images").append(element);
    });



    jssor_1_slider_init();
});