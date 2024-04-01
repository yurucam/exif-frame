import { ListItem, Range } from 'konsta/react';
import { useEffect, useState } from 'react';

if (localStorage.getItem('quality') === null) {
  localStorage.setItem('quality', '92');
}

const QualityRangeSlider = () => {
  const [quality, setQuality] = useState(Number(localStorage.getItem('quality')));

  useEffect(() => {
    localStorage.setItem('quality', quality.toString());
  }, [quality]);

  return (
    <>
      <ListItem
        label
        title={`Quality: ${quality}% ${quality == 100 ? '(Lossless, Not Recommended)' : ''}`}
        after={
          <>
            <Range value={quality} min={2} max={100} step={2} onChange={(e) => setQuality(e.target.value)} />
          </>
        }
      />
    </>
  );
};

export default QualityRangeSlider;
