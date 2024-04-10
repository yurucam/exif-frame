import { Navbar, Page, Panel } from 'konsta/react';
import { useStore } from '../../../store';
import CloseLink from './close.link';
import { useTranslation } from 'react-i18next';

const ThemesPanel = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const { openedPanel, setOpenedPanel } = useStore();

  return (
    <Panel
      style={{ width: '22rem' }}
      size="h-screen"
      floating
      side="left"
      opened={openedPanel === 'left'}
      onBackdropClick={() => setOpenedPanel(null)}
    >
      <Page>
        <Navbar title={t('root.themes')} left={<CloseLink />} />
        {children}
      </Page>
    </Panel>
  );
};

export default ThemesPanel;
