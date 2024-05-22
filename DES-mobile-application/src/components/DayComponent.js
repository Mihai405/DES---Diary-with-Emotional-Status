import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../utils/colors";

const DayComponent = ({ dayWeek, dayMonth, mood, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container1}>
      <View style={[styles.container2, isSelected && styles.containerSelected]}>
        <Text style={styles.text1}>{dayWeek}</Text>
        <Text style={styles.text2}>{dayMonth}</Text>
      </View>
      <View style={styles.container3}>
        <Text style={styles.text3}>{mood}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container1: {
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    backgroundColor: Colors.tertiaryColor,
    width: 40,
    height: 70,
    borderRadius: 60,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 10,
  },
  containerSelected: {
    backgroundColor: Colors.darkBlue,
  },
  text1: {
    fontSize: 16,
    color: Colors.primaryColor,
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  text3: {
    fontSize: 24,
    marginTop: 4,
  },
});

export default DayComponent;
