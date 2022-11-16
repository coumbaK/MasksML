/* globals allMasks  Vector2D, drawRibbon, drawContour, drawPoints */

allMasks["basics"] = {
  title: "Example mask",
  description: "showing contours",
  setup() {
    // p.clear()
    
  },

  draw(p, face) {
    p.clear()
    // p.background(0, 0, 0, .01);
    let t = p.millis() * 0.001;
    
//     Vector2D
    p.circle(...face.nose, 4)
    p.circle(...face.top, 4)
    p.circle(...face.bottom, 4)
    
//     face.mouth an array of contours, 
    // each of which is an array of Vecto2D
//     face.mouth.forEach((contour, index) => {
//       p.fill(index*50, 100, 50)
//       p.beginShape()
//       contour.forEach(pt => {
//         // p.circle(...pt, 4)
//         // p.text("❤️", ...pt)
//         p.vertex(...pt)
//       })
      
//       p.endShape()
//     })
    
    // Using drawPoints
    p.stroke(0, 100, 50)
    p.noFill()
    p.strokeWeight(3)
    p.beginShape()
    drawPoints(p,face.mouth[2].slice(12, 20), {
      // close: true
    })
    p.vertex(...face.bottom)
    p.endShape(p.CLOSE)
    
    drawContour(p, face.centerLine)
    
// SIDES!
    face.sides.forEach((side, sideIndex) => {
      
      // Inside a side
      // p.strokeWeight(4)
      // p.circle(...side.eyeCenter, 5)
      // p.strokeWeight(1)
      side.face.forEach((contour, index) => {
        let hue = (sideIndex*100 + 50*index)%360
        p.fill(hue, 100, 50, 1)
        drawContour(p, contour, {
          close: true
        })
      })
      
      p.fill(0)
       drawRibbon(p, side.eye[0], side.eye[1], {
         close: true,
         curve: true
       })
    })

  
  },
};
