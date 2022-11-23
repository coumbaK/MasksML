/* globals allMasks  Vector2D, drawContour, computeVoronoi */

allMasks["voronoi"] = {
  title: "Voronoi demo mask",
  description: "Showing off Voronoi",
  setup(p, face) {
    
   
  },

  draw(p, face) {
    // p.clear();

     let mouse = new Vector2D(p.mouseX, p.mouseY)
    let voronoiPts = [[mouse]];
    const boundingBox = {xl: 0, xr: p.width || 300, yt: 0, yb: p.height || 300}
  
    face.sides.forEach((side) => voronoiPts.push(side.eye[0]));
    // console.log(voronoiPts);
    computeVoronoi(boundingBox, voronoiPts).forEachCell((center, cellPoints, angles, neighbors) => {
      // console.log(cellPoints.map(cp => cp.toString()))
      p.noFill()
       p.stroke((center.index*10)%360, 100, 50)
     
      p.circle(...center, 4)
      
      // Get a color based on... the index
      let hue = center.index*10
        p.fill(hue%360, 100, 50, .3)
        p.stroke(hue%360, 100, 80)
     
      
      p.beginShape()
      cellPoints.forEach(pt => {
        // pt.lerpTo(center, .5)
        pt.moveTowards(center, 5)
        p.vertex(...pt)
      })
      p.endShape(p.CLOSE)
      
       neighbors.forEach(pt => {
        // center.drawLineTo(p, pt)
      })
      
    });
  },
};
