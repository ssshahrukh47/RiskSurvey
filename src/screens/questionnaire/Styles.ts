import { StyleSheet } from "react-native";
import colors from "../../res/themes/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  rightButtonStyles: {
    position: 'absolute',
    right: 5,
    bottom: 5
  },
  leftButtonStyles: {
    position: 'absolute',
    left: 5,
    bottom: 5
  }

});

export default styles