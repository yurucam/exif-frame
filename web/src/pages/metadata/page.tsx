import { Navbar, NavbarBackLink, Page } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MetadataPage = () => {
  const navigator = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Page>
        <Navbar title={t('root.settings.create-metadata')} left={<NavbarBackLink text={t('back')} onClick={() => navigator(-1)} />} />
      </Page>
    </>
  );
};

export default MetadataPage;
