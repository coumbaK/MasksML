/* globals allMasks  Vector2D, drawContour */
allMasks["test"] = {
  title: "Test mask",
  description: "TODO: fix this into a better debugging mask",
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

      let sidePoint = new Vector2D();
      sidePoint.setToLerp(side.eyeCenter, side.eyeOuter, 3);
      p.fill(0);
      p.circle(...sidePoint, 20);

      // Draw eye contours
      side.eye.forEach((contour, cIndex) => {
        p.fill(40 * sideIndex + cIndex * 20, 100, 50, 0.2);
        p.stroke(0)
        drawContour(p, contour, {
          curve: true,
          close: true,
          lerpToPoint: side.eyeCenter,
          // lerpPct: Math.sin(t),
          lerpPct(index, pct, pt) {
            return .2*Math.sin(pct * 45 + 10*t) - 1.2;
          },
        });

        p.noFill();
        p.stroke(100);
        drawContour(p, contour, {
          subtract: side.eyeCenter,
          scale: 2,
          add: sidePoint,
        });
      });
    });
  }
  
}