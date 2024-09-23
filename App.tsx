import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import ApplicationNavigator from './src/core/navigation/Navigation';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Warning: Each child in a list should have a unique "key" prop.',
  'Warning: A props object containing a "key" prop is being spread into JSX:'
]);


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApplicationNavigator />
    </Provider>
  );
};

export default App;
