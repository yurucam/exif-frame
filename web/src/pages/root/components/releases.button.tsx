import { Button } from 'konsta/react';
import { useTranslation } from 'react-i18next';

const ReleasesButton = () => {
  const { t } = useTranslation();

  return (
    <Button clear onClick={() => window.open('https://github.com/yurucam/exif-frame/releases')}>
      {t('root.releases')}
    </Button>
  );
};

export default ReleasesButton;
