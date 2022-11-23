/* globals allMasks  Vector2D, drawContour, computeVoronoi */

allMasks["particles"] = {
  title: "Particle demo mask",
  description: "Showing off particles",
  setup(p, face) {
    this.particles = [];
    
    function makeParticle() {
      let particle = new Vector2D()
      particle.velocity = new Vector2D()
       particle.force = new Vector2D()
      return particle
    }
    
    let count = 80;
    for (var i = 0; i < count; i++) {
      let pt = new Vector2D();
      let r = 10 * i ** 0.7 + 90;
      let theta = i ** 0.7;
      let particle = makeParticle()
      pt.setToPolar(r, theta);
      pt.add(p.width / 2, p.height / 2);
      this.particles.push(pt);
    }
  },

  draw(p, face) {
     p.clear()
    this.particles.forEach(pt => p.circle(...pt, 4))
    
    // Set the forces
    this.particles.forEach(pt => {
      // reset forces
      pt.force.mult(0)
    })
    
  },
};
