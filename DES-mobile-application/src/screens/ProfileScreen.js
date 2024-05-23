import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";
import { LineChart } from "react-native-chart-kit";

const ProfileScreen = ({ moods }) => {
  const moodLabels = ["😡", "😞", "😐", "😊", "🤩"];

  const countEmojis = (moods) => {
    const emojiCounts = {};
    moodLabels.forEach((emoji) => {
      emojiCounts[emoji] = 0;
      moods.forEach((mood) => {
        if (mood.moodEmoji === emoji) {
          emojiCounts[emoji]++;
        }
      });
    });
    return emojiCounts;
  };

  const emojiCounts = countEmojis(moods);

  const chartData = {
    labels: moodLabels,
    datasets: [
      {
        data: moodLabels.map((emoji) => emojiCounts[emoji] || 0),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Emotion Distribution</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={350}
          height={250}
          chartConfig={{
            backgroundColor: Colors.tertiaryColor,
            backgroundGradientFrom: Colors.primaryColor,
            backgroundGradientTo: Colors.darkBlue,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            decimalPlaces: 0,
          }}
          bezier
          style={styles.chart}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ProfileScreen;
