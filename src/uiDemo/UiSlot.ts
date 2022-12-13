import { Container, Text, Sprite, Loader } from 'pixi.js';

import { randomRange, randomTextChar } from 'utils';

export default class UiSlot extends Container {
	static stopAnimations: boolean = false;

	private textComponent: Text | null;
	private imageComponent: Sprite | null;

	public init() {
		const roll = randomRange(0, 1);

		if (roll === 0) this.showText();
		else this.showImage();
	}

	public showText() {
		this.removeContent();

		this.textComponent = new Text();
		for (let i = 0; i < 10; i++) {
			this.textComponent.text += randomTextChar();
		}
		this.textComponent.style.fontSize = randomRange(8, 32);

		this.textComponent.x = -this.textComponent.width / 2;
		this.textComponent.y = -this.textComponent.height / 2;

		this.addChild(this.textComponent);
	}

	public showImage() {
		this.removeContent();

		this.imageComponent = new Sprite(
			Loader.shared.resources.cards.spritesheet?.textures[
				`${randomRange(1, 10)}.png`
			]
		);

		this.imageComponent.anchor.x = 0.5;
		this.imageComponent.anchor.y = 0.5;

		this.addChild(this.imageComponent);
	}

	private removeContent() {
		if (this.textComponent && !this.textComponent.destroyed) {
			this.textComponent.destroy();
			this.textComponent = null;
		}
		if (this.imageComponent && !this.imageComponent.destroyed) {
			this.imageComponent.destroy();
			this.imageComponent = null;
		}
	}
}
