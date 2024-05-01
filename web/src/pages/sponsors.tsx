import { Block, BlockTitle, Navbar, NavbarBackLink, Page } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const SponsorsPage = () => {
  const navigator = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Page>
        <Navbar title={t('root.sponsors')} left={<NavbarBackLink onClick={() => navigator(-1)} />} />

        <BlockTitle>{t('thank-you-for-your-support')}</BlockTitle>
        <Block>
          <li>자바시티</li> {/* 2024-05-02 KakaoPay */}
          <li>doer</li> {/* 2024-05-02 KakaoPay */}
          <li>행복한삐에로</li> {/* 2024-05-02 KakaoPay */}
          <li>Conan</li> {/* 2024-05-02 KakaoPay */}
          <li>탑뚜기</li> {/* 2024-05-02 KakaoPay */}
          <li>문학톺아보기</li> {/* 2024-05-02 KakaoPay */}
          <li>므암</li> {/* 2024-05-02 KakaoPay */}
        </Block>

        <Block>
          <p>{t('root.sponsor-kakaopay-description')}</p>
        </Block>
      </Page>
    </>
  );
};

export default SponsorsPage;
