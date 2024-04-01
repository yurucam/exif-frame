import { BlockTitle, List, ListItem } from 'konsta/react';
import DarkModeToggle from './components/dark-mode.toggle';
import ExportToWebpToggle from './components/export-to-webp.toggle';
import ShowCameraMakerToggle from './components/show-camera-maker.toggle';
import ShowCameraModelToggle from './components/show-camera-model.toggle';
import ShowLensModelToggle from './components/show-lens-model.toggle';
import OverrideCameraMakerInput from './components/override-camera-maker.input';
import OverrideCameraModelInput from './components/override-camera-model.input';
import OverrideLensModelInput from './components/override-lens-model.input';
import QualityRangeSlider from './components/quality.range-slider';
import FixMajorAxisLengthInput from './components/fix-major-axis-length.input';

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
				<QualityRangeSlider />
				<FixMajorAxisLengthInput />
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
