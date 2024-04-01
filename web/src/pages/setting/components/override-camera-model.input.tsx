import { ListInput } from 'konsta/react';
import { useEffect, useState } from 'react';

const OverrideCameraModelInput = () => {
	const [cameraModel, setCameraModel] = useState(localStorage.getItem('cameraModel') || '');

	useEffect(() => {
		localStorage.setItem('cameraModel', cameraModel);
	}, [cameraModel]);

	return (
		<ListInput
			type="text"
			placeholder={'Your Camera Model'}
			value={cameraModel}
			onChange={(e) => {
				setCameraModel(e.target.value);
			}}
		/>
	);
};

export default OverrideCameraModelInput;
