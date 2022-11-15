window.addEventListener("load", function () {
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  // VUE!!!
  // Create a new vue interface

  new Vue({
    template: `<div id="app">
	    
         <video controls muted id="video" crossorigin="anonymous">
      

<!-- https://www.lvlt.org/thequarantinemonologues -->
        <source src="https://cdn.glitch.global/f422c25d-a910-4374-8c72-f41291b2b254/youtuber.mp4?v=1668534362785" type="video/mp4">
     
      </video>
      <div ref="canvasHolder" class="canvas-holder"></div>		
      
		  
  </div>`,

    mounted() {
      // Create P5 when we mount this element
      const s = (p0) => {
        p = p0;

        (p.preload = () => {
          // Any preloading
        }),
          (p.setup = () => {
            p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
            p.colorMode(p.HSL, 360, 100, 100);
            p.ellipseMode(p.RADIUS);
          });

        p.draw = () => {
          p.clear(0, 0, 0, 0)
          // Draw something
          p.circle(0, 0, 100);
          
          let facePts = this.facePredictions[0]?.mesh
         if (facePts) {
           facePts.forEach(pt => {
             p.circle(pt[0], pt[1], 2)
           })
         }
        };

        p.mouseClicked = () => {
          // Mouse interaction
        };
      };

      let p = undefined;
      const CANVAS_WIDTH = 200;
      const CANVAS_HEIGHT = 200;
      // Create P5
      const CANVAS_EL = this.$refs.canvasHolder;
      CANVAS_EL.style.width = CANVAS_WIDTH + "px";
      CANVAS_EL.style.height = CANVAS_HEIGHT + "px";
      new p5(s, CANVAS_EL);
      
      //-----------------------------------
      //       Setup the video
      const video = document.getElementById("video");

      // When the model is loaded
      function modelLoaded() {
        console.log("Model Loaded!");
      }

      // Create a new facemesh method
      let facePredictionCount = 0;
      const facemesh = ml5.facemesh(video, modelLoaded);

      // Listen to new 'face' events
      facemesh.on("face", (results) => {
        facePredictionCount++
        // console.log("new face")
        this.facePredictions = results;
        if (facePredictionCount%10==0)
          console.log(facePredictionCount, this.facePredictions)
      });
    },

    // We will use your data object as the data for Vue
    data() {
      return {
        facePredictions: [],
      };
    },
    el: "#app",
  });
});
