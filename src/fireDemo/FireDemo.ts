import { Container } from 'pixi.js';
import { Emitter, LinkedListContainer } from '@pixi/particle-emitter';

import Game from 'game/Game';
import emitterConfig from 'fireDemo/fireDemoEmitterConfig';

export default class FireDemo extends Container {
	private emitter: Emitter;
	private emitterContainer: LinkedListContainer;

	constructor() {
		super();
		Game.bg.tint = 0x000000;

		document.addEventListener('pointerup', (e: any) => {
			this.emitter.emit = true;
			this.emitter.resetPositionTracking();
			this.emitter.updateOwnerPos(e.offsetX, e.offsetY);
		});
	}

	init() {
		this.emitterContainer = new LinkedListContainer();
		this.addChild(this.emitterContainer);

		this.emitter = new Emitter(this.emitterContainer, emitterConfig);
		this.emitter.updateOwnerPos(Game.width / 2, Game.height / 2);
		this.emitter.resetPositionTracking();
		this.emitter.emit = true;
	}

	update(dt: number) {
		this.emitter.update(dt);
	}

	destroy() {
		super.destroy();
	}
}
