import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)

// Buffer geometry
const geometry = new THREE.BufferGeometry()

const count = 50 // number of triangles
const positionsArray = new Float32Array(count * 3 * 3) // 50 triangles, each triangle has 3 vertices, each vertex has 3 values (x, y, z)

for(let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = Math.random() - 0.5
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

geometry.setAttribute('position', positionsAttribute)

// // Create a triangle
// const geometry = new THREE.BufferGeometry()

// // First method (triangle)
// const positionsArray = new Float32Array(9)

// // first vertex
// positionsArray[0] = 0 // x
// positionsArray[1] = 0 // y
// positionsArray[2] = 0 // z


// // second vertex
// positionsArray[3] = 0 
// positionsArray[4] = 1
// positionsArray[5] = 0


// // third vertex
// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0

// // Second method (triangle)
// const positionsArray = new Float32Array([
//     0, 0, 0, // first vertex [x, y, z]
//     0, 1, 0, // second vertex
//     1, 0, 0  // third vertex
// ])

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()