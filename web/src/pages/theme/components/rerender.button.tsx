import { Button, Icon } from 'konsta/react';
import { GrPowerReset } from 'react-icons/gr';
import { useStore } from '../../../store';

const RerenderButton = () => {
  const { setRerenderOptions } = useStore();

  return (
    <div className="w-10">
      <Button
        className="k-color-brand-green"
        onClick={() => {
          setRerenderOptions();
        }}
      >
        <Icon ios={<GrPowerReset className="w-5 h-5" />} />
      </Button>
    </div>
  );
};

export default RerenderButton;
