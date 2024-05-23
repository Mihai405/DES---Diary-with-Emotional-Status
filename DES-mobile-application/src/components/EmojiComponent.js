import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";

const EmojiComponent = ({ emoji, onSelect, isSelected }) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[styles.emojiContainer, isSelected && styles.selected]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
    </TouchableOpacity>
  );
};

const EmojiSelector = ({ selectedEmoji, setSelectedEmoji }) => {
  const emojis = [
    { emoji: "😡", description: "Angry" },
    { emoji: "😞", description: "Sad" },
    { emoji: "😐", description: "Neutral" },
    { emoji: "😊", description: "Happy" },
    { emoji: "🤩", description: "Excited" },
  ];

  return (
    <View style={styles.container}>
      {emojis.map(({ emoji, description }, index) => (
        <EmojiComponent
          key={index}
          emoji={emoji}
          description={description}
          isSelected={selectedEmoji === emoji}
          onSelect={() => setSelectedEmoji(emoji)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  emojiContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  selected: {
    backgroundColor: Colors.darkBlue,
  },
  emoji: {
    fontSize: 30,
  },
});

export default EmojiSelector;
