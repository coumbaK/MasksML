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
    

    //     face.mouth an array of contours,
    // each of which is an array of Vecto2D
     

    // Using drawPoints
    p.stroke(0, 100, 50);
    p.fill(0, 100, 50);
    p.strokeWeight(3);
    p.beginShape();
     drawContour(p, face.mouth[2].slice(0,12), {
      //close: true
    });
     drawContour(p, face.mouth[2].slice(12,20), {
      //close: true
    });
    
    //p.vertex(...face.bottom);
    p.endShape(p.CLOSE);

    //drawContour(p, face.centerLine);
  
    // SIDES!

      
       
    face.sides.forEach((side, sideIndex) => {
       // Inside a side
       p.strokeWeight(4) 
       p.strokeWeight(1)
             side.face.forEach((contour, index) => {

              let hue = 'white'
              p.fill(hue)
               p.stroke(hue, 100, 100 - 10*index, 1)
               drawContour(p, contour, {
                close: true
              })
             })
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
           lerpToPoint: side.eyeCenter,
           lerpPct: 0,
        }
      })
     if(sideIndex==0){
         for (var i = 0 ; i< 1;i++){
      var side= face.sides[0]
      p.stroke(1);
      p.strokeWeight(1);
      
          
      p.fill('black');
            drawRibbon(p, side.eye[2], side.eye[1], {
                close: false,
               curve: true,

              })
      
           

             drawContour(p, side.eye[2], {
                close: true,
                curve: true})

      //          // lerpToPoint: side.eyeCenter
      //        })
          

      p.strokeWeight(0.1);
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
          lerpToPoint: face.side
        });
      }
    }
     }
      

      // Still inside the side loop
      /*p.fill(0);
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
    })*/})
    p.stroke('#ffb6c1');
    p.fill('#ffb6c1');
    p.strokeWeight(3);
    p.beginShape();
     drawContour(p, face.mouth[0].slice(0,100), {
      //close: true
    });
    face.mouth.forEach((contour, index) => {
          p.fill(index*50, 100, 50)
          if(index==0){
            p.beginShape()
            for (var i = 4 ; i<7;i+=2){
              var pt = contour[i]
              p.fill('#ff6a80');
              p.stroke('#ff6a80');
              p.circle(...pt, 4)
             
            }
        

          p.endShape()
          }
          
         })
    
    


     
  },
};
