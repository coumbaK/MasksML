let predictions = [];
const video = document.getElementById('video');

// Create a new facemesh method
const facemesh = ml5.facemesh(video, modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

// Listen to new 'face' events
facemesh.on('face', results => {
  predictions = results;
});