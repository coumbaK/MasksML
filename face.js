/* globals Vector2D */

/**
* Class for Face 
* Tensorflow landmarks give us back the face kinda weirdly
* https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection#parameters-for-facelandmarksdetectionload
* as a bounding box and also points *relative* to that box???
**/

EYE_CONTOUR_INDICES = []

const LANDMARK_COUNT = 468

class Face {
  constructor() {
//     All faces have 468 points
    this.points = []
for (var i = 0; i < LANDMARK_COUNT; i++) {
  let pt = new Vector2D(0,0)
  pt.index = i
  this.points[i] = pt
}
    
// Group all the points into landmarks
    this.sides = []
    for (var i = 0; i < 2; i++) {
      this.sides[i] = {
        eyeContours: EYE_CONTOUR_INDICES[i].map(sideContours => {
          // For each 
          return sideContours.map(contour => {
             return  this.points[index])
          })
         
      }
    }
    
  }
  
  setTo(prediction) {
    console.log("set to prediction", prediction)
    if (prediction) {
      let predictedPts = prediction.scaledMesh
      this.points.forEach((pt, index) => {
        pt.setTo(predictedPts[index])
      })
    }
  }
  
  drawDebug(p) {
    this.points.forEach(pt => {
      p.circle(...pt, 4)
      p.text(pt.index, ...pt)
    })
  }
}