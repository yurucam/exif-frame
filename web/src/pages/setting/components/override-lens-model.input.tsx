import { ListInput } from 'konsta/react';
import { useEffect, useState } from 'react';

const OverrideLensModelInput = () => {
	const [lensModel, setLensModel] = useState(localStorage.getItem('lensModel') || '');

	useEffect(() => {
		localStorage.setItem('lensModel', lensModel);
	}, [lensModel]);

	return (
		<ListInput
			type="text"
			placeholder={'Your Lens Model'}
			value={lensModel}
			onChange={(e) => {
				setLensModel(e.target.value);
			}}
		/>
	);
};

export default OverrideLensModelInput;
