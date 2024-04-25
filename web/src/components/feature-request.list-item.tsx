import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import MessageIcon from '../icons/message.icon';

const FeatureRequestListItem = () => {
  const { t } = useTranslation();

  return (
    <ListItem
      media={<MessageIcon size={26} />}
      title={t('root.feature-request')}
      link
      onClick={() => window.open('https://github.com/yurucam/exif-frame/issues/new?template=feature_request.md')}
    />
  );
};

export default FeatureRequestListItem;
