import PlaygroundLayout from '@/components/layout/playground';
import SidebarButton from '@/components/sidebar-button';
import { ImagePlay, Settings, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function () {
	const { t } = useTranslation();
	const navigator = useNavigate();

	return (
		<PlaygroundLayout
			title={t('page.export-settings.title')}
			sidebars={[
				<SidebarButton
					icon={<ImagePlay className="size-5" />}
					tooltip={t('page.convert.title')}
					onClick={() => navigator('/')}
				/>,
				<SidebarButton
					icon={<Settings2 className="size-5" />}
					tooltip={t('page.theme-settings.title')}
					onClick={() => navigator('/theme-settings')}
				/>,
				<SidebarButton
					clicked
					icon={<Settings className="size-5" />}
					tooltip={t('page.export-settings.title')}
				/>,
			]}
			body={<div>settings</div>}
		/>
	);
}
