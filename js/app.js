'use strict';


// image objects(constructor)
// inline elem's CSS


// receive clicks
// track clicks per image 
// track clicks in total 
// track timesShown



// upon click generate 3 new random images
// displayed images - no duplicates of the 3 shown or the 3 previously shown



// constructor function 
// object properties: imageName, filepath, numberTimesShown, numberTimesClicked, htmlID



// counter for 25 clicks
// 25 < turn off listeners on images, display list of products and results, 



// Begin Code

// Global Variabless

// HTML objects 
var imageTriptychSectionTag = document.getElementById('image_triptych_section_tag');
var leftTriptychImageTag = document.getElementById('left_triptych_image_tag');
var centerTriptychImageTag = document.getElementById('center_triptych_image_tag');
var rightTriptychImageTag = document.getElementById('right_triptych_image_tag');

var totalClicks = 0;

// Variables to store the initial images shown
var leftInitialImage = null;
var centerInitialImage = null;
var rightInitialImage = null;


var ImageObject = function (name, imageSrc) {
  this.name = name;
  this.url = imageSrc;
  this.timesClicked = 0;
  this.timesShown = 0;

  // Every new image is pushed to the allImages array.
  ImageObject.allImages.push(this);
};

ImageObject.allImages = [];


var renderNewImages = function (leftIndex, centerIndex, rightIndex) {
  leftTriptychImageTag.src = ImageObject.allImages[leftIndex].url;
  centerTriptychImageTag.src = ImageObject.allImages[centerIndex].url;
  rightTriptychImageTag.src = ImageObject.allImages[rightIndex].url;
};

var pickNewImages = function () {
  var leftIndex = Math.round(Math.random() * ImageObject.allImages.length - 1);

  do {
    var rightIndex = Math.round(Math.random() * ImageObject.allImages.length - 1);
    var centerIndex = Math.round(Math.random() * ImageObject.allImages.length - 1);
  } while ((rightIndex === leftIndex) && (rightIndex === centerIndex) && (leftIndex === centerIndex));

  console.log(ImageObject.allImages[leftIndex].name, ImageObject.allImages[centerIndex].name, ImageObject.allImages[rightIndex].name);

  leftInitialImage = ImageObject.allImages[leftIndex];
  centerInitialImage = ImageObject.allImages[centerIndex];
  rightInitialImage = ImageObject.allImages[rightIndex];

  renderNewImages(leftIndex, centerIndex, rightIndex);
};

var handleOnClick = function (event) {
  console.log('im still alive');
  // If they're still allowed to click, then perform clicky operations
  if (totalClicks < 10) {

    var imageClickedOn = event.target;
    var id = imageClickedOn.id;

    if ((id === 'left_triptych_image_tag') || (id === 'center_triptych_image_tag') || (id === 'right_triptych_image_tag')) {
      //track the images
      // increment the clicks of the appropriate slot
      if (id === 'left_triptych_image_tag') {
        leftInitialImage.clicks++;
      }

      if (id === 'center_triptych_image_tag') {
        centerInitialImage.clicks++;
      }

      if (id === 'right_triptych_image_tag') {
        rightInitialImage.clicks++;
      }

      // Increment all images number of times shown every event.
      leftInitialImage.timesShown++;
      centerInitialImage.timesShown++;
      rightInitialImage.timesShown++;

      //after we update the old, pick new pictures
      pickNewImages();
    }
    console.log(event.target.id);
  }

  // Increment amount of clicks
  totalClicks++;

  // When they reach total max clicks, remove the clicky operations
  if (totalClicks === 4) {
    imageTriptychSectionTag.removeEventListener('click', handleOnClick);
  }
};

/*
Prevent last picked goats from being picked
    - STRETCH pick all goats evenly as possible
  Math.floor  Math.random() * array.length()
  make sure left and right image are unique
  */
