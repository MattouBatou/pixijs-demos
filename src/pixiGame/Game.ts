import { Application, Loader, Sprite } from 'pixi.js';
import config from './config/gameConfig';

export default class Game {
	public app: Application;

	constructor(domId: string) {
		this.app = new Application({ ...config });

		document
			.getElementById(domId)
			?.appendChild(this.app.view as HTMLCanvasElement);
	}

	load() {
		Loader.shared
			.add('wolverine', 'assets/images/rabbitv3_wolverine.png')
			.load(this.init);
	}

	init = (_loader: any, resources: any) => {
		const { app } = this;

		let bunny = new Sprite(resources.wolverine.texture);
		// bunny.anchor.set(0.5);
		bunny.x = 100;
		// bunny.x = app.stage.width / 2 - bunny.width / 2;
		// bunny.y = app.stage.height / 2 - bunny.height / 2;
		app.stage.addChild(bunny);
	};
}

