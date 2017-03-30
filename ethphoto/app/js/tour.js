// Instance the tour
var tour_website = new Tour({
  steps: [
  {
    element: "#pac-card",
    title: "Search for photos",
    content: "Type in a location to get the photos at that location.",
    placement:"auto"
  },
  {
    element: "#show-dialog",
    title: "Upload Photo",
    content: "To upload your photo to Ethphoto :)",
    placement:"right"
  },
  {
    element: ".searchBytags",
    title: "Tag Search",
    content: "Search photos by tags associated to it.",
    placement:"auto"
  },
  {
    element: ".myphoto",
    title: "View your photos",
    content: "Checking this, you will only be able to view your photos if any in the area shown on map. You can also delete your photo now.",
    placement:"right"
  }

],
  smartPlacement: true,
  backdrop: true,
  storage: false
});