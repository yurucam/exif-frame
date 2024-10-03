import {
	Blocks,
	ImagePlay,
	MoreHorizontal,
	PlusCircle,
	Settings,
	Settings2,
	Share,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SidebarButton from '@/components/sidebar-button';
import PlaygroundLayout from '@/components/layout/playground';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
				<Button size="sm" className="ml-auto gap-1.5 text-sm">
					<PlusCircle className="size-3.5" />
					Add Picture
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
				<main>
					<ScrollArea className="h-[calc(100vh-57px)]">
						<Table className="w-full min-w-max">
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">미리보기</TableHead>
									<TableHead>파일명</TableHead>
									<TableHead>초점거리</TableHead>
									<TableHead>조리개</TableHead>
									<TableHead>ISO</TableHead>
									<TableHead>셔터스피드</TableHead>
									<TableHead>카메라</TableHead>
									<TableHead>렌즈</TableHead>
									<TableHead>{/* Actions */}</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2v531UVhMHUwSZYKyodpAZ3koV1ueBBFNTWwD-_sD9xAQkzMyMFLibnebYbs61Y2bOGE&usqp=CAU" />
									</TableCell>
									<TableCell>페페.png</TableCell>
									<TableCell>40mm</TableCell>
									<TableCell>F2.8</TableCell>
									<TableCell>ISO200</TableCell>
									<TableCell>1/60s</TableCell>
									<TableCell>SONY ILCE-7CM2</TableCell>
									<TableCell>TAMRON E 20-40mm F2.8 A062</TableCell>
									<TableCell>
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
													수정
												</DropdownMenuItem>
												<DropdownMenuItem className="cursor-pointer">
													삭제
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</ScrollArea>
				</main>
			}
		/>
	);
}
