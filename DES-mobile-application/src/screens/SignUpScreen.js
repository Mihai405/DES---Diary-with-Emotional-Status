import React, { useContext, useState } from "react";
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
import { AuthContext } from "../context/AuthContext";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnPress = () => {
    navigation.navigate("SignInScreen");
  };

  async function handleRegister() {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert(
        "Validation error!",
        "Please fill out all the mandatory fields!"
      );
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log(payload)

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);
      authContext.login(data.token);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Register failed:", error);
      alert("Register failed. Please try again.");
    }
  }

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
