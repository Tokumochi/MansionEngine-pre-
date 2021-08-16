import { Provider } from 'react-redux';
import store from './lib/redux/reducers';
import { Screen } from './components/Screen/Screen';

function App() {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
}

export default App;
