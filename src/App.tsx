import React from 'react';
import { Provider } from 'react-redux';
import store from './lib/redux';
import { Mansion } from './components/Mansion/Mansion';

function App() {
  return (
    <Provider store={store}>
      <Mansion />
    </Provider>
  );
}

export default App;
