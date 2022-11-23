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
    let t = p.millis() * 0.001;
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
      (center, startPoints, angles, neighbors, endPoints) => {
        // For each cell, we have access to the center, the cell points, angles, and neighbots

        // Make a temporary point so we don't change the points of the graph on the fly
        let pt2 = new Vector2D();

        p.noFill();
        p.stroke((center.index * 10) % 360, 100, 50);

        //       Show the center of the voronoi cell
        // p.circle(...center, 4)
        let hue = 100;

        // Get a color based on... the index
        hue = center.index * 10;
        p.fill(hue % 360, 100, 50, 0.3);
        p.stroke(hue % 360, 100, 80);

        // Get a color based on... position
        let noiseScale = 0.05;
        hue =
          200 * p.noise(center[0] * noiseScale, center[1] * noiseScale, t) +
          10 * t;
        p.fill(hue % 360, 100, 50, 0.3);
        p.stroke(hue % 360, 100, 80);

        // ---------------------
        // DRAWING THE SHAPE
        // Draw this cell as a shape
        p.beginShape();
        startPoints.forEach((pt) => {
          pt2.setTo(pt);
          // pt2.lerpTo(center, .5)
          pt2.moveTowards(center, 5);
          p.vertex(...pt2);
        });
        p.endShape(p.CLOSE);

        // ---------------------
        //         Or do triangles instead
//                 startPoints.forEach((pt, index) => {
//                   let pt2 = endPoints[index]
//                   let angle = angles[index]
//                    p.fill(hue % 360, 100, 50 + 10*angle, .6);

//                   p.beginShape();

//                   p.vertex(...pt);
//                    p.vertex(...pt2);
//                    p.vertex(...center);
//                   p.endShape(p.CLOSE);
//                 });

         // ---------------------
       // Draw a line to each of the neighboring points
        // neighbors.forEach((pt) => {
        //   if (pt) center.drawLineTo(p, pt);
        // });

        //         // ------------
        //         //  Swuigglier: draw curves through the edge point, but also the neighbor
        //         // How much should we move toward the neighbor? make it ... uh, sin-wave?
        //         p.beginShape();

        //         startPoints.forEach((pt, index) => {
        //           let n = neighbors[index];
        //           if (n) {
        //             pt2.setTo(n);
        //             pt2.lerpTo(center, Math.sin(t));
        //             p.curveVertex(...pt2);
        //           }

        //           p.curveVertex(...pt);
        //         });
        //         p.endShape(p.CLOSE);
      }
    );
  },
};
