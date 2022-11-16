/* globals allMasks  Vector2D, drawContour */

allMasks["kate"] = {
  title: "Kate's in-class mask",
  description: "A bunch of techniques",
  setup(p) {
    p.clear()
    
  },

  draw(p, face) {
    // p.clear()
    p.background(0, 0, 0, .01);
    let t = p.millis() * 0.001;

    face.sides.forEach((side, sideIndex) => {
      p.fill(100);
      p.circle(...side.eyeCenter, side.eyeWidth * 0.2);
      p.circle(...side.eyeInner, 3);
      p.circle(...side.eyeOuter, 3);
      p.circle(...side.eyeTop, 3);
      p.circle(...side.eyeBottom, 3);

      p.fill(320, 100, 50, 0.3);
      p.stroke(0);
      
       
      
      drawRibbon(p, side.eye[0].slice(0, 10), side.eye[1].slice(0, 10), {
        curve: true,
        close: true,
        
        side0: {
          lerpToPoint: side.eyeCenter,
          lerpPct: (index, pct) => {
            return -10*p.noise(pct*10 + t)*pct
          }
        },
        side1: {
          // lerpToPoint: side.eyeCenter,
          // lerpPct: -1,
        }
      });
    });
    
    p.circle(...face.bottom, 20);
    p.circle(...face.nose, 20);
    p.circle(...face.top, 20);
     
  },
};
