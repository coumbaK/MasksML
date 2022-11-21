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
    
    let t = p.millis() * 0.001;
    
  },
};
