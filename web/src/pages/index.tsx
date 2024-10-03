import PlaygroundLayout from '@/components/layout/playground';
import SidebarButton from '@/components/sidebar-button';
import { Button } from '@/components/ui/button';
import { ImagePlay, Settings, Settings2, Share } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function () {
	const { t } = useTranslation();
	const navigator = useNavigate();

	return (
		<PlaygroundLayout
			title={t('page.convert.title')}
			titleItems={[
				<Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
					<Share className="size-3.5" />
					Convert All
				</Button>,
			]}
			sidebars={[
				<SidebarButton
					clicked
					icon={<ImagePlay className="size-5" />}
					tooltip={t('page.convert.title')}
				/>,
				<SidebarButton
					icon={<Settings2 className="size-5" />}
					tooltip={t('page.theme-settings.title')}
					onClick={() => navigator('/theme-settings')}
				/>,
				<SidebarButton
					icon={<Settings className="size-5" />}
					tooltip={t('page.export-settings.title')}
					onClick={() => navigator('/export-settings')}
				/>,
			]}
			body={<div>home</div>}
		/>
	);
}
