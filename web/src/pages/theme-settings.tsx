import PlaygroundLayout from '@/components/layout/playground';
import SidebarButton from '@/components/sidebar-button';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Toggle } from '@/components/ui/toggle';
import {
	Blocks,
	Check,
	ImagePlay,
	MoreHorizontal,
	Plus,
	Settings,
	Settings2,
} from 'lucide-react';
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
									<ScrollArea className="h-full">
										<Table className="w-full min-w-max">
											<TableHeader>
												<TableRow>
													<TableHead className="w-[60px]">선택</TableHead>
													<TableHead>테마명</TableHead>
													<TableHead className="text-right">
														{/* Actions */}
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem
																value="option1"
																id="option1-1"
																checked
															/>
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<RadioGroup>
															<RadioGroupItem value="option1" id="option1-1" />
														</RadioGroup>
													</TableCell>
													<TableCell>Single text</TableCell>
													<TableCell className="text-right">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	aria-haspopup="true"
																	size="icon"
																	variant="ghost"
																>
																	<MoreHorizontal className="h-4 w-4" />
																	<span className="sr-only">Toggle menu</span>
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	삭제
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
										<Separator />
										<div className="flex justify-center mt-4 mb-4">
											<Button className="gap-1.5" size="lg" variant={'ghost'}>
												<Plus className="size-3.5" />
												테마 생성
											</Button>
										</div>
									</ScrollArea>
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
