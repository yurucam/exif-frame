import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { ReactNode } from 'react';

interface SidebarButtonProps {
	icon: ReactNode;
	tooltip: string;
	clicked?: boolean;
	onClick?: () => void;
}

export default function SidebarButton(props: SidebarButtonProps) {
	const { icon, tooltip, clicked = false, onClick = () => {} } = props;

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={clicked ? 'rounded-lg bg-muted' : 'rounded-lg'}
					aria-label={tooltip}
					onClick={onClick}
				>
					{icon}
				</Button>
			</TooltipTrigger>

			<TooltipContent side="right" sideOffset={5}>
				{tooltip}
			</TooltipContent>
		</Tooltip>
	);
}
