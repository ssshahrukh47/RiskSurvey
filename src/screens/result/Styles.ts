import { StyleSheet } from "react-native";
import colors from "../../res/themes/Colors";

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    spacing: {
      flex: 1,
      justifyContent: 'center',
    },
    yourScore: {
      alignSelf: 'center',
      fontWeight: 'bold',
      color: colors.primaryColor,
      fontSize:20
    },
    textContainer: {
      flexShrink: 1,
      marginHorizontal: 10,
      marginBottom: 20,
      paddingBottom: 20,
      paddingHorizontal: 10,
    },
    feedbackTitle: {
      color: colors.grayColor,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 10,
      fontSize:18,
    },
    descriptionText : {
      color:colors.black,
      fontSize:16,
    },
    buttonContainer: {
      position: 'absolute', 
      bottom: 10, 
      right: 20
    },
  });

  export default styles