import { Container, isMobile, Text } from 'pixi.js';
import CardDemo from 'cardDemo/CardDemo';
import Game from 'game/Game';
import UiDemo from 'uiDemo/UiDemo';
import FireDemo from 'fireDemo/FireDemo';

export default class GameUi extends Container {
	static cardDemoItemText: string = 'Card Stacking Demo';
	static uiDemoText: string = 'UI Feature Demo';
	static fireDemoText: string = 'Fire Particles Demo';
	static closeSceneText: string = 'Exit';
	static padding: number = 20;

	private mobileTapMessage = 'Tap anywhere';
	private desktopClickMessage = 'Click anywhere';
	private desktopSpaceMessage = 'Press Space bar';
	private cardDemoMessagePart = 'to go faster!';
	private fireDemoMessagePart = '!';

	private gameStageRef: Container;

	private menuItemContainer: Container;
	private cardDemoItem: Text;
	private uiDemoItem: Text;
	private fireDemoItem: Text;

	private uiContainer: Container;
	private closeScene: Text;
	private fpsDisplay: Text;
	private gameMessage: Text;

	constructor(gameStage: Container) {
		super();

		this.gameStageRef = gameStage;
		this.menuItemContainer = new Container();
		this.uiContainer = new Container();

		this.menuItemContainer.x = Game.width / 2;
		this.menuItemContainer.y = Game.height / 2;

		this.cardDemoItem = new Text(GameUi.cardDemoItemText);
		this.uiDemoItem = new Text(GameUi.uiDemoText);
		this.fireDemoItem = new Text(GameUi.fireDemoText);

		this.closeScene = new Text(GameUi.closeSceneText);
		this.fpsDisplay = new Text();
		this.gameMessage = new Text();

		this.cardDemoItem.anchor.y = 0.5;
		this.uiDemoItem.anchor.y = 0.5;
		this.fireDemoItem.anchor.y = 0.5;

		this.closeScene.anchor.x = 1;

		// Left Aligned and centered
		this.cardDemoItem.x = this.uiDemoItem.x = this.fireDemoItem.x =
			-this.cardDemoItem.width / 2;
		this.cardDemoItem.y = -this.cardDemoItem.height - GameUi.padding;
		this.fireDemoItem.y = this.fireDemoItem.height + GameUi.padding;

		this.closeScene.x = Game.width - GameUi.padding;
		this.closeScene.y = GameUi.padding;

		this.fpsDisplay.x = GameUi.padding;
		this.fpsDisplay.y = GameUi.padding;

		this.gameMessage.x = Game.width / 2;
		this.gameMessage.y = this.gameMessage.height + GameUi.padding * 2;
		this.gameMessage.anchor.x = 0.5;

		this.closeScene.visible = false;
		this.fpsDisplay.visible = false;

		this.cardDemoItem.interactive = this.uiDemoItem.interactive = this.fireDemoItem.interactive = true;
		this.closeScene.interactive = true;

		this.cardDemoItem.on('pointerdown', () => this.initCardDemo());

		this.uiDemoItem.on('pointerdown', () => this.initUiDemo());

		this.fireDemoItem.on('pointerdown', () => this.initFireDemo());

		this.closeScene.on('pointerdown', () => {
			Game.currentScene.destroy();
			Game.superSpeed = false;
			this.addChild(this.menuItemContainer);
			Game.bg.tint = Game.defaultBgColor;
			this.fpsDisplay.style.fill = 0x000000;
			this.closeScene.style.fill = 0x000000;
			this.gameMessage.style.fill = 0x000000;
			this.fpsDisplay.visible = false;
			this.closeScene.visible = false;
			this.gameMessage.visible = false;
		});

		this.menuItemContainer.addChild(
			this.cardDemoItem,
			this.uiDemoItem,
			this.fireDemoItem
		);
		this.uiContainer.addChild(
			this.fpsDisplay,
			this.gameMessage,
			this.closeScene
		);
		this.addChild(this.menuItemContainer, this.uiContainer);
	}

	private initCardDemo() {
		this.fpsDisplay.visible = true;
		this.closeScene.visible = true;
		this.gameMessage.visible = true;

		if (isMobile.any)
			this.gameMessage.text = `${this.mobileTapMessage} ${this.cardDemoMessagePart}`;
		else
			this.gameMessage.text = `${this.desktopSpaceMessage} ${this.cardDemoMessagePart}`;

		Game.currentScene = new CardDemo();
		Game.currentScene.init();
		this.gameStageRef.addChild(Game.currentScene);
		this.removeChild(this.menuItemContainer);
	}

	private initUiDemo() {
		this.fpsDisplay.visible = true;
		this.closeScene.visible = true;
		this.gameMessage.visible = true;

		if (isMobile.any)
			this.gameMessage.text = `${this.mobileTapMessage} ${this.cardDemoMessagePart}`;
		else
			this.gameMessage.text = `${this.desktopSpaceMessage} ${this.cardDemoMessagePart}`;

		Game.currentScene = new UiDemo();
		Game.currentScene.init();
		this.gameStageRef.addChild(Game.currentScene);
		this.removeChild(this.menuItemContainer);
	}

	public initFireDemo() {
		this.fpsDisplay.visible = true;
		this.closeScene.visible = true;
		this.gameMessage.visible = true;

		if (isMobile.any)
			this.gameMessage.text = `${this.mobileTapMessage} ${this.fireDemoMessagePart}`;
		else
			this.gameMessage.text = `${this.desktopClickMessage} ${this.fireDemoMessagePart}`;

		this.fpsDisplay.style.fill = 0xffffff;
		this.closeScene.style.fill = 0xffffff;
		this.gameMessage.style.fill = 0xffffff;
		Game.currentScene = new FireDemo();
		Game.currentScene.init();
		this.gameStageRef.addChild(Game.currentScene);
		this.removeChild(this.menuItemContainer);
	}

	public update(_dt: number, fps: string) {
		this.fpsDisplay.text = `FPS: ${fps}`;

		this.closeScene.x = Game.width - GameUi.padding;
		this.closeScene.y = GameUi.padding;

		this.fpsDisplay.x = GameUi.padding;
		this.fpsDisplay.y = GameUi.padding;

		this.gameMessage.x = Game.width / 2;

		if (isMobile.any) this.gameMessage.y = Game.height - GameUi.padding * 2;
		else this.gameMessage.y = this.gameMessage.height + GameUi.padding * 2;

		this.menuItemContainer.x = Game.width / 2;
		this.menuItemContainer.y = Game.height / 2;
	}
}
