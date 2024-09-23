import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ResultScreen from '../src/screens/result/ResultScreen';
import Strings from '../src/res/strings/Strings';
import { resetSelectedAnswers } from '../src/redux/reducers/QuestionnaireReducer';
import { resetActions } from '../src/core/navigation/NavigationServices';

jest.mock('../src/core/navigation/NavigationServices', () => ({
  navigate: jest.fn(),
  resetActions: jest.fn(),
}));

const mockStore = configureStore([]);
const initialState = {};

describe('ResultScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders correctly with the given score', () => {
    const {getByText} = render(
      <Provider store={store}>
        <ResultScreen route={{params: 15}} />
      </Provider>,
    );

    expect(getByText('15')).toBeTruthy();
    expect(getByText('Conservative')).toBeTruthy();
  });

  it('handles the "Start Again" button correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <ResultScreen route={{params: 15}} />
      </Provider>,
    );

    fireEvent.press(getByText(Strings.START_AGAIN));

    expect(resetActions).toHaveBeenCalledWith('QuestionnaireScreen');
    expect(store.getActions()).toContainEqual(resetSelectedAnswers());
  });

  it('determines the correct risk profile based on score', () => {
    const {getByText, rerender, debug} = render(
      <Provider store={store}>
        <ResultScreen route={{params: 15}} />
      </Provider>,
    );

    expect(getByText('Conservative')).toBeTruthy();
  });
});
