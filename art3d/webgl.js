
const canvasSketch = require("canvas-sketch");
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
const eases = require('eases')
const BezierEasing = require('bezier-easing')

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");
const { ClampToEdgeWrapping } = require("three");
// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const settings = {
  //dimensions: [512, 512],
  fps: 24, 
  duration: 4, // in seconds
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  attribute: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("#ebebeb", 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  //const geometry = new THREE.SphereGeometry(1, 100, 100);

  const palette = random.pick(palettes)
  for (let i = 0; i < 150; i++) {
    // Setup a material
    let material = new THREE.MeshStandardMaterial({
      color: random.pick(palette),
    });
    // Setup a mesh with geometry + material
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    )
    mesh.scale.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    )
    mesh.scale.multiplyScalar(0.5)
    scene.add(mesh);
  }

  // Light 
  scene.add(new THREE.AmbientLight('pink'))

  // very harsh light coming from one side of the scene only
  const light = new THREE.DirectionalLight('white', 1)
  light.position.set(0, 0, 4) // directly above
  scene.add(light)

  const easeFn = new BezierEasing(0.67, 0.03, 0.29, 0.99)

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom 
      const zoom = 2
      // Bounds 
      camera.left = -zoom * aspect
      camera.right = zoom * aspect
      camera.top = zoom 
      camera.bottom = -zoom 
      // Near and far 
      camera.near = -100
      camera.far = 100
      // Set position and look at world center 
      camera.position.set(zoom, zoom, zoom)
      camera.lookAt(new THREE.Vector3())
      // Update the camera 
      camera.updateProjectionMatrix()
     
    },
    // Update & render your scene here
    render({ time, playhead }) {
      //mesh.rotation.y = time * 0.1
      // rotate the entire scene 
      const t = Math.sin(playhead * Math.PI)
      scene.rotation.y = easeFn(t) //eases.expoInOut(t)
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
