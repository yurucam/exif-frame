import { List, Navbar, NavbarBackLink, Page } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import OverridableMetadataList from './components/overridable-metadata.list-item';
import AddOverridableMetadataButton from './components/add-overridable-metadata.button';
import AddOverrideMetadataPopup from './components/add-override-metadata.popup';

const MetadataPage = () => {
  const navigator = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Page>
        <Navbar title={t('root.settings.create-metadata')} left={<NavbarBackLink text={t('back')} onClick={() => navigator(-1)} />} />

        <List strong inset>
          <OverridableMetadataList />
          <AddOverridableMetadataButton />
        </List>

        <AddOverrideMetadataPopup />
      </Page>
    </>
  );
};

export default MetadataPage;
