/* globals Vector2D, Particle, ParticleSystem, p */

class RainSystem extends ParticleSystem{
  constructor() {
     // Make rain particles
   super(RainParticle, 100)
  this.windScale = 5
        
  }

 
  
  getWindAt(x, y) {
    let windTheta = 10*p.noise(x*this.windScale, y*this.windScale)
    let windSpeed = 10
    return Vector2D.polar(windSpeed, windTheta)
  }
}


class RainParticle extends Particle {
  constructor(ps, index) {
    super(ps, index)
    
    // Put these particles somewhere randomly on screen
    this.pos.setToRandom(-p.width/2, p.width/2, -p.height/2, p.height/2) // Set to a random (x0,x1,y0,y1)
    
  }  
  
  calculateForces(p, dt) {
    this.f.add(0, 10)
    
  }
  
  move(p, dt) {
    this.super(p, dt)
    
  }
  
  draw(p) {
    p.fill(100)
    p.circle(...this.pos, 1)
  }

}
