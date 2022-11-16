/* globals allMasks  Vector2D, drawRibbon, drawContour, drawPoints */

allMasks["basics"] = {
  title: "Example mask",
  description: "showing contours",
  setup() {
    // p.clear()
  },

  draw(p, face) {
    p.clear();
    // p.background(0, 0, 0, .01);
    let t = p.millis() * 0.001;

    //     Vector2D
    p.circle(...face.nose, 4);
    p.circle(...face.top, 4);
    p.circle(...face.bottom, 4);

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
    p.stroke(0, 100, 50);
    p.noFill();
    p.strokeWeight(3);
    p.beginShape();
    drawPoints(p, face.mouth[2].slice(12, 20), {
      // close: true
    });
    p.vertex(...face.bottom);
    p.endShape(p.CLOSE);

    drawContour(p, face.centerLine);

    // SIDES!
    face.sides.forEach((side, sideIndex) => {
      // Inside a side
      // p.strokeWeight(4)
      // p.circle(...side.eyeCenter, 5)
      // p.strokeWeight(1)
      //       side.face.forEach((contour, index) => {

      //         let hue = (sideIndex*100 + 10*index)%360
      //         p.fill(hue, 100, 50 - 10*index, 1)
      //         p.stroke(hue, 100, 100 - 10*index, 1)
      //         drawContour(p, contour, {
      //           close: true
      //         })
      //       })

      p.stroke(0);
      p.noFill();
      //        drawRibbon(p, side.eye[0], side.eye[1], {
      //          close: true,
      //          curve: true,

      //        })

      //        drawContour(p, side.eye[0], {
      //          close: true,
      //          curve: true,

      //          // lerpToPoint: side.eyeCenter
      //        })

      p.strokeWeight(0.4);
      for (var i = 0; i < 10; i++) {
        drawContour(p, side.eye[0], {
          close: true,
          curve: true,

          // a number
          // lerpPct: -.4*i,

          // a function
          lerpPct(ptIndex, pct, pt) {
            return (-0.4 * i + 0.2 * Math.sin(ptIndex + t * 2)) * 0.3;
          },

          // lerpToPoint: side.eyeCenter,
          lerpToPoint: face.top,
        });
      }

      // Still inside the side loop
      p.fill(0);
      for (var i = 0; i < 10; i++) {
      let sidePoint = new Vector2D();
      sidePoint.setToLerp(side.eyeCenter, side.eyeOuter, i);
      
      drawContour(p, side.eye[4], {
        subtract: side.eyeCenter,
        scale: 100,
        add:sidePoint
      });
      p.fill(100)
      p.circle(...sidePoint, 4)
      }
    });
  },
};
