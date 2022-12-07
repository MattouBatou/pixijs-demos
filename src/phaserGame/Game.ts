import { Game as PhaserGame } from 'phaser';
import config from './config/gameConfig';

import GameScene from './scenes/GameScene';

export default class Game extends PhaserGame {
	constructor(parent: string | HTMLElement) {
		super(parent ? { ...config, parent } : config);

		this.scene.add(GameScene.sceneName, GameScene, true);
	}
}
