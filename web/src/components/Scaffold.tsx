import { App, Navbar, Page } from 'konsta/react';

const Scaffold = ({ children, title }: { children: React.ReactNode; title: string }) => {
	return (
		<App theme="ios" safeAreas>
			<Page>
				<Navbar title={title} />
				{children}
			</Page>
		</App>
	);
};

export default Scaffold;
