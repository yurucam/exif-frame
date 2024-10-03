import { Code2 } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { useTranslation } from 'react-i18next';
import SidebarButton from '../sidebar-button';
import { ReactNode } from 'react';

interface PlaygroundLayoutProps {
	title: string;
	titleItems?: ReactNode[];
	sidebars: ReactNode[];
	body: ReactNode;
}

export default function PlaygroundLayout(props: PlaygroundLayoutProps) {
	const { t } = useTranslation();

	const { title, titleItems = [], sidebars, body } = props;

	return (
		<div className="grid h-screen w-full pl-[56px]">
			<aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
				<div className="border-b p-2">
					<ThemeToggle />
				</div>

				<nav className="grid gap-1 p-2">{...sidebars}</nav>

				<nav className="mt-auto grid gap-1 p-2">
					<SidebarButton
						icon={<Code2 className="size-5" />}
						tooltip={t('layout.playground.open-github')}
						onClick={() => window.open('https://github.com/yurucam/exif-frame')}
					/>
				</nav>
			</aside>

			<div className="flex flex-col">
				<header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
					<h1 className="text-xl font-semibold">{title}</h1>
					<div className="ml-auto flex gap-1.5">{...titleItems}</div>
				</header>

				{body}
			</div>
		</div>
	);
}
