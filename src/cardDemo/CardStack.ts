import { Container, Loader, Sprite, filters } from 'pixi.js';
import { normalize, randomRange } from 'utils';

import Game from 'game/Game';

export default class CardStack extends Container {
	static readonly CARDS_SCALE: number = 1.5;
	static readonly STACK_OFFSET: number = 1.5 * CardStack.CARDS_SCALE;
	static readonly CARD_ANGLE: number = 15;

	public totalCards: number = 0;
	private readonly popCardDelay: number = 1000;
	private readonly totalUniqueCards: number = Object.keys(
		Loader.shared.resources.cards.data.frames
	).length;

	public addCardsToStack(totalCards: number = 144) {
		for (let cardIndex = 0; cardIndex < totalCards; cardIndex++) {
			this.pushCard();
		}
	}

	public pushCard(newCard?: Sprite) {
		const { CARDS_SCALE, STACK_OFFSET, CARD_ANGLE } = CardStack;
		const { resources } = Loader.shared;

		const cardIndex = this.children.length;

		let card = newCard || null;
		if (!card) {
			card = new Sprite(
				resources.cards.spritesheet?.textures[
					`${randomRange(1, this.totalUniqueCards)}.png`
				]
			);
			card.scale.x = CARDS_SCALE;
			card.scale.y = CARDS_SCALE;
			card.angle = randomRange(0, CARD_ANGLE) - CARD_ANGLE / 2;
		}
		this.addChild(card);

		this.totalCards++;

		this.updateFilters();

		card.x = 0;
		card.y = -STACK_OFFSET * cardIndex;
		card.anchor.x = 0.5;
		card.anchor.y = 0.5;
	}

	public popCard(): { promise: Promise<void>; card: Sprite } {
		let card = this.children[this.children.length - 1];
		this.removeChild(card);
		this.totalCards--;
		this.parent.addChild(card);

		card.x = this.x;
		card.y = this.y - CardStack.STACK_OFFSET * this.children.length;

		const scaledPopCardDelay = Game.superSpeed ? 0 : this.popCardDelay;

		return {
			promise: new Promise<void>((resolve) => {
				setTimeout(() => {
					this.updateFilters();
					resolve();
				}, scaledPopCardDelay);
			}),
			card: card as Sprite,
		};
	}

	private updateFilters() {
		for (let cardIndex = 0; cardIndex < this.children.length; cardIndex++) {
			this.children[cardIndex].filters = []; // Ensure top card is not darkened.

			if (this.children.length > 1 && this.children[cardIndex - 1]) {
				let prevCard = this.children[cardIndex - 1];
				let colorMatrix = new filters.ColorMatrixFilter();
				colorMatrix.brightness(
					normalize(cardIndex, this.children.length + 100, -50),
					false
				);
				prevCard.filters = [colorMatrix];
			}
		}
	}

	destroy() {
		this.totalCards = 0;

		super.destroy();
	}
}
