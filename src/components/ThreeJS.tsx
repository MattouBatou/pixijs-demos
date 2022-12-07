import React, { LegacyRef, useEffect } from 'react';
import Game from '../threeGame/Game';

const ThreeJS = () => {
	const parentId = 'threeGameContainer';
	const canvasRef: LegacyRef<HTMLDivElement> = React.createRef();

	useEffect(() => {
		const ThreeGame = new Game();
		canvasRef.current?.appendChild(ThreeGame.renderer.domElement);
		ThreeGame.start();
	}, []);

	return (
		<div
			key={parentId}
			id={parentId}
			ref={canvasRef}
			className='gameContainer'
		/>
	);
};

export default ThreeJS;
