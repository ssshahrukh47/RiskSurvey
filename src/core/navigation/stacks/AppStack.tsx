import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../../screens/splash/SplashScreen';
import QuestionnaireScreen from '../../../screens/questionnaire/QuestionnaireScreen';
import ResultScreen from '../../../screens/result/ResultScreen';

type AppNavigatorProps = {};

// Create the stack navigator
const AppStack = createNativeStackNavigator();

const AppNavigator: FC<AppNavigatorProps> = () => {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen component={SplashScreen} name="SplashScreen" />
            <AppStack.Screen component={QuestionnaireScreen} name="QuestionnaireScreen" />
            <AppStack.Screen component={ResultScreen} name="ResultScreen" />
        </AppStack.Navigator>
    );
};

export default AppNavigator;
