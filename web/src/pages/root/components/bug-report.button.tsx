import { Button } from 'konsta/react';
import { useTranslation } from 'react-i18next';

const BugReportButton = () => {
  const { t } = useTranslation();

  return (
    <Button clear onClick={() => window.open('https://github.com/yurucam/exif-frame/issues/new?template=bug_report.md')}>
      {t('root.bug-report')}
    </Button>
  );
};

export default BugReportButton;
