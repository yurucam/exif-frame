import PlaygroundLayout from '@/components/layout/playground';
import SidebarButton from '@/components/sidebar-button';
import { Separator } from '@/components/ui/separator';
import { Blocks, ImagePlay, Settings, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function () {
	const { t } = useTranslation();
	const navigator = useNavigate();

	return (
		<PlaygroundLayout
			title={t('page.theme-settings.title')}
			sidebars={[
				<SidebarButton
					icon={<ImagePlay className="size-5" />}
					tooltip={t('page.convert.title')}
					onClick={() => navigator('/')}
				/>,
				<SidebarButton
					clicked
					icon={<Settings2 className="size-5" />}
					tooltip={t('page.theme-settings.title')}
				/>,
				<SidebarButton
					icon={<Blocks className="size-5" />}
					tooltip={t('page.theme-share.title')}
					onClick={() => navigator('/theme-share')}
				/>,
				<SidebarButton
					icon={<Settings className="size-5" />}
					tooltip={t('page.export-settings.title')}
					onClick={() => navigator('/export-settings')}
				/>,
			]}
			body={
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-medium">Profile</h3>
							<p className="text-sm text-muted-foreground">
								This is how others will see you on the site.
							</p>
						</div>
						<Separator />
					</div>
				</main>
			}
		/>
	);
}
