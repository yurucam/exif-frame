import { ListInput } from 'konsta/react';
import { useEffect, useState } from 'react';

const OverrideCameraMakerInput = () => {
  const [cameraMaker, setCameraMaker] = useState(localStorage.getItem('cameraMaker') || '');

  useEffect(() => {
    localStorage.setItem('cameraMaker', cameraMaker);
  }, [cameraMaker]);

  return (
    <ListInput
      type="text"
      placeholder={'Your Camera Maker'}
      value={cameraMaker}
      onChange={(e) => {
        setCameraMaker(e.target.value);
      }}
    />
  );
};

export default OverrideCameraMakerInput;
