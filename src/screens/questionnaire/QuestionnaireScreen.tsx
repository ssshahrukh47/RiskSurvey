import React, { useState, useRef } from 'react';
import {
    View,
    StatusBar,
    useWindowDimensions,
    Alert,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import Strings from '../../res/strings/Strings';
import * as Progress from 'react-native-progress';
import colors from '../../res/themes/Colors';
import styles from './Styles';
import Question from '../../components/Question';
import { setSelectedAnswers } from '../../redux/reducers/QuestionnaireReducer';
import { QUESTIONS } from '../../core/helpers/Contants';
import { navigate } from '../../core/navigation/NavigationServices';
import CustomButton from '../../components/CustomButton';

const QuestionnaireScreen: React.FC = () => {

    const dispatch = useDispatch();
    const { selectedAnswers } = useSelector((state: any) => state?.QuestionnaireReducer);

    const [index, setIndex] = useState<number>(0);
    const { width } = useWindowDimensions();
    const carouselReference = useRef<any>(null);
    const [isAnswered, setIsAnswered] = useState<boolean[]>(Array(QUESTIONS.length).fill(false));

    const renderData = ({ item }: any) => (
        <View style={{ minHeight: 550 }} key={item?.id} >
            <Question
                options={item?.options}
                question={item?.label}
                onChange={(value: any) => handleValues(value)}
                selectedValues={selectedAnswers[index] ? [selectedAnswers[index]] : []}
            />
        </View>
    );

    const handleValues = (value: string[]) => {
        let newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[index] = value[0];
        newSelectedAnswers.push(value[0]);
        dispatch(setSelectedAnswers(newSelectedAnswers));

        setIsAnswered(prev => {
            const updated = [...prev];
            updated[index] = Boolean(value.length); // true if an answer is selected, false otherwise
            return updated;
        });
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
        if (!isAnswered[index]) {
            Alert.alert("Please select an answer before proceeding.");
            return;
        }
        if (index === QUESTIONS.length - 1) {
            createResult();
        } else {
            carouselReference?.current?.snapToNext();
        }
    };

    const onPressBack = () => {
        if (index > 0) {
            carouselReference?.current?.snapToPrev();
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
                {index > 0 && (
                    <CustomButton
                        title={Strings.BACK}
                        onPress={onPressBack}
                        isBackButton={true}
                        style={styles.leftButtonStyles}
                    />
                )}
                <CustomButton
                    title={index === QUESTIONS.length - 1 ? Strings.FINISH : Strings.NEXT}
                    onPress={onPressNext}
                    style={styles.rightButtonStyles}
                />
            </View>
        </View>
    );
};

export default QuestionnaireScreen;
