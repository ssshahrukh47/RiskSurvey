import { StyleSheet } from "react-native";
import colors from "../../../res/themes/Colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerText: {
      color: colors.headerText,
      fontSize: 16,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    questionText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center',
    },
    button: {
      backgroundColor: colors.white,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 5,
      marginBottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: colors.black,
    },
    nextButton: {
      backgroundColor: colors.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      height: 100,
      width: 100,
      borderRadius: 50,
    },
    nextButtonText: {
      fontSize: 18,
      color: colors.white,
    },
    header: {
      backgroundColor: colors.primaryColor,
      height: 100,
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexDirection: 'row',
    },
    progress: {
      marginTop: 35,
      marginHorizontal: 20,
      alignSelf: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
  });

  export default styles