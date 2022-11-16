/* globals allMasks  Vector2D, drawContour */

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
    face.mouth.forEach((contour, index) => {
      p.fill(index*50, 100, 50)
      p.beginShape()
      contour.forEach(pt => {
        // p.circle(...pt, 4)
        // p.text("❤️", ...pt)
        p.vertex(...pt)
      })
      
      p.endShape()
    })
    
    

  },
};
