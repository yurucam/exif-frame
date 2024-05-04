import { Navbar, NavbarBackLink, Page } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Collage from './collage/main';
import AddPhotoErrorDialog from '../convert/components/add-photo-error.dialog';

const LabPage = () => {
  const navigator = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Page>
        <Navbar title={t('lab')} subtitle={t('lab.description')} left={<NavbarBackLink text={t('back')} onClick={() => navigator(-1)} />} />

        <Collage />

        <AddPhotoErrorDialog />
      </Page>
    </>
  );
};

export default LabPage;
