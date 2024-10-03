import './App.css';
import './i18n';

import {
	createBrowserRouter,
	RouterProvider,
	LoaderFunction,
	ActionFunction,
} from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';

interface RouteCommon {
	loader?: LoaderFunction;
	action?: ActionFunction;
	ErrorBoundary?: React.ComponentType<any>;
}

interface IRoute extends RouteCommon {
	path: string;
	Element: React.ComponentType<any>;
}

interface Pages {
	[key: string]: {
		default: React.ComponentType<any>;
	} & RouteCommon;
}

const pages: Pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
const routes: IRoute[] = [];
for (const path of Object.keys(pages)) {
	const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
	if (!fileName) {
		continue;
	}

	const normalizedPathName = fileName.includes('$')
		? fileName.replace('$', ':')
		: fileName.replace(/\/index/, '');

	routes.push({
		path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`,
		Element: pages[path].default,
		loader: pages[path]?.loader as LoaderFunction | undefined,
		action: pages[path]?.action as ActionFunction | undefined,
		ErrorBoundary: pages[path]?.ErrorBoundary,
	});
}

const router = createBrowserRouter(
	routes.map(({ Element, ErrorBoundary, ...rest }) => ({
		...rest,
		element: <Element />,
		...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
	}))
);

/**
 * File based routing with Vite
 * @link https://velog.io/@developer-sora/TIL-React-Vite에서-next.js처럼-라우팅하기feat.typescript
 */
export default function App() {
	return (
		<>
			<ThemeProvider>
				<TooltipProvider>
					<RouterProvider router={router} />
				</TooltipProvider>
			</ThemeProvider>
		</>
	);
}
