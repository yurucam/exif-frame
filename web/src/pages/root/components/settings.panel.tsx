import { Navbar, Page, Panel } from 'konsta/react';
import { useStore } from '../../../store';
import CloseLink from './close.link';
import { useTranslation } from 'react-i18next';

const SettingsPanel = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const { openedPanel, setOpenedPanel } = useStore();

  return (
    <Panel size="w-80 h-screen" floating side="right" opened={openedPanel === 'right'} onBackdropClick={() => setOpenedPanel(null)}>
      <Page>
        <Navbar title={t('root.settings')} right={<CloseLink />} />
        {children}
      </Page>
    </Panel>
  );
};

export default SettingsPanel;
