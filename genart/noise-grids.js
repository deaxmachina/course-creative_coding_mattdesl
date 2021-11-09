const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6)
  const palette = random.pick(palettes).slice(0, colorCount)
  console.log(palette)

  const createGrid = () => {
    const points = []
    const count = 30
    for (let x = 0; x < count; x++ ) {
      for (let y = 0; y < count; y++) {
        // get coords which are between 0 and 1 
        const u = x/(count - 1)
        const v = y/(count - 1)
        const radius = Math.abs(random.noise2D(u, v)) * 0.1
        points.push({
          color: random.pick(palette),
          position: [ u, v ],
          radius,
          rotation: random.noise2D(u, v)
        })
      }  
    }
    return points
  }

  // get points and include randomness in which ones we end up displaying
  //random.setSeed(10) // if you want deterministic random
  const points = createGrid()
    .filter(() => random.value() >= 0.5)
  const margin = 400

  return ({ context, width, height }) => {
    context.fillStyle = '#fff'
    context.fillRect(0, 0, width, height)

    points.forEach((data) => {
      const { position, radius, color, rotation } = data
      const [u, v] = position
      // interpolate from margin and not from top 
      const x = lerp(margin, width-margin, u)
      const y = lerp(margin, height-margin, v)

      // draw circles for the points
      // context.beginPath()
      // context.arc(x, y, radius * width, 0, Math.PI*2, false)
      // context.fillStyle = color
      // context.fill()

      // draw text item at each position 
      context.save()
      context.fillStyle = color 
      context.font = `${radius*width}px "Arial"`
      context.translate(x, y)
      context.rotate(rotation)
      context.fillText('=', 0, 0)
      context.restore()
    })
  };
}

canvasSketch(sketch, settings);