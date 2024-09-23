import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import QuestionnaireScreen from '../src/screens/questionnaire/QuestionnaireScreen';
import Strings from '../src/res/strings/Strings';
import { QUESTIONS } from '../src/core/helpers/Contants';

// Mock the NavigationHelpers

jest.mock('../src/core/navigation/NavigationServices', () => ({
  navigate: jest.fn(),
  resetActions: jest.fn(),
}));

jest.mock('react-native-progress', () => {
  return {
    Bar: jest.fn().mockImplementation(() => null),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      replace: jest.fn(),
    }),
  };
});

const mockStore = configureStore([]);
const initialState = {
  QuestionnaireReducer: {
    selectedAnswers: [],
  },
};

describe('QuestionnaireScreen Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <QuestionnaireScreen />
      </Provider>,
    );
    expect(getByTestId('questionnaire-screen')).toBeTruthy();
  });

  it('navigates to ResultScreen after finishing the questions', () => {
    const {getByText, debug} = render(
      <Provider store={store}>
        <QuestionnaireScreen />
      </Provider>,
    );

    debug(); // Output the rendered component tree to verify the presence of 'NEXT' button

    act(() => {
      fireEvent.press(getByText(Strings.NEXT));
      for (let i = 1; i < QUESTIONS.length; i++) {
        fireEvent.press(getByText(Strings.NEXT));
      }
    });

  });

  it('updates the progress bar correctly', () => {
    const {getByText, queryByTestId, debug} = render(
      <Provider store={store}>
        <QuestionnaireScreen />
      </Provider>,
    );

    debug(); // Output the rendered component tree to verify the presence of progress bar

    act(() => {
      fireEvent.press(getByText(Strings.NEXT));
    });

    expect(queryByTestId('progress-bar')).toBeTruthy();
  });

  it('toggles the checkbox state correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <QuestionnaireScreen />
      </Provider>,
    );
  });
});
