import { BlockTitle, BlockHeader, List } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import AddPhotoButton from './components/add-photo.button';
import AddedPhotoListItem from './components/added-photo.list-item';
import DownloadOnePhotoButton from './components/download-one-photo.button';

const Collage = () => {
  const { t } = useTranslation();

  return (
    <>
      <BlockTitle>{t('lab.collage')}</BlockTitle>

      <BlockHeader>{t('lab.collage-description')}</BlockHeader>
      <List strong inset>
        <AddedPhotoListItem />
        <AddPhotoButton />
        <DownloadOnePhotoButton />
      </List>
    </>
  );
};

export default Collage;
