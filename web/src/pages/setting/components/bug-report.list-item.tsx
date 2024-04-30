import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import BugIcon from '../../../icons/bug.icon';

const BugReportListItem = () => {
  const { t } = useTranslation();

  return <ListItem media={<BugIcon size={26} />} title={t('root.bug-report')} link onClick={() => window.open('mailto:help@yuru.cam?subject=[exif-frame] Bug Report')} />;
};

export default BugReportListItem;
