/* globals allMasks  Vector2D, drawContour, computeVoronoi */

allMasks["particles"] = {
  title: "Particle demo mask",
  description: "Showing off particles",
  setup(p, face) {
    this.particles = [];

    function makeParticle() {
      let particle = new Vector2D();
      particle.velocity = new Vector2D();
      particle.force = new Vector2D();
      return particle;
    }

    for (var i = 0; i < 3; i++) {
      face.sides.forEach((side) => {
        let faceContour = side.face[i];
        let startIndex = 10;
        let beardContour = faceContour.slice(startIndex);
        let previousPoint = faceContour[startIndex - 1];

        beardContour.forEach((originalPoint, index) => {
          let particle = makeParticle();
          particle.setTo(originalPoint);
          particle.lerpTo(face.nose, -.3*i)
          
          particle.type = "beard";
          particle.beardLayer = i;
          particle.beardLength = index*.2 + 1
          particle.previous = previousPoint;
          particle.original = originalPoint;
          this.particles.push(particle);

          // Store the previous
          previousPoint = originalPoint;
        });
      });
    }
    
    for (var i = 0; i < 3; i++) {
        let faceContour = face.mouth[i];
        let startIndex = 1;
        let endIndex = 10;
        let beardContour = faceContour.slice(startIndex, endIndex);
        let previousPoint = faceContour[startIndex -1];

        beardContour.forEach((originalPoint, index) => {
          let particle = makeParticle();
          particle.setTo(originalPoint);
          particle.lerpTo(face.nose, -.3*i)
          
          particle.type = "mustache";
          particle.beardLayer = i;
          particle.beardLength = 2
          particle.previous = previousPoint;
          particle.original = originalPoint;
          this.particles.push(particle);

          // Store the previous
          previousPoint = originalPoint;
        });
      
    }
  },

  draw(p, face) {
    let t = p.millis() * 0.01;
    let dt = p.deltaTime * 0.001;

    p.clear();
    this.particles.forEach((pt) => p.circle(...pt, 4));

    // Set the forces
    this.particles.forEach((pt) => {
      // console.log(pt)
      // reset forces
      pt.force.mult(0);

      // add gravity
      pt.force.add(0, 10);

      // Be repelled by the nose
      // let noseForce = pt.getForceTowardsPoint(face.nose, -10, {falloff: .5});
      // pt.force.add(noseForce);

      // But attracted to your offset point
      let offsetPoint = new Vector2D();
      let pct = -0.5 * (pt.beardLayer + 1 + pt.beardLength);
      
      offsetPoint.setToLerp(pt.original, face.nose, pct);
      let rootForce = pt.getForceTowardsPoint(offsetPoint, 100, {
        falloff: 0.5,
      });
      pt.force.add(rootForce);
    });

    // Apply force to velocity and velocity to position
    this.particles.forEach((pt) => {
      pt.velocity.addMultiple(pt.force, dt);
      pt.addMultiple(pt.velocity, dt);

      // Limit the velocity
      pt.velocity.mult(0.98);
      pt.velocity.constrainMagnitude(1, 10000);
    });

    this.particles.forEach((pt) => {
      pt.drawArrow(p, pt.force, { m: .1, color: [0, 0, 0] });
    });

    // Draw some beard triangles
    this.particles.forEach((pt) => {
      let hue = 100
      if (pt.type === "mustache")
        hue = 200
      
      // this gives it a little more fill
       p.fill(hue, 100, 40 + 10 * pt.beardLayer - 20);
      p.circle(...pt.original, 10)
      
       p.fill(hue, 100, 40 + 10 * pt.beardLayer);
     p.beginShape();
     
      p.vertex(...pt.original);
      p.vertex(...pt.previous);
      p.vertex(...pt);

      p.endShape();
    });
  },
};
