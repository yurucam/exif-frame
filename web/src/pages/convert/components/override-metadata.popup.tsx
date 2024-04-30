import { Link, List, ListInput, Navbar, Page, Popup } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const OverrideMetadataPopup = () => {
  const { t } = useTranslation();
  const { overrideMetadataTarget, overrideMetadataPopup, setOverrideMetadataPopup } = useStore();

  const [make, setMake] = useState(overrideMetadataTarget?.make || '');
  const [model, setModel] = useState(overrideMetadataTarget?.model || '');
  const [lens, setLens] = useState(overrideMetadataTarget?.lensModel || '');
  const [focal, setFocal] = useState(overrideMetadataTarget?.focalLength || '');
  const [aperture, setAperture] = useState(overrideMetadataTarget?.fNumber || '');
  const [iso, setIso] = useState(overrideMetadataTarget?.iso || '');
  const [shutter, setShutter] = useState(overrideMetadataTarget?.exposureTime || '');

  useEffect(() => {
    if (overrideMetadataTarget) setMake(overrideMetadataTarget.make || '');
    if (overrideMetadataTarget) setModel(overrideMetadataTarget.model || '');
    if (overrideMetadataTarget) setLens(overrideMetadataTarget.lensModel || '');
    if (overrideMetadataTarget) setFocal(overrideMetadataTarget.focalLength || '');
    if (overrideMetadataTarget) setAperture(overrideMetadataTarget.fNumber || '');
    if (overrideMetadataTarget) setIso(overrideMetadataTarget.iso || '');
    if (overrideMetadataTarget) setShutter(overrideMetadataTarget.exposureTime || '');
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
          <ListInput label={t('make')} type="text" value={make} onChange={(e) => (setMake(e.target.value), (overrideMetadataTarget!.make = e.target.value))} />
          <ListInput label={t('model')} type="text" value={model} onChange={(e) => (setModel(e.target.value), (overrideMetadataTarget!.model = e.target.value))} />
          <ListInput label={t('lens')} type="text" value={lens} onChange={(e) => (setLens(e.target.value), (overrideMetadataTarget!.lensModel = e.target.value))} />
          <ListInput label={t('focal')} type="text" value={focal} onChange={(e) => (setFocal(e.target.value), (overrideMetadataTarget!.focalLength = e.target.value))} />
          <ListInput label={t('aperture')} type="text" value={aperture} onChange={(e) => (setAperture(e.target.value), (overrideMetadataTarget!.fNumber = e.target.value))} />
          <ListInput label={t('iso')} type="text" value={iso} onChange={(e) => (setIso(e.target.value), (overrideMetadataTarget!.iso = e.target.value))} />
          <ListInput label={t('shutter')} type="text" value={shutter} onChange={(e) => (setShutter(e.target.value), (overrideMetadataTarget!.exposureTime = e.target.value))} />
        </List>
      </Page>
    </Popup>
  );
};

export default OverrideMetadataPopup;
