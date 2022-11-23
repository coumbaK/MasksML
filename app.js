/* globals Vector2D, allMasks, ml5, Vue, Face, p5 */

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 300;
let p = undefined;

const VIDEO_SRC = [
  //    https://www.lvlt.org/thequarantinemonologues
  "https://cdn.glitch.global/f422c25d-a910-4374-8c72-f41291b2b254/youtuber.mp4?v=1668534362785",
  "https://cdn.glitch.global/f422c25d-a910-4374-8c72-f41291b2b254/monologs-2.mp4?v=1668546942642",
];

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
  const face = new Face();

  new Vue({
    template: `<div id="app">
      <div id="controls">
        <select v-model="selectedID">
          <option v-for="maskID in Object.keys(allMasks)">{{maskID}}</option>
        </select>
        <button @click="switchInput">webcam</button>
      </div>
	    <div id="view">
        
        <!-- recorded video -->         
        <video controls muted id="video" ref="video" crossorigin="anonymous" v-if="true">
          <source :src="sourceURL" type="video/mp4">
        </video>
        
        <!-- live webcam -->         
        <video id="webcam" ref="webcam" />
        
        <div ref="canvasHolder" class="canvas-holder"></div>		
      </div>
      
		  
  </div>`,
    computed: {
      selectedMask() {
        return this.allMasks[this.selectedID];
      },
    },

    watch: {
      selectedMask() {
        console.log("SELECTED MASK", this.selectedID);
        this.selectedMask?.setup?.(p, face);
        localStorage.setItem("lastMask", this.selectedID);
      },
    },
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

            // Initialize the first mask
            this.selectedMask?.setup?.(p, face);
          });

        p.draw = () => {
          // face.drawDebug(p);
          this.selectedMask.draw(p, face);
        };

        p.mouseClicked = () => {
          // Mouse interaction
        };
      };

      // Create P5
      const CANVAS_EL = this.$refs.canvasHolder;
      CANVAS_EL.style.width = CANVAS_WIDTH + "px";
      CANVAS_EL.style.height = CANVAS_HEIGHT + "px";

      p = new p5(s, CANVAS_EL);
  
      // When the video is loaded, start face detection
      let video = this.$refs.video;
      video.addEventListener("loadeddata", (event) => {
        console.log("Loaded video data!");
        this.startFaceDetection();
      });
    },

    methods: {
      startFaceDetection() {
        console.log("STARTING FACE DETECTION ON VIDEO");
        let video = this.$refs.video;
        // Create a new facemesh method
        let facePredictionCount = 0;

        // When the model is loaded
        function modelLoaded() {
          console.log(facemesh);
          console.log("Model Loaded!");
        }
        const facemesh = ml5.facemesh(video, modelLoaded);

        // Listen to new 'face' events
        facemesh.on("face", (results) => {
          facePredictionCount++;
          // console.log("new face")

          this.facePredictions = results;
          face.setTo(this.facePredictions[0]);
          // if (facePredictionCount%10==0)
          //   console.log(facePredictionCount, this.facePredictions)
        });
      },

      switchInput() {
        console.log(this);
        let video = this.$refs.video;
        console.log("Switch input");
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            const webcam = this.$refs.webcam;
            webcam.srcObject = stream;

            webcam.addEventListener(
              "loadeddata",
              (event) => {
                console.log("Loaded data!");
                // this.startFaceDetection()
              },
              () => {
                console.log("ERR");
              }
            );
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },

    // We will use your data object as the data for Vue
    data() {
      let lastID = localStorage.getItem("lastMask");
      if (!allMasks[lastID]) lastID = Object.keys(allMasks)[0];
      return {
        allMasks: allMasks,
        selectedID: lastID,

        sourceURL: VIDEO_SRC[0],
        sources: VIDEO_SRC,
        facePredictions: [],
      };
    },
    el: "#app",
  });
});
