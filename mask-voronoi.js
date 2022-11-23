/* globals allMasks  Vector2D, drawContour, computeVoronoi */

allMasks["voronoi"] = {
  title: "Voronoi demo mask",
  description: "Showing off Voronoi",
  setup(p, face) {
  
     let voronoiPts = []
    const boundingBox = (0, 0, p.width, p.height)
    face.sides.forEach(side => voronoiPts.push(side.eye[0]))
    computeVoronoi(boundingBox, voronoiPts).forEachCell((center) => {
      
    })
  },

  draw(p, face) {
    p.clear();
    
    //     Compute a new diagram
    let t = p.millis() * 0.001;
    let sites = [];
    let count = 20;
    for (var j = 0; j < 1; j++) {
      for (var i = 0; i < count; i++) {
        let v = new Vector2D();
        let r = 40 + j * 50 + 100 * p.noise(i);
        let theta = ((i + Math.sin(j + t)) * Math.PI * 2) / count;
        v.setToPolar(r, theta);
        v.add(p.width / 2, p.height / 2);
        // Convert to {x,y}
        // sites.push({x:v[0], y:v[1]})
      }
    }
  }
  
};
