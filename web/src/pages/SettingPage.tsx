import { BlockTitle, List, ListItem } from 'konsta/react';
import DarkModeToggle from '../components/DarkModeToggle';
import ExportToWebpToggle from '../components/ExportToWebpToggle';
import ShowCameraMakerToggle from '../components/ShowCameraMakerToggle';
import ShowCameraModelToggle from '../components/ShowCameraModelToggle';
import ShowLensModelToggle from '../components/ShowLensModelToggle';
import OverrideCameraMakerInput from '../components/OverrideCameraMakerInput';
import OverrideCameraModelInput from '../components/OverrideCameraModelInput';
import OverrideLensModelInput from '../components/OverrideLensModelInput';

const SettingPage = () => {
	return (
		<>
			<BlockTitle>UI</BlockTitle>
			<List strong inset>
				<ListItem label title="Enable Dark Mode" after={<DarkModeToggle />} />
			</List>

			<BlockTitle>Output</BlockTitle>
			<List strong inset>
				<ListItem label title="Export to Webp" after={<ExportToWebpToggle />} />
			</List>

			<BlockTitle>EXIF Metadata Visibility</BlockTitle>
			<List strong inset>
				<ListItem label title="Show Camera Maker" after={<ShowCameraMakerToggle />} />
				<ListItem label title="Show Camera Model" after={<ShowCameraModelToggle />} />
				<ListItem label title="Show Lens Model" after={<ShowLensModelToggle />} />
			</List>

			<BlockTitle>Override EXIF Metadata</BlockTitle>
			<List strong inset>
				<OverrideCameraMakerInput />
				<OverrideCameraModelInput />
				<OverrideLensModelInput />
			</List>
		</>
	);
};

export default SettingPage;
