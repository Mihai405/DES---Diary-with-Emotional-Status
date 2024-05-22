import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Colors } from "../utils/colors";
import DayComponent from "../components/DayComponent";
import dayjs from "dayjs";
import MoodComponent from "../components/MoodComponent";

const HomeScreen = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const generateDays = () => {
    const days = [];
    for (let i = 0; i < 14; i++) {
      const day = dayjs().add(i, "day");
      days.push({ dayWeek: day.format("ddd"), dayMonth: day.format("D") });
    }
    return days;
  };

  const days = generateDays();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text1}>
        Hello, <Text style={styles.text2}>Maria! 👋🏻</Text>
      </Text>
      <View style={styles.container2}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {days.map((day, index) => (
            <DayComponent
              key={index}
              dayWeek={day.dayWeek}
              dayMonth={day.dayMonth}
              isSelected={selectedDay === index}
              onPress={() => setSelectedDay(index)}
              mood="😍"
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.container3}>
        <Text style={styles.text3}>Today's check in</Text>
        <View style={styles.container4}>
          <MoodComponent
            moodEmoji="😇"
            mood="Good"
            moodDescription="Good"
            moodReason="Work"
          />
          <MoodComponent
            moodEmoji="😡"
            mood="Terrible"
            moodDescription="Terrible"
            moodReason="Friends"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
  },
  text1: {
    fontSize: 30,
    color: Colors.primaryColor,
    margin: 16,
  },
  text2: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  container2: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  text3: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  container4: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default HomeScreen;
