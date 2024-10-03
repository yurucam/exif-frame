import { useParams } from 'react-router-dom';

export default function DynamicDashboard() {
	const { id } = useParams();

	return <div>Dynamic Dashboard Page, Param: {id}</div>;
}
