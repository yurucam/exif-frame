import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { Button } from './components/ui/button';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Button>Click me</Button>
	</React.StrictMode>
);
