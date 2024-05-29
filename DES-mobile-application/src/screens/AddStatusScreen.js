import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";

const AddStatusScreen = () => {
  return <SafeAreaView style={styles.container1}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
  },
});

export default AddStatusScreen;
