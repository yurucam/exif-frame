import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { Example } from './example';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<TooltipProvider>
				<Example />
			</TooltipProvider>
		</ThemeProvider>

		<Toaster />
	</React.StrictMode>
);
