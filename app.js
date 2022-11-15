 const CANVAS_WIDTH = 500;
      const CANVAS_HEIGHT = 300;

const VIDEO_SRC = ["https://cdn.glitch.global/f422c25d-a910-4374-8c72-f41291b2b254/youtuber.mp4?v=1668534362785" , "https://cdn.glitch.global/f422c25d-a910-4374-8c72-f41291b2b254/monologs-2.mp4?v=1668546942642"]

window.addEventListener("load", function () {
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  //------------------------------------------------------
  // VUE!!!
  // Create a new vue interface
  
//   This has to stay outside of Vue, 
  // otherwise the Vector2d extention-of-arrays 
  // and the Vue extension of datatypes will fight
  const face = new Face()

  new Vue({
    template: `<div id="app">
	    <div id="view">
        <video controls muted id="video" crossorigin="anonymous" width="500" height="400">


        <!-- https://www.lvlt.org/thequarantinemonologues -->
        <source :src="sourceURL" type="video/mp4">

        </video>
        <div ref="canvasHolder" class="canvas-holder"></div>		
      </div>
		  
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
          
          let facePts = this.facePredictions[0]?.scaledMesh
          let box = this.facePredictions[0]?.boundingBox
          
         // if (facePts) {
         //   facePts.forEach(pt => {
         //     p.circle(pt[0], pt[1], 2)
         //   })
         // }
          
         face.drawDebug(p)
        };

        p.mouseClicked = () => {
          // Mouse interaction
        };
      };

      let p = undefined;
     
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
        face.setTo(this.facePredictions[0])
        // if (facePredictionCount%10==0)
        //   console.log(facePredictionCount, this.facePredictions)
      });
    },

    // We will use your data object as the data for Vue
    data() {
      return {
        sourceURL: VIDEO_SRC[1],
        sources: VIDEO_SRC,
        facePredictions: [],
      };
    },
    el: "#app",
  });
});
