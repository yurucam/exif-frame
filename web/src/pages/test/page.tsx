import { Page } from 'konsta/react';
import { Application } from 'pixi.js';
import { createRef } from 'react';

const TestPage = () => {
  const app = new Application();
  const canvasRef = createRef<HTMLDivElement>();

  app.init({ background: '#1099bb', width: 5000, height: 5000 }).then(() => {
    canvasRef.current?.appendChild(app.canvas);
  });

  return (
    <Page>
      <div ref={canvasRef}></div>
    </Page>
  );
};

export default TestPage;
