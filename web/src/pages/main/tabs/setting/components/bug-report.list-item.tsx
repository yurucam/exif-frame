import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { IoBug } from 'react-icons/io5';

const BugReportListItem = () => {
  const { t } = useTranslation();
  return <ListItem media={<IoBug size={26} />} title={t('bug-report')} link onClick={() => window.open('mailto:help@yuru.cam?subject=[exif-frame] Bug Report')} />;
};

export default BugReportListItem;
