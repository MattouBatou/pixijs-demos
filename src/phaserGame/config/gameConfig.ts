import { AUTO } from 'phaser';

export default {
	type: AUTO,
	width: 1024,
	height: 768,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	}
};
