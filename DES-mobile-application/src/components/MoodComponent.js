import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";
import { Button } from "react-native-elements";
import dayjs from "dayjs";

const MoodComponent = ({
  moodEmoji,
  mood,
  time,
  moodDescription,
  moodReason,
  onDelete,
}) => {
  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <View style={styles.moodDetails}>
          <Text style={styles.text1}>{moodEmoji}</Text>
          <View>
            <Text style={styles.text2}>{mood}</Text>
            <Text style={styles.text5}>{dayjs(time).format("h:mm A")}</Text>
          </View>
        </View>
        <Button
          title="DELETE"
          type="clear"
          titleStyle={{ color: "red", fontSize: 14 }}
          buttonStyle={styles.deleteButton}
          onPress={onDelete}
        />
      </View>
      <View style={styles.container3}>
        <Text style={styles.text3}>
          Because of <Text style={styles.text4}>{moodReason}</Text>
        </Text>
        <Text style={styles.text3}>{moodDescription}</Text>
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
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  container3: {
    marginVertical: 5,
  },
  moodDetails: {
    flexDirection: "row",
    alignItems: "center",
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
  deleteButton: {
    marginRight: 10,
  },
  text5: {
    fontSize: 14,
    marginLeft: 5,
    color: Colors.primaryColor,
  },
});

export default MoodComponent;