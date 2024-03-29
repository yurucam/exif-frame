import { BlockTitle, List, ListItem } from 'konsta/react';
import DarkModeToggle from '../components/DarkModeToggle';
import ExportToWebpToggle from '../components/ExportToWebpToggle';

const SettingPage = () => {
	return (
		<>
			<BlockTitle>Customize</BlockTitle>
			<List strong inset>
				<ListItem label title="Enable Dark Mode" after={<DarkModeToggle />} />
				<ListItem label title="Export to Webp" after={<ExportToWebpToggle />} />
			</List>
		</>
	);
};

export default SettingPage;
