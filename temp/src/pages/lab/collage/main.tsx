import { BlockTitle, BlockHeader, List, ListInput, Block } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import AddPhotoButton from './components/add-photo.button';
import AddedPhotoListItem from './components/added-photo.list-item';
import DownloadPhotoButton from './components/download-photo.button';
import Loading from './components/loading';
import { useStore } from './store';
import * as Root from '../../../store';

const Collage = () => {
  const { t } = useTranslation();
  const { darkMode } = Root.useStore();
  const {
    backgroundColor,
    ratio,
    numberOfRow,
    numberOfColumn,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginEach,
    setBackgroundColor,
    setRatio,
    setNumberOfRow,
    setNumberOfColumn,
    setPaddingTop,
    setPaddingBottom,
    setPaddingLeft,
    setPaddingRight,
    setMarginEach,
  } = useStore();

  return (
    <>
      <BlockTitle>{t('lab.collage')}</BlockTitle>

      <BlockHeader>{t('lab.collage-description')}</BlockHeader>
      <List strong inset>
        <AddedPhotoListItem />
        <AddPhotoButton />
        <DownloadPhotoButton />
      </List>

      <Block>
        <p>{t('lab.collage-options')}</p>
      </Block>

      <List strong inset>
        <ListInput
          title="BACKGROUND_COLOR"
          media={<div className="w-5 h-5" style={{ backgroundColor: backgroundColor as string, outline: `1px solid ${darkMode ? '#fff' : '#000'}` }} />}
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
        <ListInput title="RATIO" info="width:height" value={ratio} onChange={(e) => setRatio(e.target.value)} />
        <ListInput title="NUMBER_OF_ROW" info="count" value={numberOfRow} onChange={(e) => setNumberOfRow(Number(e.target.value))} />
        <ListInput title="NUMBER_OF_COLUMN" info="count" value={numberOfColumn} onChange={(e) => setNumberOfColumn(Number(e.target.value))} />
        <ListInput title="PADDING_TOP" info="px" value={paddingTop} onChange={(e) => setPaddingTop(Number(e.target.value))} />
        <ListInput title="PADDING_BOTTOM" info="px" value={paddingBottom} onChange={(e) => setPaddingBottom(Number(e.target.value))} />
        <ListInput title="PADDING_LEFT" info="px" value={paddingLeft} onChange={(e) => setPaddingLeft(Number(e.target.value))} />
        <ListInput title="PADDING_RIGHT" info="px" value={paddingRight} onChange={(e) => setPaddingRight(Number(e.target.value))} />
        <ListInput title="MARGIN_EACH" info="px" value={marginEach} onChange={(e) => setMarginEach(Number(e.target.value))} />
      </List>

      <Loading />
    </>
  );
};

export default Collage;
