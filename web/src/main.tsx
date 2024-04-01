import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import BottomTabBar from './shared/components/bottom.tab-bar';
import { IoHelpOutline, IoImagesOutline, IoSettingsOutline } from 'react-icons/io5';
import FramePage from './pages/frame/page';
import SettingPage from './pages/setting/page';
import { App, Icon, Navbar, Page } from 'konsta/react';
import HelpPage from './pages/help/page';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App theme="ios" safeAreas>
			<Page>
				<Navbar title="EXIF Frame" />
				<BottomTabBar
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
			</Page>
		</App>
	</React.StrictMode>
);
