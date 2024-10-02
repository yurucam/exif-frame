import { Link, List, ListInput, Navbar, Page, Popup } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const OverrideMetadataPopup = () => {
  const { t } = useTranslation();
  const { overrideMetadataTarget, overrideMetadataPopup, setOverrideMetadataPopup } = useStore();

  const [make, setMake] = useState(overrideMetadataTarget?.metadata.make || '');
  const [model, setModel] = useState(overrideMetadataTarget?.metadata.model || '');
  const [lens, setLens] = useState(overrideMetadataTarget?.metadata.lensModel || '');
  const [focalLength, setFocalLength] = useState(overrideMetadataTarget?.metadata.focalLength || '');
  const [focalLengthIn35mm, setFocalLengthIn35mm] = useState(overrideMetadataTarget?.metadata.focalLengthIn35mm || '');
  const [aperture, setAperture] = useState(overrideMetadataTarget?.metadata.fNumber || '');
  const [iso, setIso] = useState(overrideMetadataTarget?.metadata.iso || '');
  const [shutter, setShutter] = useState(overrideMetadataTarget?.metadata.exposureTime || '');
  const [takenAt, setTakenAt] = useState(overrideMetadataTarget?.metadata.takenAt || '');

  useEffect(() => {
    if (overrideMetadataTarget) setMake(overrideMetadataTarget.metadata.make || '');
    if (overrideMetadataTarget) setModel(overrideMetadataTarget.metadata.model || '');
    if (overrideMetadataTarget) setLens(overrideMetadataTarget.metadata.lensModel || '');
    if (overrideMetadataTarget) setFocalLength(overrideMetadataTarget.metadata.focalLength || '');
    if (overrideMetadataTarget) setFocalLengthIn35mm(overrideMetadataTarget.metadata.focalLengthIn35mm || '');
    if (overrideMetadataTarget) setAperture(overrideMetadataTarget.metadata.fNumber || '');
    if (overrideMetadataTarget) setIso(overrideMetadataTarget.metadata.iso || '');
    if (overrideMetadataTarget) setShutter(overrideMetadataTarget.metadata.exposureTime || '');
    if (overrideMetadataTarget) setTakenAt(overrideMetadataTarget.metadata.takenAt || '');
  }, [overrideMetadataTarget]);

  return (
    <Popup opened={!!overrideMetadataTarget && overrideMetadataPopup} onBackdropClick={() => setOverrideMetadataPopup(false)}>
      <Page>
        <Navbar
          title={t('root.override-metadata')}
          right={
            <Link navbar onClick={() => setOverrideMetadataPopup(false)}>
              {t('close')}
            </Link>
          }
        />
        <List strongIos inset>
          <ListInput label={t('make')} type="text" value={make} onChange={(e) => (setMake(e.target.value), (overrideMetadataTarget!.metadata.make = e.target.value))} />
          <ListInput label={t('model')} type="text" value={model} onChange={(e) => (setModel(e.target.value), (overrideMetadataTarget!.metadata.model = e.target.value))} />
          <ListInput label={t('lens')} type="text" value={lens} onChange={(e) => (setLens(e.target.value), (overrideMetadataTarget!.metadata.lensModel = e.target.value))} />
          <ListInput label={t('focal')} type="text" value={focalLength} onChange={(e) => (setFocalLength(e.target.value), (overrideMetadataTarget!.metadata.focalLength = e.target.value))} />
          <ListInput
            label={t('focal-35mm')}
            type="text"
            value={focalLengthIn35mm}
            onChange={(e) => (setFocalLengthIn35mm(e.target.value), (overrideMetadataTarget!.metadata.focalLengthIn35mm = e.target.value))}
          />
          <ListInput label={t('aperture')} type="text" value={aperture} onChange={(e) => (setAperture(e.target.value), (overrideMetadataTarget!.metadata.fNumber = e.target.value))} />
          <ListInput label={t('iso')} type="text" value={iso} onChange={(e) => (setIso(e.target.value), (overrideMetadataTarget!.metadata.iso = e.target.value))} />
          <ListInput label={t('shutter')} type="text" value={shutter} onChange={(e) => (setShutter(e.target.value), (overrideMetadataTarget!.metadata.exposureTime = e.target.value))} />
          <ListInput label={t('taken-at')} type="text" value={takenAt} onChange={(e) => (setTakenAt(e.target.value), (overrideMetadataTarget!.metadata.takenAt = e.target.value))} />
        </List>
      </Page>
    </Popup>
  );
};

export default OverrideMetadataPopup;
