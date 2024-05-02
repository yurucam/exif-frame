import { ListInput, ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import CameraIcon from '../../../icons/camera.icon';

const FocalLengthRatioModeListItem = () => {
  const { t } = useTranslation();
  const { focalLengthRatioMode, setFocalLengthRatioMode, focalLengthRatio, setFocalLengthRatio } = useStore();

  return (
    <>
      <ListItem
        title={t('root.settings.focal-length-ratio-mode')}
        media={<CameraIcon size={26} />}
        after={<Toggle checked={focalLengthRatioMode} onChange={() => setFocalLengthRatioMode(!focalLengthRatioMode)} />}
      />

      {focalLengthRatioMode && (
        <ListInput
          floatingLabel
          info={`35mm FF = 1, APS-C = 1.5, APS-C(Canon) = 1.6, Four Thirds = 2, 1" = 2.7`}
          label={t('root.settings.focal-length-ratio')}
          type="number"
          value={focalLengthRatio}
          onChange={(e) => setFocalLengthRatio(e.target.value)}
        />
      )}
    </>
  );
};

export default FocalLengthRatioModeListItem;
