import {
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
	WebGLRenderer
} from 'three';

import { cameraConfig, viewportConfig } from '../threeGame/config/gameConfig';

export default class Game {
	public renderer: WebGLRenderer = new WebGLRenderer();
	private camera: PerspectiveCamera;
	private cube: Mesh;
	private geometry: BoxGeometry;
	private material: MeshBasicMaterial;
	private scene: Scene = new Scene();

	constructor() {
		this.camera = new PerspectiveCamera(
			cameraConfig.fov,
			cameraConfig.aspect,
			cameraConfig.near,
			cameraConfig.far
		);
	}

	render = (): void => {
		requestAnimationFrame(this.render);

		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;
		this.renderer.render(this.scene, this.camera);
	};

	start(): void {
		this.renderer.setSize(viewportConfig.width, viewportConfig.height);
		this.geometry = new BoxGeometry(1, 1, 1);
		this.material = new MeshBasicMaterial({ color: 0x00ff00 });
		this.cube = new Mesh(this.geometry, this.material);

		this.scene.add(this.cube);

		this.camera.position.z = 2.5;

		this.render();
	}
}
