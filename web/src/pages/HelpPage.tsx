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
				3. exif-frame.yuru.cam is MIT licensed.
				<br />
				<br />
				4. The developer is not responsible for any damage caused by using exif-frame.yuru.cam.
				<br />
				<br />
				5. exif-frame.yuru.cam is optimized for Chrome browser. It may not work properly in other browsers.
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
					View Source Code
				</ListButton>

				<ListButton
					onClick={() => {
						window.open('https://github.com/yurucam/exif-frame/issues/new/choose', '_blank');
					}}
				>
					Bug Report
				</ListButton>

				<ListButton
					onClick={() => {
						window.open('https://github.com/yurucam/exif-frame/issues/new/choose', '_blank');
					}}
				>
					Feature Request
				</ListButton>

				<ListButton
					onClick={() => {
						window.open('https://github.com/yurucam/exif-frame/issues/new/choose', '_blank');
					}}
				>
					Question
				</ListButton>

				<ListButton
					onClick={() => {
						window.open('mailto:jeonghyeon.rhea@gmail.com?subject=[EXIF Frame]', '_blank');
					}}
				>
					Send Email to Developer
				</ListButton>
			</List>
		</>
	);
};

export default HelpPage;
