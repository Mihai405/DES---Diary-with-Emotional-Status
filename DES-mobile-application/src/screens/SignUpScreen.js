import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Colors } from "../utils/colors";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnPress = () => {
    navigation.navigate("SignInScreen");
  };

  const handleRegister = () => {
    if (!lastName || !email || !password) {
      Alert.alert(
        "Validation error!",
        "Please fill out all the mandatory fields!"
      );
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={require("../utils/logo.png")} style={styles.image} />
        <Text style={styles.textHeader}>Register now</Text>
        <Input
          placeholder="First name"
          inputContainerStyle={styles.inputContainer}
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          placeholder="Last name *"
          inputContainerStyle={styles.inputContainer}
          value={lastName}
          onChangeText={setLastName}
        />
        <Input
          placeholder="Email *"
          inputContainerStyle={styles.inputContainer}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password *"
          inputContainerStyle={styles.inputContainer}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title={"REGISTER"}
          onPress={handleRegister}
          buttonStyle={{
            backgroundColor: Colors.primaryColor,
            width: 110,
          }}
        />
        <View style={styles.containerText}>
          <Text style={styles.textBottomFirst}>Already have an account? </Text>
          <TouchableOpacity onPress={handleOnPress}>
            <Text style={styles.textBottomSecond}>Login here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primaryColor,
  },
  inputContainer: {
    width: "90%",
  },
  containerText: {
    flexDirection: "row",
  },
  textBottomFirst: {
    fontSize: 16,
    color: Colors.primaryColor,
  },
  textBottomSecond: {
    fontSize: 16,
    color: Colors.purple,
  },
});

export default SignUpScreen;
