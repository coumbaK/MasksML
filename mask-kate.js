/* globals allMasks  Vector2D, drawContour */


allMasks["kate"] = {
  
  setup() {
    
  },
  
  draw(p, face) {
    
     let t = p.millis() * 0.001;
   
    
     face.sides.forEach((side, sideIndex) => {
      p.circle(...side.eyeCenter, side.eyeWidth * 0.2);
      p.circle(...side.eyeInner, 3);
      p.circle(...side.eyeOuter, 3);
      p.circle(...side.eyeTop, 3);
      p.circle(...side.eyeBottom, 3);

    });
  }
  
}