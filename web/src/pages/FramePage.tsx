import { useState } from 'react';
import { BlockTitle, Button, Icon, List, ListItem, Radio } from 'konsta/react';
import { IoTrashOutline, IoDownloadOutline } from 'react-icons/io5';
import Photo from '../domain/photo';
import PhotoUploadButton from '../components/PhotoUploadButton';
import download from '../utils/download';
import noFrame from '../frames/no-frame';
import simpleFrame from '../frames/simple';
import squareFrame from '../frames/square';
import cinemaScope from '../frames/cinemaScope';
import paddieFrame from '../frames/paddie';
import compactFrame from '../frames/compact';

const FramePage = () => {
	const frames = [
		{ name: 'No Frame', func: noFrame },
		{ name: 'Simple', func: simpleFrame },
		{ name: 'Square', func: squareFrame },
		{ name: 'Cinema Scope', func: cinemaScope },
		{ name: 'Paddie', func: paddieFrame },
		{ name: 'Compact', func: compactFrame },
	];

	const [photos, setPhotos] = useState<Photo[]>([]);
	const [frame, setFrame] = useState(frames[0].name);

	return (
		<>
			<BlockTitle>Frames</BlockTitle>
			<List strong inset>
				{frames.map((t, index) => (
					<ListItem key={index} label title={t.name} media={<Radio checked={frame === t.name} onChange={() => setFrame(t.name)} />} />
				))}
			</List>

			<BlockTitle>Images</BlockTitle>
			<List strongIos inset>
				{photos.map((photo, index) => (
					<ListItem
						chevronIos={false}
						key={index}
						title={photo.name}
						subtitle={`${photo.focalLength} ${photo.aperture} ${photo.shutterSpeed} ${photo.iso}`}
						text={`${photo.cameraMaker} ${photo.cameraModel} ${photo.lensModel}`}
						after={
							<>
								<Button
									onClick={() => {
										const func = frames.find((t) => t.name === frame)?.func;
										func!(photo);
										download(photo);
									}}
								>
									<Icon ios={<IoDownloadOutline className="w-5 h-5" />} />
								</Button>

								<Button
									className="k-color-brand-red"
									onClick={() => {
										setPhotos(photos.filter((p) => p !== photo));
										photo.destroy();
									}}
								>
									<Icon ios={<IoTrashOutline className="w-5 h-5" />} />
								</Button>
							</>
						}
						media={<img className="object-contain w-20 h-20" src={photo.previewImage.src} alt={photo.name} />}
					/>
				))}
			</List>

			<PhotoUploadButton
				onPhotoAdded={(addedPhotos) => {
					setPhotos([...photos, ...addedPhotos]);
				}}
			/>

			<Button
				clear
				large
				onClick={async () => {
					const func = frames.find((t) => t.name === frame)?.func;
					photos.forEach((photo) => func!(photo));
					download(photos);
				}}
			>
				<Icon ios={<IoDownloadOutline className="w-8 h-5" />} /> DOWNLOAD ALL
			</Button>
		</>
	);
};
export default FramePage;
