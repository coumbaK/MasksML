/* globals allMasks  Vector2D, drawContour, computeVoronoi */

allMasks["voronoi"] = {
  title: "Voronoi demo mask",
  description: "Showing off Voronoi",
  setup(p, face) {},

  draw(p, face) {
    p.clear();

    let voronoiPts = [];
    const boundingBox = (0, 0, p.width, p.height);
    face.sides.forEach((side) => voronoiPts.push(side.eye[0]));
    console.log(voronoiPts);
    computeVoronoi(boundingBox, voronoiPts).forEachCell((center, points, neighbors) => {
      console.log(center)
      p.circle(...center, 10)
      
    });
  },
};
