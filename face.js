/* globals Vector2D */

/**
* Class for Face 
* Tensorflow landmarks give us back the face kinda weirdly
* https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection#parameters-for-facelandmarksdetectionload
* as a bounding box and also points *relative* to that box???
**/

const LANDMARK_COUNT = 468

class Face {
  constructor() {
//     All faces have 468 points
    this.points = []
for (var i = 0; i < LANDMARK_COUNT; i++) {
  this.points[i] = new Vector2D(0,0)
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
    })
  }
}