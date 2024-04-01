import { ListInput } from 'konsta/react';
import { useEffect, useState } from 'react';

if (localStorage.getItem('fixMajorAxisLength') === null) {
  localStorage.setItem('fixMajorAxisLength', '0');
}

const FixMajorAxisLengthInput = () => {
  const [fixMajorAxisLength, setFixMajorAxisLength] = useState(Number(localStorage.getItem('fixMajorAxisLength')));

  useEffect(() => {
    localStorage.setItem('fixMajorAxisLength', fixMajorAxisLength.toString());
  }, [fixMajorAxisLength]);

  return (
    <ListInput
      label
      title="Fix Major Axis Length (px, 0 to disable)"
      type="number"
      placeholder="e.g. 1920"
      value={fixMajorAxisLength}
      onChange={(e) => {
        setFixMajorAxisLength(e.target.value);
      }}
    />
  );
};

export default FixMajorAxisLengthInput;
