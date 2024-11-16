import { Block, BlockTitle, Navbar, NavbarBackLink, Page } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const SponsorsPage = () => {
  const navigator = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Page>
        <Navbar title={t('root.sponsors')} left={<NavbarBackLink text={t('back')} onClick={() => navigator(-1)} />} />

        <BlockTitle>{t('thank-you-for-your-support')}</BlockTitle>
        <Block>
          <li>자바시티</li> {/* 2024-05-02 KakaoPay */}
          <li>doer</li> {/* 2024-05-02 KakaoPay */}
          <li>행복한삐에로</li> {/* 2024-05-02 KakaoPay */}
          <li>Conan</li> {/* 2024-05-02 KakaoPay */}
          <li>탑뚜기</li> {/* 2024-05-02 KakaoPay */}
          <li>문학톺아보기</li> {/* 2024-05-02 KakaoPay */}
          <li>므암</li> {/* 2024-05-02 KakaoPay */}
          <li>FEMMK</li> {/* 2024-05-02 KakaoPay */}
          <li>잠실귀요밍</li> {/* 2024-05-02 KakaoPay */}
          <li>장비그래퍼</li> {/* 2024-05-03 KakaoPay */}
          <li>iPhone_</li> {/* 2024-05-04 KakaoPay */}
          <li>깅깅깅</li> {/* 2024-05-09 KakaoPay */}
          <li>아풀사</li> {/* 2024-06-12 KakaoPay */}
          <li>이훈</li> {/* 2024-07-01 KakaoPay */}
          <li>끄밍</li> {/* 2024-07-07 KakaoPay */}
          <li>말샨</li> {/* 2024-08-19 KakaoPay */}
          <li>Sierra206</li> {/* 2024-10-08 KakaoPay */}
          <li>리드님</li> {/* 2024-10-28 KakaoPay */}
          <li>xszkimx</li> {/* 2024-11-14 KakaoPay */}
        </Block>

        <Block>
          <p>{t('root.sponsor-description')}</p>
        </Block>
      </Page>
    </>
  );
};

export default SponsorsPage;
