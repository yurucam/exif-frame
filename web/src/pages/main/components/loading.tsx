import { Preloader } from 'konsta/react';
import { useLoadingStore } from '../state/loading.store';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { t } = useTranslation();
  const { loading } = useLoadingStore();

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Preloader className="k-color-brand-white" />
        <span className="ml-2 text-white text-sm">{t('wait-a-moment')}</span>
      </div>
    </div>
  );
};

export default Loading;
