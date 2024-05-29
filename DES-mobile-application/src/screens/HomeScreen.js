import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../utils/colors";
import DayComponent from "../components/DayComponent";
import MoodComponent from "../components/MoodComponent";
import dayjs from "dayjs";

const HomeScreen = ({ moods, onDeleteMood }) => {
  const [selectedDay, setSelectedDay] = useState(dayjs().startOf("day"));
  const [filteredMoods, setFilteredMoods] = useState([]);

  useEffect(() => {
    filterMoodsByDay(selectedDay);
  }, [moods, selectedDay]);

  const filterMoodsByDay = (selectedDay) => {
    const filtered = moods.filter((mood) =>
      dayjs(mood.timestamp).isSame(selectedDay, "day")
    );
    setFilteredMoods(filtered);
  };

  const generateDays = () => {
    const days = [];
    for (let i = -3; i <= 3; i++) {
      const day = dayjs().add(i, "day");
      days.push({
        dayWeek: day.format("ddd"),
        dayMonth: day.format("D"),
        date: day,
      });
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
              isSelected={day.date.isSame(selectedDay, "day")}
              onPress={() => setSelectedDay(day.date.startOf("day"))}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.container3}>
        <Text style={styles.text3}>Today's check in</Text>
        <View style={styles.container4}>
          {filteredMoods.length > 0 ? (
            filteredMoods.map((mood, index) => (
              <MoodComponent
                key={index}
                moodEmoji={mood.moodEmoji}
                mood={mood.mood}
                moodDescription={mood.moodDescription}
                moodReason={mood.moodReason}
                time={mood.timestamp}
                onDelete={() => onDeleteMood(index)}
              />
            ))
          ) : (
            <Text style={styles.noMoodsText}>No moods added for this day.</Text>
          )}
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
    height: 110,
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
  noMoodsText: {
    fontSize: 18,
    color: Colors.primaryColor,
  },
});

export default HomeScreen;
