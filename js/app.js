'use strict';

// upon click generate 3 new random images
// displayed images - no  3 previously shown

// Begin Code

// Global Variables

// HTML objects 
var imageTriptychSectionTag = document.getElementById('image_triptych_section_tag');
var leftTriptychImageTag = document.getElementById('left_triptych_image_tag');
var centerTriptychImageTag = document.getElementById('center_triptych_image_tag');
var rightTriptychImageTag = document.getElementById('right_triptych_image_tag');

var totalClicks = 0;

// Variables to store the initial images shown
var leftImageDisplayed = null;
var centerImageDisplayed = null;
var rightImageDisplayed = null;

// Constructor
var TriptychImage = function (name, imageSrc) {
  this.name = name;
  this.url = imageSrc;
  this.timesClicked = 0;
  this.timesShown = 0;

  // Every new image is pushed to the allImages array.
  TriptychImage.allImages.push(this);
};

// Instantiate array and fill it with goodies.
TriptychImage.allImages = [];

new TriptychImage('bag', '../img/bag.jpg');
new TriptychImage('banana', '../img/banana.jpg');
new TriptychImage('bathroom', '../img/bathroom.jpg');
new TriptychImage('boots', '../img/boots.jpg');
new TriptychImage('breakfast', '../img/breakfast.jpg');
new TriptychImage('bubblegum', '../img/bubblegum.jpg');
new TriptychImage('chair', '../img/chair.jpg');
new TriptychImage('cthulhu', '../img/cthulhu.jpg');
new TriptychImage('dog', '../img/dog.jpg');
new TriptychImage('dragon', '../img/dragon.jpg');
new TriptychImage('pen', '../img/pen.jpg');
new TriptychImage('pet-sweep', '../img/pet-sweep.jpg');
new TriptychImage('scissors', '../img/scissors.jpg');
new TriptychImage('shark', '../img/shark.jpg');
new TriptychImage('sweep', '../img/sweep.png');
new TriptychImage('tauntaun', '../img/tauntaun.jpg');
new TriptychImage('unicorn', '../img/unicorn.jpg');
new TriptychImage('usb', '../img/usb.gif');
new TriptychImage('water-can', '../img/water-can.jpg');
new TriptychImage('wine-glass', '../img/wine-glass.jpg');

var renderNewImages = function (leftIndex, centerIndex, rightIndex) {
  leftTriptychImageTag.src = TriptychImage.allImages[leftIndex].url;
  centerTriptychImageTag.src = TriptychImage.allImages[centerIndex].url;
  rightTriptychImageTag.src = TriptychImage.allImages[rightIndex].url;
};

// Is passed an array to create a copy of the actual array.
var chooseRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

// Chooses 3 new unique images.
var pickNewImages = function () {

  var remainingIndices = [];

  for (var i = 0; i < TriptychImage.allImages.length; i++) {
    remainingIndices.push(i);
  }

  var leftIndex = remainingIndices.splice(chooseRandomIndex(remainingIndices), 1)[0];
  var rightIndex = remainingIndices.splice(chooseRandomIndex(remainingIndices), 1)[0];
  var centerIndex = remainingIndices.splice(chooseRandomIndex(remainingIndices), 1)[0];


  console.log(TriptychImage.allImages[leftIndex].name, TriptychImage.allImages[centerIndex].name, TriptychImage.allImages[rightIndex].name);

  leftImageDisplayed = TriptychImage.allImages[leftIndex];
  centerImageDisplayed = TriptychImage.allImages[centerIndex];
  rightImageDisplayed = TriptychImage.allImages[rightIndex];

  renderNewImages(leftIndex, centerIndex, rightIndex);
};

// Click handler section
var trackImageClicks = function(image) {
  image.clicks++;
  image.timesShown++;
};

var leftSelectButton = document.getElementById('left_image_button');
leftSelectButton.addEventListener('click', function handler(event) {
  if (totalClicks < 10) {
    trackImageClicks(leftImageDisplayed);
    totalClicks++;
  } else {
    event.target.removeEventListener('click', handler);
  }
});

var centerSelectButton = document.getElementById('center_image_button');
centerSelectButton.addEventListener('click', function handler(event) {
  if (totalClicks < 10) {
    trackImageClicks(centerImageDisplayed);
    totalClicks++;
  } else {
    event.target.removeEventListener('click', handler);
  }
});

var rightSelectButton = document.getElementById('right_image_button');
rightSelectButton.addEventListener('click', function handler(event) {
  if (totalClicks < 10) {
    trackImageClicks(rightImageDisplayed);
    totalClicks++;
  } else {
    event.target.removeEventListener('click', handler);
  }
});

// Turn on click listener functionality.
imageTriptychSectionTag.addEventListener('click', trackImageClicks);

leftImageDisplayed = TriptychImage.allImages[3];
centerImageDisplayed = TriptychImage.allImages[4];
rightImageDisplayed = TriptychImage.allImages[0];

pickNewImages();

/*
Prevent last picked goats from being picked
    - STRETCH pick all goats evenly as possible
  Math.floor  Math.random() * array.length()
  make sure left and right image are unique
  */
