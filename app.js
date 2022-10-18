/**
 * Starter code
 * Create N swatches
 * Each swatch has code for when it starts and each frame after
 */

/* globals Vue, p5,randomVector */

// TODO: ADD YOUR SYSTEM HERE

let p;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

window.addEventListener("load", function () {
  console.log("LOADED");
  let system;

  let activeTool = undefined;
  // Create a P5 canvas element, JS-style
  // https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
  const s = (p0) => {
    p = p0;
    p.setup = function () {
      //       For each class, create a new system

      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
      p.colorMode(p.HSL, 360, 100, 100);
      p.ellipseMode(p.RADIUS);
    };

    p.draw = function () {
      p.background(180, 80, 80);

      p.push();

      p.pop();
    };

    
    Vue.component("slider", {
      template: `<div class="slider">
        <input 
            type="range" min="0" max="1" step=".02"
            v-model="obj[objKey]"
            />
          <label>{{val.toFixed(2)}}</label>
      </div>`,
      props: ["objKey", "obj"]
    })
    new Vue({
      template: `<div id="controls">
        <div>
         
          <slider v-for="(index,val) in v" :objKey="index" obj="val">
          
        </div>
      
      </div>`,
      el: "#controls",
      data() {
        return {
          v: randomVector(10),
        };
      },
    });
  };

  const CANVAS_EL = document.getElementById("canvas-holder");
  CANVAS_EL.style.width = CANVAS_WIDTH + "px";
  CANVAS_EL.style.height = CANVAS_HEIGHT + "px";
  new p5(s, CANVAS_EL);
});
//======================
// Utilities
