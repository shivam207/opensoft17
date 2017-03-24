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

var savedhtml = "";

$(function() {

    // Slider
    savedhtml = $('#container').html();
    var images = []; //"005.jpg", "006.jpg"];


    load_slider(images);
    
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
    var modal = document.getElementById('myModal');
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

    // End Modal
});



$(function() {



});
