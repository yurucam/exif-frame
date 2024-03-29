import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { App, Page, Navbar, Block, Button } from 'konsta/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App safeAreas theme="ios">
			<Page>
				<Navbar title="My App" />

				<Block strong>Hello world!</Block>

				<Block>
					<p>This is block with text</p>
				</Block>
				<Block className="space-y-4">
					<p>Here comes the button</p>
					<Button>Action</Button>
				</Block>
			</Page>
		</App>
	</React.StrictMode>
);
