import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import MoneyIcon from '../../../icons/money.icon';

const SponsorKakaopayListItem = () => {
  const { t } = useTranslation();

  return (
    <ListItem
      media={<MoneyIcon size={26} />}
      title={t('root.sponsor-kakaopay')}
      link
      onClick={() => window.open('https://qr.kakaopay.com/FTG7O8kjL')}
      footer={t('root.sponsor-kakaopay-description')}
    />
  );
};

export default SponsorKakaopayListItem;
