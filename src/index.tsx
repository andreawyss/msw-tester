import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

async function bootstrap() {
  if (process.env.NODE_ENV === 'development') {
    // Import mocks and await until they are enabled
    const { worker } = require('./api/mocks');
    await worker.start({
      // quiet: true,
    });
  }

  ReactDOM.render(<App />, document.getElementById('root'));
}

bootstrap();
