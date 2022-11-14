
/**

 * Starter code
 * Data visualization
 */


console.log("load a model?")
tf.loadLayersModel('https://foo.bar/tfjs_artifacts/model.json').then(model => {
  console.log("I have a model")
})
  

/* globals Vue, p5*/

window.addEventListener("load", function () {
  
  
// JavaScript



  
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('videoElement');


if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {
              navigator.mediaDevices.getUserMedia({ video: true,audio:false })
                .then(function (stream) {
                  video.srcObject = stream;
                console.log("VIDEO STARTED")
                })
                .catch(function (err) {
                  console.log("Something went wrong!");
                });}
  
//   const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
//   const detectorConfig = {
//   runtime: 'mediapipe', // or 'tfjs'
//   solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
//   }
//   faceLandmarksDetection.createDetector(model, detectorConfig).then(() => {
//     console.log("detector created")
//   }) 
});