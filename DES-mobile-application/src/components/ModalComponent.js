import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { Colors } from "../utils/colors";
import StepIndicatorComponent from "./StepIndicatorComponent";
import EmojiSelector from "./EmojiComponent";
import ReasonComponent from "./ReasonComponent";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";

const ModalComponent = ({ visible, onClose, onFinish }) => {
  const [step, setStep] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [recording, setRecording] = useState(null);
  const [recordingData, setRecordingData] = useState(null);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      }
    } catch (error) {
      console.log("Failed to start recording!", error);
    }
  }

  async function stopRecording() {
    setRecording(null);

    await recording.stopAndUnloadAsync();
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    setRecordingData({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLine() {
    if (recordingData) {
      return (
        <TouchableOpacity onPress={() => recordingData.sound.replayAsync()}>
          <Entypo
            name="controller-play"
            size={30}
            color={Colors.darkBlue}
            style={{ left: -5 }}
          />
        </TouchableOpacity>
      );
    }
    return null;
  }

  useEffect(() => {
    if (visible) {
      setStep(0);
      setSelectedEmoji(null);
      setSelectedReason(null);
      setExplanation("");
    } else {
      if (recordingData) {
        recordingData.sound.unloadAsync();
      }
      setRecordingData(null);
    }
  }, [visible]);

  const totalSteps = 3;
  const stepNames = ["Mood", "Reason", "Explanation"];
  const reasons = [
    "Work",
    "Family",
    "Friends",
    "Love",
    "Girlfriend",
    "Boyfriend",
    "Wife",
    "Husband",
    "Children",
    "Parents",
    "Health",
    "Money",
    "School",
  ];

  const Step1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.textHeader}>What's your mood now?</Text>
      <Text style={styles.textBody}>
        Select a mood that reflects the most of how you are feeling at the
        moment.
      </Text>
      <EmojiSelector
        selectedEmoji={selectedEmoji}
        setSelectedEmoji={setSelectedEmoji}
      />
    </View>
  );

  const Step2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.textHeader}>
        What's the reason making you feel this way?
      </Text>
      <Text style={styles.textBody}>
        Select the strongest reason that caused your emotion.
      </Text>
      <View style={styles.reasonsContainer}>
        <ReasonComponent
          reasons={reasons}
          selectedReason={selectedReason}
          setSelectedReason={setSelectedReason}
        />
      </View>
    </View>
  );

  const Step3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.textHeader}>Describe what happened</Text>
      <Text style={styles.textBody}>
        Add your notes or any thoughts that reflect your mood.
      </Text>
      <View style={styles.explanationContainer}>
        <Input
          placeholder="Explanation"
          value={explanation}
          onChangeText={setExplanation}
        />
        <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
          <FontAwesome
            name="microphone"
            size={24}
            color={recording ? Colors.primaryColor : Colors.darkBlue}
          />
          {getRecordingLine()}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (step === 0 && selectedEmoji === null) {
      alert("Please select your mood to continue!");
    } else if (step === 1 && selectedReason === null) {
      alert("Please select a reason to proceed!");
    } else if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFinish = () => {
    if (explanation.trim().length > 0 || recordingData !== null) {
      const newMood = {
        moodEmoji: selectedEmoji.emoji,
        mood: selectedEmoji.description,
        moodDescription: explanation,
        moodReason: selectedReason,
        timestamp: new Date().toISOString(),
      };
      onFinish(newMood);
    } else {
      alert("Please complete all fields before finishing!");
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <StepIndicatorComponent
                currentStep={step}
                totalSteps={totalSteps}
                stepNames={stepNames}
              />
              {renderStepContent()}
              <View style={styles.buttonContainer}>
                <Button
                  title="BACK"
                  onPress={handleBack}
                  type="clear"
                  disabled={step === 0}
                  disabledStyle={styles.disabledButton}
                  disabledTitleStyle={styles.disabledButtonText}
                  titleStyle={styles.buttonTitleStyle}
                />
                {step < totalSteps - 1 && (
                  <Button
                    title="NEXT"
                    onPress={handleNext}
                    type="clear"
                    titleStyle={styles.buttonTitleStyle}
                  />
                )}
                {step === totalSteps - 1 && (
                  <Button
                    title="FINISH"
                    onPress={handleFinish}
                    type="clear"
                    titleStyle={styles.buttonTitleStyle}
                    disabled={
                      !explanation.trim().length > 0 && recordingData !== null
                    }
                  />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  stepContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryColor,
    textAlign: "center",
  },
  textBody: {
    color: Colors.primaryColor,
    textAlign: "center",
    marginTop: 10,
  },
  buttonTitleStyle: {
    color: Colors.darkBlue,
  },
  disabledButton: {
    backgroundColor: "transparent",
  },
  disabledButtonText: {
    color: "grey",
  },
  reasonsContainer: {
    marginVertical: 10,
  },
  explanationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ModalComponent;
