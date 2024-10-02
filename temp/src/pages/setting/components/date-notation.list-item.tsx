import { ListItem } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import TimeIcon from '../../../icons/time.icon';

const DateNotationListItem = () => {
  const { t } = useTranslation();
  const { dateNotation, setDateNotationPopover } = useStore();

  return (
    <>
      <ListItem title={t('root.settings.date-notation')} media={<TimeIcon size={26} />} after={<div className="date-notation">{dateNotation}</div>} onClick={() => setDateNotationPopover(true)} link />
    </>
  );
};

export default DateNotationListItem;
