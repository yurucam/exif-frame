import { BlockTitle, Card, List, ListButton } from 'konsta/react';

const HelpPage = () => {
	return (
		<>
			<BlockTitle withBlock={false}>Information</BlockTitle>
			<Card>
				1. exif-frame.yuru.cam does not upload photos of customers to the server.
				<br />
				<br />
				2. exif-frame.yuru.cam is a web application that runs on the client side.
				<br />
				<br />
				3. Javascript does not work in environments where it cannot run.
				<br />
				<br />
				4. exif-frame.yuru.cam is MIT licensed.
				<br />
				<br />
				5. The developer is not responsible for any damage caused by using exif-frame.yuru.cam.
				<br />
				<br />
				Waiting for your feedback. Thank you.
			</Card>

			<List strong outlineIos inset>
				<ListButton
					onClick={() => {
						window.open('https://github.com/yurucam/exif-frame', '_blank');
					}}
				>
					Go to GitHub Repository
				</ListButton>

				<ListButton
					onClick={() => {
						window.open('mailto:jeonghyeon.rhea@gmail.com?subject=[EXIF Frame]', '_blank');
					}}
				>
					Contact to Developer
				</ListButton>
			</List>
		</>
	);
};

export default HelpPage;
