/* globals allMasks  Vector2D, drawContour, computeVoronoi */

allMasks["voronoi"] = {
  title: "Voronoi demo mask",
  description: "Showing off Voronoi",
  setup(p, face) {
    this.particles = [];
    let count = 80;
    for (var i = 0; i < count; i++) {
      let pt = new Vector2D();
      let r = 10 * i ** 0.7 + 90;
      let theta = i ** 0.7;
      pt.setToPolar(r, theta);
      pt.add(p.width / 2, p.height / 2);
      this.particles.push(pt);
    }
  },

  draw(p, face) {
    let t = p.millis()*.001
    p.clear();

    //     To make a voronoi diagram, first make the bounding box
    const boundingBox = { xl: 0, xr: p.width, yt: 0, yb: p.height };

    let mouse = new Vector2D(p.mouseX, p.mouseY);

    let voronoiPts = [];

    //  You can add mouse positions, particles, or various contours
    voronoiPts.push([mouse]);
    voronoiPts.push(this.particles);

    face.sides.forEach((side) => voronoiPts.push(side.eye[0]));
    face.sides.forEach((side) => voronoiPts.push(side.eye[2]));

    voronoiPts.push(face.mouth[2]);
    voronoiPts.push(face.centerLine);

    // console.log(voronoiPts);
    computeVoronoi(boundingBox, voronoiPts).forEachCell(
      (center, cellPoints, angles, neighbors) => {
        // console.log(cellPoints.map(cp => cp.toString()))
        p.noFill();
        p.stroke((center.index * 10) % 360, 100, 50);

        //       Show the center of the voronoi cell
        // p.circle(...center, 4)
        let hue = 100
        
        // Get a color based on... the index
        hue = center.index * 10;
        p.fill(hue % 360, 100, 50, 0.3);
        p.stroke(hue % 360, 100, 80);

         // Get a color based on... position
        let noiseScale = .05
        hue = 200*p.noise(center[0]*noiseScale, center[1]*noiseScale, t) + 10*t
        p.fill(hue % 360, 100, 50, 0.3);
        p.stroke(hue % 360, 100, 80);

        
        // p.beginShape();
        // cellPoints.forEach((pt) => {
        //   // pt.lerpTo(center, .5)
        //   pt.moveTowards(center, 5);
        //   p.vertex(...pt);
        // });
        // p.endShape(p.CLOSE);

        // Draw a line to each of the neighboring points        
        neighbors.forEach((pt) => {
          if (pt)
            center.drawLineTo(p, pt)
        });
        
//  Swuigglier: draw curves through the edge point, but also the neighbor
        p.beginShape();
        let pt2 = new Vector()
        cellPoints.forEach((pt, index) => {
          let n = neighbors[index]
         if (n) {
           pt2.setTo(n)
           n.ler
            p.curveVertex(...n);
         }
           
          
          p.curveVertex(...pt);
         
        });
        p.endShape(p.CLOSE);
      }
    );
  },
};
