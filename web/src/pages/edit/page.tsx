import { BlockTitle, Button, List, ListItem, Navbar, Page, Toolbar, Range } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store';
import { useRef, useEffect, useState } from 'react';
import Photo from '../../core/photo';

const EditPage = () => {
  const { t } = useTranslation();
  const { photos, editPhotoIndex, setEditPhotoIndex, setPhotos } = useStore();
  const photo = editPhotoIndex !== null ? photos[editPhotoIndex] : null;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [filterPreset, setFilterPreset] = useState<string>('none');
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [hue, setHue] = useState<number>(0);
  const [desqueeze, setDesqueeze] = useState<number>(1.0);

  useEffect(() => {
    if (photo && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = photo.image.width * desqueeze;
        canvas.height = photo.image.height;

        let currentFilter = filterPreset;
        if (filterPreset === 'none') {
          currentFilter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg)`;
        }

        ctx.filter = currentFilter;
        ctx.drawImage(photo.image, 0, 0, canvas.width, canvas.height);
      }
    }
  }, [photo, filterPreset, brightness, contrast, saturation, hue, desqueeze]);

  if (!photo) return null;

  const saveEdit = async () => {
    if (canvasRef.current && editPhotoIndex !== null) {
      const dataUrl = canvasRef.current.toDataURL(photo.file.type || 'image/jpeg');
      const blob = await (await fetch(dataUrl)).blob();
      const newFile = new File([blob], photo.file.name, { type: photo.file.type });

      const newPhoto = await Photo.create(newFile);

      // Preserve metadata
      newPhoto.metadata = photo.metadata;

      const newPhotos = [...photos];
      newPhotos[editPhotoIndex] = newPhoto;
      setPhotos(newPhotos);
      setEditPhotoIndex(null);
    }
  };

  const applyPreset = (preset: string) => {
    setFilterPreset(preset);
  };

  const resetAdjustments = () => {
    setFilterPreset('none');
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setHue(0);
    setDesqueeze(1.0);
  };

  return (
    <Page>
      <Navbar large transparent title="Edit Photo" right={<Button clear onClick={() => setEditPhotoIndex(null)}>{t('close')}</Button>} />

      <div className="flex flex-col items-center justify-center p-4">
        <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '40vh', objectFit: 'contain' }} />
      </div>

      <BlockTitle>Looks & Presets</BlockTitle>
      <div className="flex overflow-x-auto space-x-2 p-4">
        <Button onClick={resetAdjustments}>Normal</Button>
        <Button onClick={() => applyPreset('sepia(100%)')}>Sepia</Button>
        <Button onClick={() => applyPreset('grayscale(100%)')}>Grayscale</Button>
        <Button onClick={() => applyPreset('contrast(120%) brightness(110%) saturate(80%)')}>Blockbuster</Button>
        <Button onClick={() => applyPreset('sepia(50%) contrast(150%) saturate(200%) hue-rotate(330deg)')}>Teal & Orange</Button>
        <Button onClick={() => applyPreset('contrast(130%) brightness(85%) saturate(70%)')}>Moody</Button>
        <Button onClick={() => applyPreset('sepia(40%) contrast(110%) brightness(120%) saturate(85%)')}>Vintage Film</Button>
        <Button onClick={() => applyPreset('invert(100%)')}>False Color (Simulated)</Button>
      </div>

      <BlockTitle>Adjustments</BlockTitle>
      <List strongIos inset>
        <ListItem
          title="Brightness"
          after={`${brightness}%`}
          innerClassName="flex flex-col items-stretch"
        >
          <Range
            value={brightness}
            step={1}
            min={0}
            max={200}
            onChange={(e) => { setFilterPreset('none'); setBrightness(parseInt(e.target.value, 10)); }}
          />
        </ListItem>
        <ListItem
          title="Contrast"
          after={`${contrast}%`}
          innerClassName="flex flex-col items-stretch"
        >
          <Range
            value={contrast}
            step={1}
            min={0}
            max={200}
            onChange={(e) => { setFilterPreset('none'); setContrast(parseInt(e.target.value, 10)); }}
          />
        </ListItem>
        <ListItem
          title="Saturation"
          after={`${saturation}%`}
          innerClassName="flex flex-col items-stretch"
        >
          <Range
            value={saturation}
            step={1}
            min={0}
            max={200}
            onChange={(e) => { setFilterPreset('none'); setSaturation(parseInt(e.target.value, 10)); }}
          />
        </ListItem>
      </List>

      <BlockTitle>Anamorphic De-squeeze</BlockTitle>
      <div className="flex overflow-x-auto space-x-2 p-4">
        <Button onClick={() => setDesqueeze(1.0)}>1.0x (Off)</Button>
        <Button onClick={() => setDesqueeze(1.33)}>1.33x</Button>
        <Button onClick={() => setDesqueeze(1.5)}>1.5x</Button>
        <Button onClick={() => setDesqueeze(2.0)}>2.0x</Button>
      </div>

      <Toolbar className="bottom-0 fixed">
        <Button onClick={saveEdit} className="w-full">Save Changes</Button>
      </Toolbar>
    </Page>
  );
};

export default EditPage;
