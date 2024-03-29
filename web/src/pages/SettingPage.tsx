import { BlockTitle, List, ListItem } from 'konsta/react';
import DarkModeToggle from '../components/DarkModeToggle';

const SettingPage = () => {
	return (
		<>
			<BlockTitle>Customize</BlockTitle>
			<List strong inset>
				<ListItem label title="Enable Dark Mode" after={<DarkModeToggle />} />
			</List>
		</>
	);
};

export default SettingPage;
