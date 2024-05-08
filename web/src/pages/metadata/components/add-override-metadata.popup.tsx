import { Link, List, ListButton, ListInput, Navbar, Page, Popup } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const AddOverrideMetadataPopup = () => {
  const { t } = useTranslation();
  const { addOverridableMetadataPopup, setAddOverridableMetadataPopup, setOverridableMetadata, overridableMetadata } = useStore();

  const [name, setName] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [lens, setLens] = useState('');
  const [focalLength, setFocalLength] = useState('');
  const [focalLengthIn35mm, setFocalLengthIn35mm] = useState('');
  const [aperture, setAperture] = useState('');
  const [iso, setIso] = useState('');
  const [shutter, setShutter] = useState('');
  const [takenAt, setTakenAt] = useState('');

  useEffect(() => {
    setName('');
    setMake('');
    setModel('');
    setLens('');
    setFocalLength('');
    setFocalLengthIn35mm('');
    setAperture('');
    setIso('');
    setShutter('');
    setTakenAt('');
  }, [addOverridableMetadataPopup]);

  const onCreateMetadata = () => {
    if (!name) return;

    setOverridableMetadata([
      ...overridableMetadata,
      {
        name,
        make,
        model,
        lensModel: lens,
        focalLength,
        focalLengthIn35mm,
        fNumber: aperture,
        iso,
        exposureTime: shutter,
        takenAt,
      },
    ]);

    setAddOverridableMetadataPopup(false);
  };

  return (
    <Popup opened={addOverridableMetadataPopup} onBackdropClick={() => setAddOverridableMetadataPopup(false)}>
      <Page>
        <Navbar
          title={t('root.settings.create-metadata')}
          right={
            <Link navbar onClick={() => setAddOverridableMetadataPopup(false)}>
              {t('close')}
            </Link>
          }
        />
        <List strongIos inset>
          <ListInput label={t('name') + '*'} type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <ListInput label={t('make')} type="text" value={make} onChange={(e) => setMake(e.target.value)} />
          <ListInput label={t('model')} type="text" value={model} onChange={(e) => setModel(e.target.value)} />
          <ListInput label={t('lens')} type="text" value={lens} onChange={(e) => setLens(e.target.value)} />
          <ListInput label={t('focal') + ' (ex. 35mm)'} type="text" value={focalLength} onChange={(e) => setFocalLength(e.target.value)} />
          <ListInput label={t('focal-35mm') + ' (ex. 50mm)'} type="text" value={focalLengthIn35mm} onChange={(e) => setFocalLengthIn35mm(e.target.value)} />
          <ListInput label={t('aperture') + ' (ex. F2.8)'} type="text" value={aperture} onChange={(e) => setAperture(e.target.value)} />
          <ListInput label={t('iso') + ' (ex. ISO1200)'} type="text" value={iso} onChange={(e) => setIso(e.target.value)} />
          <ListInput label={t('shutter') + ' (ex. 1/200s)'} type="text" value={shutter} onChange={(e) => setShutter(e.target.value)} />
          <ListInput label={t('taken-at') + ' (ex. 2024-05-06T08:35:38.223+09:00)'} type="text" value={takenAt} onChange={(e) => setTakenAt(e.target.value)} />
          <ListButton onClick={onCreateMetadata}>{t('root.settings.create-metadata')}</ListButton>
        </List>
      </Page>
    </Popup>
  );
};

export default AddOverrideMetadataPopup;
