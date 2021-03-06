const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: 'A4',
  units: 'in',
  pixelsPerInch: 300
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'orangered';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'orange'
    context.beginPath()
    context.arc(width/2, height/2, width*0.2, 0, Math.PI*2, false)
    context.fill()

    context.lineWidth = width * 0.05
    context.strokeStyle = 'white'
    context.stroke()




  };
};

canvasSketch(sketch, settings);
