import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";

const StepIndicator = ({ currentStep, totalSteps, stepNames }) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index);

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={step} style={styles.stepWrapper}>
          <View style={styles.stepContainer}>
            <View
              style={[
                styles.circle,
                currentStep === step && styles.activeCircle,
              ]}
            >
              <Text style={styles.circleText}>{step + 1}</Text>
            </View>
            <Text
              style={[styles.label, currentStep === step && styles.activeLabel]}
            >
              {stepNames[step]}
            </Text>
          </View>
          {index < steps.length - 1 && <View style={styles.line} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  stepWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stepContainer: {
    alignItems: "center",
    width: 120,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCircle: {
    backgroundColor: Colors.darkBlue,
  },
  circleText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
  },
  label: {
    marginTop: 5,
    color: Colors.darkBlue,
  },
  activeLabel: {
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 10,
  },
});

export default StepIndicator;
