import { GameObjects, Physics, Scene } from 'phaser';
import gameConfig from '../config/gameConfig';

export default class GameScene extends Scene {
	static sceneName: string = 'Game';
	private background: GameObjects.Image;
	private emitter: GameObjects.Particles.ParticleEmitter;
	private logo: Physics.Arcade.Image;
	private particles: GameObjects.Particles.ParticleEmitterManager;

	create() {
		this.background = this.add.image(
			gameConfig.width / 2,
			gameConfig.height / 2,
			'sky'
		);

		this.background.setScale(gameConfig.width / this.background.width);

		this.particles = this.add.particles('red');

		this.emitter = this.particles.createEmitter({
			speed: 100,
			scale: { start: 1, end: 0 },
			blendMode: 'ADD'
		});

		this.logo = this.physics.add.image(400, 100, 'logo');
		this.logo.setVelocity(100, 200);
		this.logo.setBounce(1, 1);
		this.logo.setCollideWorldBounds(true);

		this.emitter.startFollow(this.logo);
	}

	preload() {
		this.load.setBaseURL('http://labs.phaser.io');

		this.load.image('sky', 'assets/skies/space3.png');
		this.load.image('logo', 'assets/sprites/phaser3-logo.png');
		this.load.image('red', 'assets/particles/red.png');
	}
}
