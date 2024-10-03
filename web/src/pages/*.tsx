import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
	const { t } = useTranslation();
	const navigator = useNavigate();

	return (
		<div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
			<div className="w-full space-y-6 text-center">
				<div className="space-y-3">
					<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
						404
					</h1>
					<p className="text-gray-500">{t('page.not-found.description')}</p>
				</div>

				<Button onClick={() => navigator('/', { replace: true })}>
					{t('page.not-found.return-to-home')}
				</Button>
			</div>
		</div>
	);
}
