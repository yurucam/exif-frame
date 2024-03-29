import { whiteSimpleFrame } from './frames/simple';

type Themes = typeof whiteSimpleFrame;

export async function frame(theme: Themes): Promise<void> {
	theme;
	return new Promise<void>((resolve) => {
		resolve();
	});
}
