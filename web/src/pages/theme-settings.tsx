import PlaygroundLayout from '@/components/layout/playground';
import SidebarButton from '@/components/sidebar-button';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
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
				<main className="flex flex-1 flex-col">
					<ResizablePanelGroup direction="horizontal">
						<ResizablePanel defaultSize={50}>
							<ResizablePanelGroup direction="vertical">
								<ResizablePanel defaultSize={100}>
									<div className="flex h-full items-center justify-center p-6">
										<span className="font-semibold">테마 목록</span>
									</div>
								</ResizablePanel>

								<ResizableHandle withHandle />

								<ResizablePanel defaultSize={75}>
									<div className="flex h-full items-center justify-center p-6">
										<span className="font-semibold">미리보기</span>
									</div>
								</ResizablePanel>
							</ResizablePanelGroup>
						</ResizablePanel>

						<ResizableHandle withHandle />

						<ResizablePanel defaultSize={50}>
							<div className="flex h-[200px] items-center justify-center p-6">
								<span className="font-semibold">상세설정</span>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</main>
			}
		/>
	);
}
