import React from 'react';
import ReactDOM from 'react-dom/client';

import Pixi from './components/Pixi';
import Phaser3 from './components/Phaser3';
import ThreeJS from './components/ThreeJS';

import './scss/main.scss';

const rootId = 'gameRoot';
const rootElement = document.getElementById('gameRoot');

if (!rootElement) throw new Error(`Root element not found with id ${rootId}`);

const root = ReactDOM.createRoot(rootElement);
-root.render(
	<>
		<Pixi />
		<Phaser3 />
		<ThreeJS />
	</>
);

