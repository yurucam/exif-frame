import { ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import CameraIcon from '../../../icons/camera.icon';

const ShutterAngleModeListItem = () => {
  const { shutterAngleMode, setShutterAngleMode } = useStore();

  return (
    <ListItem
      media={<CameraIcon size={24} />}
      title="Show Shutter Angle (24fps)"
      after={<Toggle checked={shutterAngleMode} onChange={() => setShutterAngleMode(!shutterAngleMode)} />}
    />
  );
};

export default ShutterAngleModeListItem;
