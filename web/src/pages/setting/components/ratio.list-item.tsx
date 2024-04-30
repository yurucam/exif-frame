import { ListItem, Toggle } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store';
import ImageWidthIcon from '../../../icons/image-width.icon';

const RatioListItem = () => {
  const { t } = useTranslation();
  const { setRatioPopover, ratio, notCroppedMode, setNotCroppedMode } = useStore();

  return (
    <>
      <ListItem media={<ImageWidthIcon size={26} />} title={t('root.settings.ratio')} after={<div className="ratio-name">{ratio}</div>} onClick={() => setRatioPopover(true)} link />
      {ratio !== 'free' && (
        <ListItem
          media={<ImageWidthIcon size={26} />}
          title={t('root.settings.not-cropped-mode')}
          after={
            <Toggle
              checked={notCroppedMode}
              onChange={() => {
                setNotCroppedMode(!notCroppedMode);
              }}
            />
          }
        />
      )}
    </>
  );
};

export default RatioListItem;
