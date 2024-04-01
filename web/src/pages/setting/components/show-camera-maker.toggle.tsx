import { Toggle } from 'konsta/react';
import { useEffect, useState } from 'react';

if (localStorage.getItem('showCameraMaker') == null) {
  localStorage.setItem('showCameraMaker', 'yes');
}

const ShowCameraMakerToggle = () => {
  const [toggle, setToggle] = useState(localStorage.getItem('showCameraMaker') || 'no');

  useEffect(() => {
    localStorage.setItem('showCameraMaker', toggle);
  }, [toggle]);

  return (
    <>
      <Toggle checked={toggle === 'yes'} onChange={() => setToggle(toggle === 'yes' ? 'no' : 'yes')} />
    </>
  );
};

export default ShowCameraMakerToggle;
