import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import ApplicationNavigator from './core/navigation/Navigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApplicationNavigator />
    </Provider>
  );
};

export default App;
