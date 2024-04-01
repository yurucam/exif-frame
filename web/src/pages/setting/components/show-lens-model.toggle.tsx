import { Toggle } from 'konsta/react';
import { useEffect, useState } from 'react';

if (localStorage.getItem('showLensModel') == null) {
  localStorage.setItem('showLensModel', 'yes');
}

const ShowLensModelToggle = () => {
  const [toggle, setToggle] = useState(localStorage.getItem('showLensModel') || 'no');

  useEffect(() => {
    localStorage.setItem('showLensModel', toggle);
  }, [toggle]);

  return (
    <>
      <Toggle checked={toggle === 'yes'} onChange={() => setToggle(toggle === 'yes' ? 'no' : 'yes')} />
    </>
  );
};

export default ShowLensModelToggle;
