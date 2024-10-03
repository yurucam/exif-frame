import PlaygroundLayout from '@/components/layout/playground';
import SidebarButton from '@/components/sidebar-button';
import { Button } from '@/components/ui/button';
import { Share, SquareTerminal } from 'lucide-react';

export default function IndexPage() {
	return (
		<PlaygroundLayout
			title="test"
			titleItems={[
				<Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
					<Share className="size-3.5" />
					Convert All
				</Button>,
				<Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
					<Share className="size-3.5" />
					Convert All
				</Button>,
			]}
			sidebars={[
				<SidebarButton
					clicked
					icon={<SquareTerminal className="size-5" />}
					tooltip="Playground"
				/>,
				<SidebarButton
					icon={<SquareTerminal className="size-5" />}
					tooltip="Playground"
				/>,
				<SidebarButton
					icon={<SquareTerminal className="size-5" />}
					tooltip="Playground"
				/>,
			]}
			body={<div>test</div>}
		/>
	);
}
