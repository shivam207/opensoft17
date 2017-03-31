function taketour(){
  // Instance the tour
    var tour_website = new Tour({
    steps: [
    {
      element: "#pac-card",
      title: "Search for photos",
      content: "Type in a location to get the photos at that location.",
      placement:"left"
    },
    {
      element: "#show-dialog",
      title: "Upload Photo",
      content: "To upload your photo to Ethphoto :)",
      placement:"right"
    },
    {
      element: ".parentOfTag",
      title: "Tag Search",
      content: "Search photos by tags associated to it.",
      placement:"right"
    },
    {
      element: ".myphoto",
      title: "View your photos",
      content: "own on map. You can also delete your photo now.",
      placement:"right"
      // onNext: function () {
      //   showDialog();
      // }
    },
    {
      element: "#geotag_loc",
      title: "Choosing photo location",
      content: "Use the geotag of photo",
      placement:"right"

    }

  ],
    smartPlacement: true,
    backdrop: true,
    storage: false
  });
  tour_website.init();
  tour_website.start();

}

// function showDialog(){
//   var dialog = document.querySelector('dialog');
//   dialog.showModal();
// }