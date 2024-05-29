import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";

const ReasonComponent = ({ reasons, selectedReason, setSelectedReason }) => {
  return (
    <View style={styles.reasonContainer}>
      {reasons.map((reason, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.reasonItem,
            selectedReason === reason && styles.selectedReasonItem,
          ]}
          onPress={() => setSelectedReason(reason)}
        >
          <Text
            style={[
              styles.reasonText,
              selectedReason === reason && styles.selectedReasonText,
            ]}
          >
            {reason}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  reasonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  reasonItem: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 20,
    padding: 5,
    margin: 2,
    backgroundColor: "white",
  },
  selectedReasonItem: {
    backgroundColor: Colors.darkBlue,
  },
  reasonText: {
    color: Colors.primaryColor,
  },
  selectedReasonText: {
    color: "white",
  },
});

export default ReasonComponent;
