import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    useWindowDimensions,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { QUESTIONS } from '../../../core/helpers/Contants';
import { navigate } from '../../../core/navigation/NavigationServices';
import Strings from '../../../res/strings/Strings';
import * as Progress from 'react-native-progress';
import colors from '../../../res/themes/Colors';
import styles from './Styles';
import Question from '../../components/Question';
import { setSelectedAnswers } from '../../redux/reducers/QuestionnaireReducer';

const QuestionnaireScreen: React.FC = () => {

    const dispatch = useDispatch();
    const { selectedAnswers } = useSelector((state: any) => state?.QuestionnaireReducer);

    const [index, setIndex] = useState<number>(0);
    const { width } = useWindowDimensions();
    const carouselReference = useRef<any>(null);

    const renderData = ({ item }: any) => (
        
        <View style={{ minHeight: 550 }}>
            <Question
                key={item?.name}
                options={item?.options}
                question={item?.label}
                onChange={(value: any) => handleValues(value)}
                selectedValues={[]}
            />
        </View>
    );

    const handleValues = (value: string[]) => {
        let newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers.push(value[0]);
        dispatch(setSelectedAnswers(newSelectedAnswers));
    }

    const createResult = () => {
        let totalScore = 0;
    
        selectedAnswers.forEach((choice: string, index: number) => {
            const question = QUESTIONS[index];
            if (!question) {
                return; // Skip if no question is found
            }
    
            const choiceIndex = question.options.indexOf(choice);
            if (choiceIndex !== -1) {
                const score = question.scores[choiceIndex];
                totalScore += score;
            } else {
                console.warn(`Choice "${choice}" not found for question ${index + 1}`);
            }
        });

        navigate('ResultScreen', totalScore);
    };
    
    

    const onPressNext = () => {
        if (index === QUESTIONS.length - 1) {
            createResult();
        } else {
            carouselReference?.current?.snapToNext();
        }
    };

    return (
        <View style={styles.container} testID="questionnaire-screen">
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryColor} />
            <View style={styles.header} />
            <View style={styles.progress} testID="progress-bar">
                <Progress.Bar
                    progress={index / (QUESTIONS.length - 1)}
                    width={width - 40}
                    height={4}
                    borderRadius={0}
                    color={colors.primaryColor}
                    borderColor={'transparent'}
                    unfilledColor={'lightgray'}
                />
            </View>
            <Carousel
                ref={carouselReference}
                layout={'default'}
                data={QUESTIONS}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderData}
                lockScrollWhileSnapping={true}
                scrollEnabled={false}
                useScrollView={true}
                onSnapToItem={index => setIndex(index)}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={onPressNext}>
                    <Text style={styles.nextButtonText}>
                        {index === QUESTIONS.length - 1 ? Strings.FINISH : Strings.NEXT}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default QuestionnaireScreen;
