/* globals Vector2D */

/**
 * Class for Face
 * Tensorflow landmarks give us back the face kinda weirdly
 * https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection#parameters-for-facelandmarksdetectionload
 * as a bounding box and also points *relative* to that box???
 **/

const FACE_INDICES = {
  fingers: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ],
  centerLine: [
    10, 151, 9, 8, 168, 6, 197, 195, 5, 4, 1, 19, 94, 2, 164, 0, 11, 12, 13, 14,
    15, 16, 17, 18, 200, 199, 175, 152,
  ],
  mouth: [
    [
      287, 436, 426, 327, 326, 2, 97, 98, 206, 216, 57, 43, 106, 182, 83, 18,
      313, 406, 335, 273,
    ],
    [
      291, 410, 322, 391, 393, 164, 167, 165, 92, 186, 61, 146, 91, 181, 84, 17,
      314, 405, 321, 375,
    ],
    [
      306, 409, 270, 269, 267, 0, 37, 39, 40, 185, 76, 77, 90, 180, 85, 16, 315,
      404, 320, 307,
    ],
    [
      292, 408, 304, 303, 302, 11, 72, 73, 74, 184, 62, 96, 89, 179, 86, 15,
      316, 403, 319, 325,
    ],
    [
      308, 407, 310, 311, 312, 13, 82, 81, 80, 183, 78, 95, 88, 178, 87, 14,
      317, 402, 318, 324,
    ],
  ],

  sides: [
    // RIGHT
    {
      faceRings: [
        [
          10, 109, 67, 103, 54, 21, 162, 127, 234, 93, 132, 58, 172, 136, 150,
          149, 176, 148, 152,
        ],
        [
          151, 108, 69, 104, 68, 71, 139, 34, 227, 137, 177, 215, 138, 135, 169,
          170, 140, 171, 175,
        ],
        [
          9, 107, 66, 105, 63, 70, 156, 143, 116, 123, 147, 213, 192, 214, 210,
          211, 32, 208, 199,
        ],
      ],
      eyeRings: [
        [
          122, 168, 107, 66, 105, 63, 70, 156, 143, 116, 123, 50, 101, 100, 47,
          114, 188,
        ],
        [
          245, 193, 55, 65, 52, 53, 46, 124, 35, 111, 117, 118, 119, 120, 121,
          128,
        ],
        [
          244, 189, 221, 222, 223, 224, 225, 113, 226, 31, 228, 229, 230, 231,
          232, 233,
        ],
        [243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112],
        [
          133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153,
          154, 155,
        ],
      ],
    },
    // LEFT
    {
      faceRings: [
        [
          10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365,
          379, 378, 400, 377, 152,
        ],
        [
          151, 337, 299, 333, 298, 301, 368, 264, 447, 366, 401, 435, 367, 364,
          394, 395, 369, 396, 175,
        ],
        [
          9, 336, 296, 334, 293, 300, 383, 372, 345, 352, 376, 433, 416, 434,
          430, 431, 262, 428, 199,
        ],
      ],
      eyeRings: [
        [
          351, 168, 336, 296, 334, 293, 300, 383, 372, 345, 352, 280, 330, 329,
          277, 343, 412,
        ],
        [
          465, 417, 285, 295, 282, 283, 276, 353, 265, 340, 346, 347, 348, 349,
          350, 357,
        ],
        [
          464, 413, 441, 442, 443, 444, 445, 342, 446, 261, 448, 449, 450, 451,
          452, 453,
        ],
        [
          463, 414, 286, 258, 257, 259, 260, 467, 359, 255, 339, 254, 253, 252,
          256, 341,
        ],
        [
          362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380,
          381, 382,
        ],
      ],
    },
  ],

  // [10 109 87 103]
};
const LANDMARK_COUNT = 468;

class Face {
  constructor() {
    //     All faces have 468 points
    this.points = [];
    for (var i = 0; i < LANDMARK_COUNT; i++) {
      let pt = new Vector2D(0, 0);
      pt.index = i;
      this.points[i] = pt;
    }

    let contourListToVertices = (contours) => {
      return contours.map((contour) => {
        return contour.map((index) => this.points[index]);
      });
    };

    // Group all the points into landmarks
    this.sides = [];
    for (var i = 0; i < 2; i++) {
      let side_indices = FACE_INDICES.sides[i];
      this.sides[i] = {
        // Copy over the side and
        face: contourListToVertices(side_indices.faceRings),
        eye: contourListToVertices(side_indices.eyeRings),
        eyeCenter: new Vector2D(0,0),
        
      };
      this.sides[i].innerEye = this.sides[i].eye[3][0]
      this.sides[i].outerEye = this.sides[i].eye[3][8]
    }
  }

  setTo(prediction) {
    // console.log("set to prediction", prediction)
    if (prediction) {
      let predictedPts = prediction.scaledMesh;
      this.points.forEach((pt, index) => {
        pt.setTo(predictedPts[index]);
      });
    }
    
// Update various calculateion
  }

  drawDebug(p) {
    let t = p.millis()*.001
    this.points.forEach((pt) => {
      // p.circle(...pt, 4)
      // p.text(pt.index, ...pt)
    });
    
    

    this.sides.forEach((side, sideIndex) => {
      
      p.circle(...side.innerEye, 3)
      p.circle(...side.outerEye, 3)
       p.circle(...side., 3)
      
      // Draw eye contours
      side.eye.forEach((contour, cIndex) => {
        p.fill(40 * sideIndex + cIndex * 20, 100, 50);
       
        drawContour(p, contour, {
          close: true,
          lerpToPoint: new Vector2D(0,0),
          // lerpPct: Math.sin(t),
          lerpPct(index, pct, pt) {
            return .5 + .3*Math.sin(pct*2)
          }
        });
      });
    });
  }
}

//==================================
// Drawing utilities

function drawContour(p, contour, settings = {}) {
  p.beginShape();

  let temp = new Vector2D(0, 0);

  contour.forEach((pt, ptIndex) => {
    let toUse = pt;
    // Use the original point, or calculate a new one?
    if (settings.lerpToPoint) {
      let pct = .5
      if (settings.lerpPct instanceof Function) {
        // A function for the pct? Ok!
        pct = settings.lerpPct(ptIndex, ptIndex/(contour.length), pt)
      } else if (!isNaN(settings.lerpPct) ) {
        pct = settings.lerpPct
      }
     
      temp.setToLerp(pt, settings.lerpToPoint, pct);
      toUse = temp
    }
    p.vertex(...toUse);
  });

  // Close the path
  p.endShape(settings.close ? p.CLOSE : undefined);
}

function drawContourCurve(p, contour, settings = {}) {
  p.beginShape();
  p.vertex(...contour[0]);
  contour.forEach((pt) => p.curveVertex(...pt));
  p.vertex(...contour[contour.length - 1]);

  // Close the path
  p.endShape(settings.close ? p.CLOSE : undefined);
}
