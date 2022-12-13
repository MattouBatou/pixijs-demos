import {
	Application,
	Loader,
	Ticker,
	Texture,
	Sprite,
	isMobile,
} from 'pixi.js';

import config from 'game/config/gameConfig';
import GameUi from 'game/GameUi';

export default class Game extends Application {
	static superSpeed: boolean = false;
	static currentScene: any;
	static width: number;
	static height: number;
	static bg: Sprite;
	static defaultBgColor: number = 0x8080f8;

	private gameMenu: GameUi;

	constructor(domId: string) {
		super({ ...config });

		this.ticker = Ticker.shared;

		document
			.getElementById(domId)
			?.appendChild(this.view as HTMLCanvasElement);

		Game.width = this.renderer.width;
		Game.height = this.renderer.height;

		window.addEventListener('resize', () => {
			this.renderer.resize(window.innerWidth, window.innerHeight);
			Game.width = this.renderer.width;
			Game.height = this.renderer.height;
		});

		if (isMobile.any) {
			window.addEventListener('pointerup', (_e: any) => {
				Game.superSpeed = !Game.superSpeed;
			});
		} else {
			window.addEventListener('keypress', (event) => {
				if (event.key === ' ') {
					Game.superSpeed = !Game.superSpeed;
				}
			});
		}
	}

	public load() {
		Loader.shared
			.add('cards', 'assets/images/pokemonTCG.json')
			.add('particle', 'assets/images/flame.jpg')
			.load(this.init);
	}

	private init = () => {
		const { ticker, renderer } = this;

		Game.bg = new Sprite(Texture.WHITE);
		Game.bg.scale.x = renderer.width;
		Game.bg.scale.y = renderer.height;
		Game.bg.tint = Game.defaultBgColor;

		this.gameMenu = new GameUi(this.stage);
		this.stage.addChild(Game.bg, this.gameMenu);

		ticker.add((dt) => {
			this.update(dt);
			this.renderer.render(this.stage);
		});
	};

	private update(dt: number) {
		this.gameMenu.update(dt, Math.round(this.ticker.FPS).toString());
		Game.currentScene?.update(dt);
	}
}

