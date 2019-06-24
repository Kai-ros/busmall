'use strict';

// HTML objects 
var imageTriptychSectionTag = document.getElementById('image_triptych_section_tag');
var leftTriptychImageTag = document.getElementById('left_triptych_image_tag');
var centerTriptychImageTag = document.getElementById('center_triptych_image_tag');
var rightTriptychImageTag = document.getElementById('right_triptych_image_tag');

var totalClicks = 0;
var maximumTotalClicks = 10;

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

TriptychImage.prototype.percentageShown = function () {
  if (this.timesShown !== 0) {
    return Math.floor((this.timesClicked / this.timesShown) * 100);
  }
  return 0;
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
new TriptychImage('dog-duck', '../img/dog-duck.jpg');
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

  leftImageDisplayed.timesShown++;
  centerImageDisplayed.timesShown++;
  rightImageDisplayed.timesShown++;

  renderNewImages(leftIndex, centerIndex, rightIndex);
};

// Click handler section
imageTriptychSectionTag.addEventListener('click', function handler(event) {
  if (totalClicks < maximumTotalClicks) {
    console.log('click action', totalClicks);
    switch (event.target) {
    case leftTriptychImageTag:
      leftImageDisplayed.timesClicked++;
      break;
    case centerTriptychImageTag:
      centerImageDisplayed.timesClicked++;
      break;
    case rightTriptychImageTag:
      rightImageDisplayed.timesClicked++;
      break;
    default:
    }
    pickNewImages();
  }
  totalClicks++;

  var jsonObject = JSON.stringify(totalClicks);
  console.log('# of clicks: ' + jsonObject);

  localStorage.setItem('totalClicks', jsonObject);

  if (totalClicks === maximumTotalClicks) {
    event.currentTarget.removeEventListener('click', handler);
    displayVoteResults();
    generateChartData();
  }
});

var displayVoteResults = function () {
  for (var i = 0; i < TriptychImage.allImages.length; i++) {
    console.log(TriptychImage.allImages[i].name, TriptychImage.allImages[i].percentageShown());

    // Target parent element
    var resultsDisplayList = document.getElementById('display_vote_results');
    // Build child element
    var imagePercentageResults = document.createElement('li');
    // Fill child with content
    imagePercentageResults.textContent = TriptychImage.allImages[i].name + ' was clicked ' + TriptychImage.allImages[i].timesClicked + ' times for a percentage of ' + TriptychImage.allImages[i].percentageShown() + '%';
    // Append child element to parent element
    resultsDisplayList.appendChild(imagePercentageResults);

  }
};


leftImageDisplayed = TriptychImage.allImages[3];
centerImageDisplayed = TriptychImage.allImages[4];
rightImageDisplayed = TriptychImage.allImages[0];

pickNewImages();

var generateChartData = function () {

  var percents = [];
  var names = [];

  for (var i = 0; i < TriptychImage.allImages.length; i++) {
    names.push(TriptychImage.allImages[i].name);
    percents.push(TriptychImage.allImages[i].percentageShown());
  }
  console.log(names, percents);

  var chartObjectHTML = document.getElementById('image_percentage_results').getContext('2d');

  var imagePercentageChart = new Chart(chartObjectHTML,
    {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: '# of Votes',
          data: percents,
          backgroundColor: [
            'rgba(255, 99, 132, .4)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 20
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  );
};

var jsonResult = localStorage.getItem('totalClicks');
console.log('stored # of clicks: ' + jsonResult);

var reformattedJSONResult = JSON.parse(jsonResult);
console.log('After parse result: ', reformattedJSONResult);


