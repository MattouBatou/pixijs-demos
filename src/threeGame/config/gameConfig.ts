export const viewportConfig = {
	width: 1024,
	height: 768
};

export const cameraConfig = {
	type: 'PerspectiveCamera',
	fov: 103,
	aspect: viewportConfig.width / viewportConfig.height,
	near: 0.1,
	far: 1000
};
