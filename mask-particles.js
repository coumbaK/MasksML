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
    
    face.sides.forEach(side => {
      let beardContour = side.face[0].slice(0, 10)
      
      beardContour.forEach(() => {
     
      })
    })
     
    }
  },

  draw(p, face) {
    let t = p.millis()*.01
    let dt = p.deltaTime*.001
    
    p.clear()
    this.particles.forEach(pt => p.circle(...pt, 4))
    
    // Set the forces
    this.particles.forEach(pt => {
      // console.log(pt)
      // reset forces
      pt.force.mult(0)
      let noseForce = pt.getForceTowardsPoint(face.nose, 10)
      pt.force.add(noseForce)
    })
    
     // Apply force to velocity and velocity to position
    this.particles.forEach(pt => {
      pt.velocity.addMultiple(pt.force, dt)
       pt.addMultiple(pt.velocity, dt)
      
      // Limit the velocity
      pt.velocity.constrainMagnitude(1, 100)
      
    })
    
    this.particles.forEach(pt => {
      pt.drawArrow(p, pt.force, { m:.1, color: [0, 0, 0] }) 
    })
  },
};
