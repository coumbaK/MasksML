const GENERATORS = {
  rectangle: {
    description: "A very basic and boring generator satisfying the requirements",
    sliders: [{
      label: "aspectRatio",
    },{
      label: "size",
    }, {
      label: "rotation",
    }, {
      label: "hue",
    }, {
      label: "brightness",
    }],
    
    setup(p) {
      
    },
    
    draw(p, t, dna) {
      let x = 0
      let y = 0
      
      let size = dna[0]*60 + 40
      let aspectRatio = dna[1] + .6
      let angle = dna[1] - .5
      
      // How about a little bounce at least?
      let bounce = Math.abs(Math.sin(t*3))
      aspectRatio += .2 + -.5*bounce
      let stickiness = .3
      let jumpHeight = 60
      y -= Math.max(0, jumpHeight*(Math.abs(Math.sin(t*3 + .2)) - stickiness))
      angle = p.lerp(0, angle, bounce)
      
     
      let w = size*aspectRatio
      let h = size*(1/aspectRatio)
     
      
      let hue = dna[3]*360
      let brightness = dna[4]*40 + 40
      
      
      p.push()
      
      // move the rectangle
      p.translate(x,y)
      p.rotate(angle)
      
      p.fill(hue, 100, brightness)
      p.stroke(hue, 100, brightness + 30)
       p.rect(-w/2, 0, w, -h)
      
      // eyes!
      let eyeWidth = w*.3
      let eyeHeight = h*.5
      let eyeSize = 10
      
      function drawEye() {
        
          p.fill(0)
      p.noStroke()
      p.ellipse(0, 0, eyeSize, eyeSize)
      
       p.fill(100)
      p.noStroke()
      p.fill(hue, 100, brightness + 20)
      p.ellipse(0, -eyeSize*.4, eyeSize*.6, eyeSize*.6)
      }
      
      // Only two eyes....?
      p.push()
      p.translate(eyeWidth, -eyeHeight)
      p.scale(1, bounce)
      drawEye()
      p.pop()
      
       p.push()
      
      p.translate(-eyeWidth, -eyeHeight)
      p.scale(1, bounce)
      drawEye()
      p.pop()
      
      
      p.pop()
    }
  }
  
  
  
}