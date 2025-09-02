import { ListItem } from 'konsta/react';
import { IoBug } from 'react-icons/io5';

const BugReportListItem = () => {
  return <ListItem media={<IoBug size={26} />} title={'Bug report'} link onClick={() => window.open('mailto:help@yuru.cam?subject=[exif-frame] Bug Report')} />;
};

export default BugReportListItem;
