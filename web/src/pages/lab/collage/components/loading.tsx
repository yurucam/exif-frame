import { Preloader } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';

const Loading = () => {
  const { t } = useTranslation();
  const { loading } = useStore();

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Preloader className="k-color-brand-white" />
        <span className="ml-2 text-white text-sm">{t('root.processing')}</span>
      </div>
    </div>
  );
};

export default Loading;
