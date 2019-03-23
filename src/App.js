import React, { Component } from 'react';
import * as THREE from 'three';

class App extends Component {
  componentDidMount() {
    const WIDTH = this.mount.clientWidth;
    const HEIGHT = this.mount.clientHeight;

    // ADD SCENE
    this.scene = new THREE.Scene()

    // ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      45,
      WIDTH / HEIGHT,
      0.1,
      1000
    )
    this.camera.position.set(0, 0, 30)

    // ADD RENDERER
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0xEEEEEE);
    this.renderer.setSize(WIDTH, HEIGHT);
    this.mount.appendChild(this.renderer.domElement)

    // ADD CUBE
    const geo = new THREE.BoxGeometry(4, 4, 4);
    const mat = new THREE.MeshBasicMaterial({ color: '#BADA55'})

    this.cube = new THREE.Mesh(geo, mat)
    this.scene.add(this.cube)

    this.start()
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return (
      <div
      style={{width, height}}
        ref={(mount) => this.mount = mount}
      />
    );
  }
}

export default App;
