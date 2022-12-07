import React, { useEffect } from 'react';
import Game from '../phaserGame/Game';

const Phaser3 = () => {
	const parentId = 'phaserGameContainer';

	useEffect(() => {
		const game = new Game(parentId);
	}, []);

	return <div key={parentId} id={parentId} className='gameContainer'></div>;
};

export default Phaser3;
