import './styles.css'
import * as THREE from 'three'

//Loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/height.jpg");


// Canvas
const canvas1 = document.querySelector('canvas.webgl1')
const canvas2 = document.querySelector('canvas.webgl2')

// Scene
const scene1 = new THREE.Scene()
const scene2 = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(1.1, 500, 500);


// Materials

const material = new THREE.MeshStandardMaterial({
    metalness : 0.1,
    roughness : 0.2,
    color : 0xAAAAAA,
    normalMap : normalTexture,
    bumpScale : 0.8
});

// Mesh
const sphere1 = new THREE.Mesh(geometry,material)
const sphere2 = new THREE.Mesh(geometry,material)
scene1.add(sphere1)
scene2.add(sphere2)



// Lights

const pointLight0 = new THREE.SpotLight(0x110000, 1)
pointLight0.power = 8
pointLight0.intensity = 2
pointLight0.position.set(19,-19,-200)
scene1.add(pointLight0)
scene2.add(pointLight0)


const pointLight2 = new THREE.PointLight(0x777777, 4.5)
pointLight2.position.set(-1.31,1.12,0.9)
scene1.add(pointLight2)


const pointLight3 = new THREE.PointLight(0x888888, 2.03)
pointLight3.position.set(0.67,3.32,-1.97)
scene2.add(pointLight3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



/**
 * Camera
 */
// Base camera
const camera1 = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100)
camera1.position.x = 0
camera1.position.y = 0
camera1.position.z = 2

const camera2 = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100)
camera2.position.x = 0
camera2.position.y = 0
camera2.position.z = 2

scene1.add(camera1)
scene2.add(camera2)

/**
 * Renderer
 */
const renderer1 = new THREE.WebGLRenderer({
    canvas: canvas1,
    alpha : true
})

const renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
    alpha : true
})

renderer1.setSize(sizes.width, sizes.height)
renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer2.setSize(sizes.width, sizes.height)
renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera1.aspect = sizes.width / sizes.height
    camera1.updateProjectionMatrix()

    camera2.aspect = sizes.width / sizes.height
    camera2.updateProjectionMatrix()

    // Update renderer
    renderer1.setSize(sizes.width, sizes.height)
    renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer2.setSize(sizes.width, sizes.height)
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => { 

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere1.rotation.y = 0.1 * elapsedTime;
    sphere2.rotation.y = 0.1 * elapsedTime;


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer1.render(scene1, camera1)
    renderer2.render(scene2, camera2)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
