import { Container, isMobile } from 'pixi.js';

import Game from 'game/Game';
import UiSlot from 'uiDemo/UiSlot';
import { getOrientation } from 'utils';

export default class UiDemo extends Container {
	static stopAnimations: boolean = false;
	static padding: number = 20;

	private animationDuration: number = 2000;
	private timeoutId: any;

	private UiSlotContainer: Container;
	private UiSlot1: UiSlot | null;
	private UiSlot2: UiSlot | null;
	private UiSlot3: UiSlot | null;

	constructor() {
		super();
		UiDemo.stopAnimations = false;

		this.UiSlotContainer = new Container();
		this.UiSlot1 = new UiSlot();
		this.UiSlot2 = new UiSlot();
		this.UiSlot3 = new UiSlot();

		this.UiSlotContainer.x = Game.width / 2;
		this.UiSlotContainer.y = Game.height / 2;

		// if (!isMobile.any || getOrientation() === 'landscape') {
		// 	this.UiSlot1.x = -200;
		// 	this.UiSlot3.x = 200;
		// }

		this.UiSlotContainer.addChild(this.UiSlot1, this.UiSlot2, this.UiSlot3);
		this.addChild(this.UiSlotContainer);
	}

	init() {
		this.randomSlotContentLoop();
	}

	randomSlotContentLoop() {
		this.UiSlot1?.init();
		this.UiSlot2?.init();
		this.UiSlot3?.init();
		this.timeoutId = setTimeout(
			() => {
				this.randomSlotContentLoop();
			},
			Game.superSpeed
				? this.animationDuration / 20
				: this.animationDuration
		);
	}

	update(_dt: number) {
		this.UiSlotContainer.x = Game.width / 2;
		this.UiSlotContainer.y = Game.height / 2;

		if (isMobile.any && getOrientation() === 'portrait') {
			if (this.UiSlot1) {
				this.UiSlot1.x = 0;
				this.UiSlot1.y = -200;
			}
			if (this.UiSlot3) {
				this.UiSlot3.x = 0;
				this.UiSlot3.y = 200;
			}
		} else {
			if (this.UiSlot1) {
				this.UiSlot1.x = -200;
				this.UiSlot1.y = 0;
			}
			if (this.UiSlot3) {
				this.UiSlot3.x = 200;
				this.UiSlot3.y = 0;
			}
		}
	}

	destroy() {
		UiDemo.stopAnimations = true;

		if (this.UiSlot1) {
			this.UiSlot1.destroy();
			this.UiSlot1 = null;
		}

		if (this.UiSlot2) {
			this.UiSlot2.destroy();
			this.UiSlot2 = null;
		}

		if (this.UiSlot3) {
			this.UiSlot3.destroy();
			this.UiSlot3 = null;
		}

		clearTimeout(this.timeoutId);

		super.destroy();
	}
}
