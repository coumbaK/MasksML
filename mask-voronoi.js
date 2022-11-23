/* globals allMasks  Vector2D, drawContour, computeVoronoi */

allMasks["voronoi"] = {
  title: "Voronoi demo mask",
  description: "Showing off Voronoi",
  setup(p, face) {
    
    let mouse = new Vector2D(p.mouseX, p.mouseY)
    let voronoiPts = [[mouse]];
    const boundingBox = (0, 0, p.width, p.height);
    face.sides.forEach((side) => voronoiPts.push(side.eye[0]));
    // console.log(voronoiPts);
    computeVoronoi(boundingBox, voronoiPts).forEachCell((center, cellPoints, neighbors) => {
      // console.log(center)
      p.noFill()
       p.stroke((center.index*10)%360, 100, 50)
     
      p.circle(...center, 4)
      
      p.beginShape()
      cellPoints.forEach(pt => {
        pt.lerpTo(center, .5)
        p.vertex(...pt)
      })
      p.endShape(p.CLOSE)
      
    });
  },

  draw(p, face) {
    // p.clear();

    
  },
};
