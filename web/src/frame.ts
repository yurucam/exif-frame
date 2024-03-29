import { whiteSimpleFrame } from './frames/white-simple';

type Themes = typeof whiteSimpleFrame;

export async function frame(theme: Themes): Promise<void> {
	theme;
	return new Promise<void>((resolve) => {
		resolve();
	});
}
