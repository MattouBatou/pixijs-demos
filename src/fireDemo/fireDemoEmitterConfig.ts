import { EmitterConfigV3 } from '@pixi/particle-emitter';
import { Texture } from 'pixi.js';

const emitterConfig: EmitterConfigV3 = {
	autoUpdate: true,
	lifetime: {
		min: 0.2,
		max: 0.5,
	},
	frequency: 0.0000008,
	spawnChance: 0.5,
	particlesPerWave: 1,
	maxParticles: 10,
	pos: {
		x: 0,
		y: 0,
	},
	addAtBack: true,
	behaviors: [
		{
			type: 'alpha',
			config: {
				alpha: {
					list: [
						{
							value: 1,
							time: 0,
						},
						{
							value: 0.3,
							time: 0.5,
						},
						{
							value: 0,
							time: 1,
						},
					],
				},
			},
		},
		{
			type: 'scale',
			config: {
				scale: {
					list: [
						{
							value: 1,
							time: 0,
						},
						{
							value: 1,
							time: 0.3,
						},
						{
							value: 0.8,
							time: 1,
						},
					],
				},
			},
		},
		{
			type: 'color',
			config: {
				color: {
					list: [
						{
							value: 'a32202',
							time: 0,
						},
						{
							value: 'feba38',
							time: 0.5,
						},
						{
							value: '000000',
							time: 1,
						},
					],
				},
			},
		},
		{
			type: 'blendMode',
			config: {
				blendMode: 'add npm',
			},
		},
		{
			type: 'moveAcceleration',
			config: {
				accel: {
					x: 0,
					y: -6000,
				},
				minStart: 0,
				maxStart: 0,
			},
		},
		{
			type: 'rotationStatic',
			config: {
				min: -20,
				max: 20,
			},
		},
		{
			type: 'spawnShape',
			config: {
				type: 'polygonalChain',
				data: [
					[
						{ x: -25, y: 0 },
						{ x: 25, y: 0 },
					],
				],
			},
		},
		{
			type: 'textureSingle',
			config: {
				texture: Texture.from('assets/images/flame.jpg'),
			},
		},
	],
};

export default emitterConfig;
