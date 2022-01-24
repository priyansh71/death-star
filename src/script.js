import './styles.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'

//Loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/textures/height.jpg");

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(1.1, 500, 500);


// Materials

const material = new THREE.MeshStandardMaterial({
    metalness : 0.1,
    roughness : 0.2,
    color : 0xAAAAAA,
    normalMap : normalTexture,
    bumpScale : 1.0
});

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)



// Lights

const pointLight1 = new THREE.SpotLight(0x110000, 2)
pointLight1.power = 9
pointLight1.position.set(19,-19,-145)
scene.add(pointLight1)


const pointLight2 = new THREE.PointLight(0x999999, 4.35)
pointLight2.position.set(-1.31,1.12,0.9)
scene.add(pointLight2)


const pointLight3 = new THREE.PointLight(0x888888, 2.03)
pointLight3.position.set(0.67,3.32,-1.97)
scene.add(pointLight3)


/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => { 

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.01 * elapsedTime;


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
