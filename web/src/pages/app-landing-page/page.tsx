import { Page } from 'konsta/react';

const AppLandingPage = () => {
  return (
    <Page>
      <div className="flex flex-col items-center justify-center space-y-8">
        <img src="/icon.png" alt="logo" style={{ marginTop: '5rem' }} />
        <h1 className="text-3xl font-bold">EXIF Frame</h1>
        <p className="text-lg text-center">Turn your images into beautifully framed masterpieces!</p>
        <a href="https://github.com/yurucam/exif-frame" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          GitHub
        </a>
        <img src="/example.jpg" alt="example" className="w-2/6 rounded-md" style={{ marginBottom: '5rem' }} />
      </div>
    </Page>
  );
};

export default AppLandingPage;
