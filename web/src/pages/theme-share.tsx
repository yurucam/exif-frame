import PlaygroundLayout from '@/components/layout/playground';
import SidebarButton from '@/components/sidebar-button';
import { Blocks, ImagePlay, Settings, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function () {
	const { t } = useTranslation();
	const navigator = useNavigate();

	return (
		<PlaygroundLayout
			title={t('page.theme-share.title')}
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
					icon={<Blocks className="size-5" />}
					tooltip={t('page.theme-share.title')}
				/>,
				<SidebarButton
					icon={<Settings className="size-5" />}
					tooltip={t('page.export-settings.title')}
					onClick={() => navigator('/export-settings')}
				/>,
			]}
			body={
				<div className="flex items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
					<div className="w-full space-y-6 text-center">
						<div className="space-y-3">
							<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
								{t('page.theme-share.sorry')}
							</h1>
							<p className="text-gray-500">
								{t('page.theme-share.description')}
							</p>
						</div>
					</div>
				</div>
			}
		/>
	);
}
