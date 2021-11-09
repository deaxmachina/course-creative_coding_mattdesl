const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const createGrid = () => {
    const points = []
    const count = 40
    for (let x = 0; x < count; x++ ) {
      for (let y = 0; y < count; y++) {
        // get coords which are between 0 and 1 
        const u = x/(count - 1)
        const v = y/(count - 1)
        points.push([ u, v ])
      }  
    }
    return points
  }

  // get points and include randomness in which ones we end up displaying
  random.setSeed(10) // if you want deterministic random
  const points = createGrid()
    .filter(() => random.value() >= 0.5)
  const margin = 200

  return ({ context, width, height }) => {
    context.fillStyle = '#fff'
    context.fillRect(0, 0, width, height)

    points.forEach(([ u, v ]) => {
      // get the actual pixel pos of each point
      // const x = u * width 
      // const y = v * height
      // or interpolate from margin and not from top 
      const x = lerp(margin, width-margin, u)
      const y = lerp(margin, height-margin, v)

      // draw circles for the points
      context.beginPath()
      context.arc(x, y, 15, 0, Math.PI*2, false)
      context.strokeStyle = '#000'
      context.lineWidth = 10
      context.stroke()

    })
  };
}

canvasSketch(sketch, settings);
