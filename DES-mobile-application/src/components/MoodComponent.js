import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";

const MoodComponent = ({ moodEmoji, mood, moodDescription, moodReason }) => {
  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Text style={styles.text1}>{moodEmoji}</Text>
        <Text style={styles.text2}>{mood}</Text>
      </View>
      <View style={styles.container3}>
        <Text style={styles.text3}>
          You felt <Text style={styles.text4}>{moodDescription}</Text>
        </Text>
        <Text style={styles.text3}>
          Because of <Text style={styles.text4}>{moodReason}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    backgroundColor: Colors.tertiaryColor,
    borderRadius: 15,
    width: "95%",
    marginVertical: 5,
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  container3: {
    marginVertical: 5,
  },
  text1: {
    fontSize: 40,
  },
  text2: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginLeft: 5,
  },
  text3: {
    fontSize: 14,
    marginLeft: 20,
    color: Colors.primaryColor,
  },
  text4: {
    fontWeight: "bold",
  },
});

export default MoodComponent;
