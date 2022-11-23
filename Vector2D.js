/**
 * Vector utilities
 * Kate Compton
 * Things we often need when working with vectors
 * Drawing arrows
 */

function wrapValue(x, min, max) {
  let dx = max - min;

  let x2 = ((((x - min) % dx) + dx) % dx) + min;

  return x2;
}

class Vector2D extends Array {
  constructor(x = 0, y = 0) {
    if (Array.isArray(x)) {
      // Clone!
      super(...x);
    } else {
      super(x, y);
    }
    return this;
  }
  
  clone() {
    return new Vector2D(this)
  }


  mult(m) {
    this[0] *= m;
    this[1] *= m;
    return this;
  }

  div(m) {
    this[0] /= m;
    this[1] /= m;
    return this;
  }

  add(x, y) {
    if (Array.isArray(x)) {
      this[0] += x[0];
      this[1] += x[1];
    } else {
      this[0] += x;
      this[1] += y;
    }

    return this;
  }

  sub(x, y) {
    if (Array.isArray(x)) {
      this[0] -= x[0];
      this[1] -= x[1];
    } else {
      this[0] -= x;
      this[1] -= y;
    }

    return this;
  }

  addMultiple(v, m = 1) {
    if (!(v instanceof Vector2D)) throw "addMultiple needs a Vector2D";
    this[0] += v[0] * m;
    this[1] += v[1] * m;
    return this;
  }

  addPolar(r, theta) {
    if (r === undefined) throw "passed undefined r to addPolar";
    if (theta === undefined) throw "passed undefined theta to addPolar";
    this[0] += r * Math.cos(theta);
    this[1] += r * Math.sin(theta);
   return this
   }

  setTo(x, y) {
    if (Array.isArray(x)) {
      this[0] = x[0];
      this[1] = x[1];
    } else {
      this[0] = x;
      this[1] = y;
    }
    return this
  }

  setToPolar(r, theta) {
    this[0] = r * Math.cos(theta);
    this[1] = r * Math.sin(theta);
    return this
  }
  
  setToLerp(v0, v1, pct) {
    this[0] = v0[0]*(1-pct) + v1[0]*(pct)
    this[1] = v0[1]*(1-pct) + v1[1]*(pct)
    return this
  }
  
  lerpTo(v, pct) {
     this[0] = this[0]*(1-pct) + v[0]*(pct)
    this[1] = this[1]*(1-pct) + v[1]*(pct)
    return this
  }
  
   moveTowards(v, dist) {
     let dx = v[0] - this[0]
     let dy = v[1] - this[1]
     let d = Math.sqrt(dx*dx + dy*dy)
     
//      Skip out early
     if (d == 0)
       return this
     
     if (d < dist)
       this.setTo(v)
     else {
       this[0] += dx*dist/d
       this[1] += dy*dist/d
     }

    return this
  }

  setToRandom(x0, x1, y0, y1) {
    if (
      x0 === undefined ||
      x1 === undefined ||
      y0 === undefined ||
      y1 === undefined
    )
      throw `passed undefined value to setToRandom ${arguments}`;
    
    this[0] = Math.random() * (x1 - x0) + x0;
    this[1] = Math.random() * (y1 - y0) + y0;
    return this
  }

  wrapX(min, max) {
    this[0] = wrapValue(this[0], min, max);
    return this
  }

  wrapY(min, max) {
    this[1] = wrapValue(this[1], min, max);
    return this
  }

  constrainMagnitude(min, max) {
    let m = this.magnitude;
    if (m == 0) return this;
    let m2 = Math.min(max, Math.max(min, m));
    this.mult(m2 / m);
    return this
  }

  get magnitude() {
    return Math.sqrt(this[0] ** 2 + this[1] ** 2);
  }

  get angle() {
    return Math.atan2(this[1], this[0]);
  }
  
  getDistanceTo(v) {
    return Math.sqrt((this[0]-v[0]) ** 2 + (this[1]-v[1]) ** 2);
  }

  getForceTowardsPoint(center, amt = 1, { falloff = 1, startRadius } = {}) {
    let offset = Vector2D.sub(center, this);

    // How much force should be applied?
    // Take our current distance
    let d = offset.magnitude;

    // Skip undefined situations where the points are at distance 0
    if (d === 0 || isNaN(d)) return new Vector2D(0,0);

    let x = d;
    // Treat distances less than or greater than the thresholds as being *at* those thresholds
    if (startRadius !== undefined) x = Math.max(d - startRadius, 0);

    let strength = amt * x ** falloff;

    return offset.mult(strength / d);
  }

  //======================
  // Drawing things

  drawArrow(p, v, { m = 1, color = [0, 0, 0] } = {}, headSize = 1) {
    if (v == undefined || !Array.isArray(v))
      throw "No v passed, drawArrow(p, v, {settings}), v=" + v;
    let x = this[0];
    let y = this[1];
    let vx = v[0];
    let vy = v[1];
    let x1 = x + m * vx;
    let y1 = y + m * vy;

    let mag = v.magnitude;
    p.stroke(...color);
    p.line(x, y, x1, y1);
    p.noStroke();
    p.fill(...color);
    // Draw the arrowhead
    p.push();
    p.translate(x1, y1);
    p.beginShape();
    p.rotate(v.angle);
    p.vertex(0, 0);
    p.vertex(-10 * headSize, 5 * headSize);
    p.vertex(-5 * headSize, 0);
    p.vertex(-10 * headSize, -5 * headSize);

    p.endShape();
    p.pop();
    return this
  }
  
  drawLineTo(p, v) {
    p.line(...v, ...this)
    return this
  }
  //======================
  // Drawing things

  toString() {
    return `(${this[0].toFixed(2)}, ${this[1].toFixed(2)})`;
  }

  static polar(r, theta) {
    return new Vector2D(r * Math.cos(theta), r * Math.sin(theta));
  }

  static sub(u, v) {
    return new Vector2D(u).sub(v);
  }
  static add(u, v) {
    return new Vector2D(u).add(v);
  }
}
