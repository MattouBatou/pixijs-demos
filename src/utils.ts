import { cubicBezier } from 'popmotion';

export const normalize = (val: number, max: number, min: number) =>
	(val - min) / (max - min);

export const randomRange = (from: number, to: number) =>
	Math.floor(Math.random() * (to - from + 1)) + from;

export const bigBackIn = cubicBezier(0.6, -0.28, 0.67, -0.5);
export const bigBackOut = cubicBezier(0.175, 0.885, 0.32, 1.5);

const parseCharacterCode = (code: number) => {
	let hex = code.toString(16).toUpperCase();
	return decodeURIComponent(`%${hex}`);
};
export const randomTextChar = () => parseCharacterCode(randomRange(33, 126));

export const getOrientation = () =>
	window.innerWidth < window.innerHeight ? 'portrait' : 'landscape';

export const getScaleRatio = () =>
	getOrientation() === 'portrait'
		? window.innerWidth / window.innerHeight
		: window.innerHeight / window.innerWidth;
