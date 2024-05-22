import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../utils/colors";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>idk</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
});

export default ProfileScreen;
