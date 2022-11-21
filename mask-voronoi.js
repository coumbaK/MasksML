/* globals allMasks  Vector2D, drawContour, Voronoi */

allMasks["voronoi"] = {
  title: "Voronoi demo mask",
  description: "Showing off Voronoi",
  setup(p) {
    this.voronoi = new Voronoi();
    this.bbox = { xl: 0, xr: p.width, yt: 0, yb: p.height }; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
    
    // a 'vertex' is an object exhibiting 'x' and 'y' properties. The
    // Voronoi object will add a unique 'voronoiId' property to all
    // sites. The 'voronoiId' can be used as a key to lookup the associated cell
    // in diagram.cells.

    // var diagram = voronoi.compute(sites, bbox);
    let sites = [
      { x: 200, y: 200 },
      { x: 240, y: 20 },
       { x: 120, y: 240 },
      { x: 50, y: 250 },
      { x: 400, y: 100 } /* , ... */,
    ];

    this.diagram = this.voronoi.compute(sites, this.bbox);
    console.log(this.diagram)
  },

  draw(p, face) {
    // console.log(this.bbox)
    // p.clear()
    // p.background(0, 0, 0, .01);
    
//     Compute a new diagram
    let sites = []
    let count = 20
    for (var i = 0; i < count; i++) {
      let v = new Vector2D()
      let r = 100
      let theta = i*Math.PI*2/count
      v.setToPolar(r, theta)
      v.add(p.width/2, p.height/2)
      // Convert to {x,y}
      sites.push({x:v[0], y:v[1]})
    }
    
    for (var i = 0; i < count; i++) {
      let v = new Vector2D()
      let r = 40
      let theta = (i + .5)*Math.PI*2/count
      v.setToPolar(r, theta)
      v.add(p.width/2, p.height/2)
      // Convert to {x,y}
      sites.push({x:v[0], y:v[1]})
    }
    
    this.diagram = this.voronoi.compute(sites, this.bbox);
    
    let t = p.millis() * 0.001;
    // Each cell in the diagram
    this.diagram.cells.forEach((cell, cindex) => {
      p.stroke((cindex*30)%360, 100, 50)
      p.strokeWeight(2)
      
      p.beginShape()
      
      // Halfedges that define the cell
     
      cell.halfedges.forEach(hedge => {
        let e = hedge.edge
        // Two ends of the edge
        let va = e.va
        let vb = e.vb
//         TODO, KATE WILL SORT THESE SO WE CAN DRAW REGION
        // p.vertex(va.x, va.y)
        p.line(va.x, va.y, vb.x, vb.y)
      })
      
      p.endShape()
      p.circle(cell.site.x, cell.site.y, 10)
    })
  },
};
