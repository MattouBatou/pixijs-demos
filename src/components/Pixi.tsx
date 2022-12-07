import React, { useEffect } from 'react';
import Game from '../pixiGame/Game';

const Pixi = () => {
	const parentId = 'pixiGameContainer';

	useEffect(() => {
		const game = new Game(parentId);
		game.load();
	}, []);

	return <div key={parentId} id={parentId} className='gameContainer'></div>;
};

export default Pixi;
