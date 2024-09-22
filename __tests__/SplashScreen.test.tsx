import React from 'react';
import {render, act} from '@testing-library/react-native';
import SplashScreen from '../src/screens/splash/SplashScreen';

jest.useFakeTimers();

describe('SplashScreen', () => {
  it('navigates to QuestionnaireScreen after 300ms', () => {
    const mockReplace = jest.fn();
    const navigation = {replace: mockReplace};

    render(<SplashScreen navigation={navigation} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Check if navigation.replace was called with 'QuestionnaireScreen'
    expect(mockReplace).toHaveBeenCalledWith('QuestionnaireScreen');
  });
});
