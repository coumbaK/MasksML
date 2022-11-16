# Masks

Make two masks by remixing the provided [code](https://glitch.com/edit/#!/galaxykate-a8?path=a6-assignment.md%3A3%3A26)

Make a mask that is interesting and emergent. Don't simply try to recreate branded masks, but create something strange and new

Speedrun:

* For each mask
  * Write down what your initial plan or inspiration is (to remember)
  * Duplicate mask-test or one of the other sample masks
  * Fill out the information in description and title
  * **draw** draws the mask
  * **setup** can be used to create additional points or set variables

map of all the points https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/mesh_map.jpg

## Available tools

Use all of your P5 knowledge and tools: particle systems, repetition, transformations, curves, etc!

* Face:
  * mouth: 5 contour rings, outer to inner
  * centerLine: points from forehead to chin
  * top: forehead 
  * bottom: chin
  * nose: tip of the nose


* Per side:
  * eye: 5 contour rings, outer-to-inner, starting at inner eye and going over the top and down
  * eyeWidth, eyeHeight, eyeBlink
  * eyeInner, eyeOuter, eyeTop, eyeBottom, eyeCenter
  * face: 3 contours: outside of face to inside
  
  
Contour: a set of points
You can duplicate it or slice it 
face.sides[0].eyes[4].slice(0,5)

Powertool settings:

```

drawContour(p, contour, settings): draw this curve as a shape  
drawPoints(p, contour, settings): just draw the vertices (if you want to add onto the shape)  
drawRibbon(p, contour0, contour1, settings): draw two contours as the sides of a ribbon

```

* curve: true/false, use curve points instead of vertices
* close: true/false, close the shape after drawing

* INTERPOLATING
* lerpToPoint: Vector2D (your own or a face point)
  * This linearly interpolates each point on the contour towards a point
* lerpPct: float or a function returning a float
  * (index, percent along the contour, point)
  
* MOVING AND SCALING
* subtract: subtract from each point,
* scale: multiply the points after subtracting,
* add: Vector2D added after subtracting and scaling each point,
* side0: settings for the first contour in a ribbon
* side1: settings for the second contour in a ribbon


  