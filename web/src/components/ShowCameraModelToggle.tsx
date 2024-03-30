import { Toggle } from 'konsta/react';
import { useEffect, useState } from 'react';

if (localStorage.getItem('showCameraModel') == null) {
	localStorage.setItem('showCameraModel', 'yes');
}

const ShowCameraModelToggle = () => {
	const [toggle, setToggle] = useState(localStorage.getItem('showCameraModel') || 'no');

	useEffect(() => {
		localStorage.setItem('showCameraModel', toggle);
	}, [toggle]);

	return (
		<>
			<Toggle checked={toggle === 'yes'} onChange={() => setToggle(toggle === 'yes' ? 'no' : 'yes')} />
		</>
	);
};

export default ShowCameraModelToggle;
