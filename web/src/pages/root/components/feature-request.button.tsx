import { Button } from 'konsta/react';
import { useTranslation } from 'react-i18next';

const FeatureRequestButton = () => {
  const { t } = useTranslation();

  return (
    <Button clear onClick={() => window.open('https://github.com/yurucam/exif-frame/issues/new?template=feature_request.md')}>
      {t('root.feature-request')}
    </Button>
  );
};

export default FeatureRequestButton;
