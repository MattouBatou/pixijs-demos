import { Container, Loader } from 'pixi.js';
import { animate, easeIn, easeOut, easeInOut } from 'popmotion';

import { bigBackIn, bigBackOut, randomRange } from 'utils';
import CardStack from 'cardDemo/CardStack';
import Game from 'game/Game';

type popPlaybackControls = { stop: () => void };

export default class CardDemo extends Container {
	static stopAnimations: boolean = false;

	private leftStack: CardStack | null;
	private rightStack: CardStack | null;
	private cardSize: { w: number; h: number };
	private isCardPopping: boolean = false;
	private animationDuration: number = 2000;
	private cardScaleUpAmount: number = 1.3;

	private cardYAnimation: popPlaybackControls;
	private cardXAnimation: popPlaybackControls;
	private cardScaleXAnimation: popPlaybackControls;
	private cardScaleYAnimation: popPlaybackControls;
	private cardAngleAnimation: popPlaybackControls;

	private reverseEasing: boolean = false;

	async init() {
		CardDemo.stopAnimations = false;

		this.cardSize =
			Loader.shared.resources.cards.data.frames['1.png'].sourceSize;
		this.leftStack = new CardStack();
		this.rightStack = new CardStack();

		const { leftStack, rightStack } = this;
		leftStack.addCardsToStack(144);
		rightStack.addCardsToStack(0);

		this.positionStacks();

		this.addChild(leftStack, rightStack);

		this.loopMoveAllCards(leftStack, rightStack);
	}

	loopMoveAllCards(stackA: CardStack, stackB: CardStack) {
		this.moveAllCards(stackA, stackB).then(() => {
			if (!CardDemo.stopAnimations) this.loopMoveAllCards(stackB, stackA);
		});
	}

	async moveAllCards(
		fromStack: CardStack,
		toStack: CardStack
	): Promise<void> {
		const countOfCardsToMove = fromStack.totalCards;

		return new Promise(async (resolve) => {
			for (
				let cardIndex = 0;
				cardIndex < countOfCardsToMove;
				cardIndex++
			) {
				if (cardIndex > countOfCardsToMove / 2)
					this.reverseEasing = true;
				else this.reverseEasing = false;

				await this.moveCardToNextStack(fromStack, toStack);

				if (CardDemo.stopAnimations) {
					resolve();
					break;
				}
			}
			resolve();
		});
	}

	moveCardToNextStack(fromStack: CardStack, toStack: CardStack) {
		const scaledAnimationDuration = Game.superSpeed
			? this.animationDuration / 20
			: this.animationDuration;
		return new Promise<void>(async (resolve) => {
			if (CardDemo.stopAnimations) resolve();

			this.isCardPopping = true;
			let popped = fromStack.popCard();
			await popped.promise;
			this.positionStacks();

			let card = popped.card;
			card.x = fromStack.x;

			this.cardYAnimation = animate({
				from: card.y,
				to:
					toStack.y -
					toStack.children.length * CardStack.STACK_OFFSET,
				duration: scaledAnimationDuration,
				ease: this.reverseEasing ? bigBackOut : bigBackIn,
				onUpdate: (latest) => {
					card.y = latest;
				},
			});

			this.cardXAnimation = animate({
				from: card.x,
				to: toStack.x,
				duration: scaledAnimationDuration,
				ease: this.reverseEasing ? easeIn : easeOut,
				onUpdate: (latest) => {
					card.x = latest;
				},
				onComplete: () => {
					this.removeChild(card);
					toStack.pushCard(card);
					this.isCardPopping = false;
					resolve();
				},
			});

			this.cardScaleXAnimation = animate({
				from: card.scale.x,
				to: card.scale.x * this.cardScaleUpAmount,
				duration: scaledAnimationDuration / 2,
				ease: easeInOut,
				onUpdate: (latest) => {
					card.scale.x = latest;
					card.scale.y = latest;
				},
				onComplete: () => {
					this.cardScaleYAnimation = animate({
						from: card.scale.x,
						to: card.scale.x / this.cardScaleUpAmount,
						duration: scaledAnimationDuration / 2,
						ease: easeInOut,
						onUpdate: (latest) => {
							card.scale.x = latest;
							card.scale.y = latest;
						},
					});
				},
			});

			this.cardAngleAnimation = animate({
				from: card.angle,
				to:
					randomRange(0, CardStack.CARD_ANGLE) -
					CardStack.CARD_ANGLE / 2,
				duration: scaledAnimationDuration / 2,
				ease: easeInOut,
				onUpdate: (latest) => {
					card.angle = latest;
				},
				onComplete: () => {
					this.cardAngleAnimation = animate({
						from: card.angle,
						to:
							randomRange(0, CardStack.CARD_ANGLE) -
							CardStack.CARD_ANGLE / 2,
						duration: scaledAnimationDuration / 2,
						ease: easeInOut,
						onUpdate: (latest) => {
							card.angle = latest;
						},
					});
				},
			});
		});
	}

	positionStacks() {
		const { leftStack, rightStack, cardSize } = this;
		const { CARDS_SCALE, STACK_OFFSET } = CardStack;
		if (leftStack) {
			leftStack.x = Game.width / 2 - cardSize.w * CARDS_SCALE;
			leftStack.y =
				Game.height / 2 + (leftStack.totalCards / 2) * STACK_OFFSET;
		}

		if (rightStack) {
			rightStack.x = Game.width / 2 + cardSize.w * CARDS_SCALE;

			rightStack.y =
				Game.height / 2 + (rightStack.totalCards / 2) * STACK_OFFSET;
		}
	}

	update(_dt: number) {
		if (!this.isCardPopping) this.positionStacks();
	}

	destroy() {
		CardDemo.stopAnimations = true;
		this.cardXAnimation.stop();
		this.cardYAnimation.stop();
		this.cardScaleXAnimation.stop();
		this.cardScaleXAnimation.stop();
		this.cardAngleAnimation.stop();
		this.leftStack?.destroy();
		this.rightStack?.destroy();
		this.leftStack = null;
		this.rightStack = null;
		super.destroy();
	}
}
