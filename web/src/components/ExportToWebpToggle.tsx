import { Toggle } from 'konsta/react';
import { useEffect, useState } from 'react';

const ExportToWebpToggle = () => {
	const [exportToWebp, setExportToWebp] = useState(localStorage.getItem('exportToWebp') || 'no');

	useEffect(() => {
		localStorage.setItem('exportToWebp', exportToWebp);
	}, [exportToWebp]);

	return (
		<>
			<Toggle checked={exportToWebp === 'yes'} onChange={() => setExportToWebp(exportToWebp === 'yes' ? 'no' : 'yes')} />
		</>
	);
};

export default ExportToWebpToggle;
