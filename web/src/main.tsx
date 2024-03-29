import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Scaffold from './components/Scaffold';
import BottomNavigationBar from './components/BottomNavigationBar';
import { IoHelpOutline, IoImagesOutline, IoSettingsOutline } from 'react-icons/io5';
import FramePage from './pages/FramePage';
import SettingPage from './pages/SettingPage';
import { Icon } from 'konsta/react';
import HelpPage from './pages/HelpPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Scaffold title="EXIF Frame">
			<BottomNavigationBar
				tabs={[
					{
						label: 'Frame',
						icon: <Icon ios={<IoImagesOutline className="w-6 h-6" />} />,
						children: <FramePage />,
					},
					{
						label: 'Setting',
						icon: <Icon ios={<IoSettingsOutline className="w-6 h-6" />} />,
						children: <SettingPage />,
					},
					{
						label: 'Help',
						icon: <Icon ios={<IoHelpOutline className="w-6 h-6" />} />,
						children: <HelpPage />,
					},
				]}
			/>
		</Scaffold>
	</React.StrictMode>
);
