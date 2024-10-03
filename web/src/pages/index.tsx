import PlaygroundLayout from '@/components/layout/playground';
import SidebarButton from '@/components/sidebar-button';
import { Button } from '@/components/ui/button';
import { Blocks, ImagePlay, Settings, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function () {
	const { t } = useTranslation();
	const navigator = useNavigate();

	return (
		<PlaygroundLayout
			title={t('page.convert.title')}
			titleItems={
				[
					// <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
					// 	<Share className="size-3.5" />
					// 	Convert All
					// </Button>,
				]
			}
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
					<div className="flex items-center">
						<h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
					</div>
					<div
						className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
						x-chunk="dashboard-02-chunk-1"
					>
						<div className="flex flex-col items-center gap-1 text-center">
							<h3 className="text-2xl font-bold tracking-tight">
								You have no products
							</h3>
							<p className="text-sm text-muted-foreground">
								You can start selling as soon as you add a product.
							</p>
							<Button className="mt-4">Add Product</Button>
						</div>
					</div>
				</main>
			}
		/>
	);
}
