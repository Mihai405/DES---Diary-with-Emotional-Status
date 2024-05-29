import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const SignInScreen = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(email, password) {
    if (!email || !password) {
      Alert.alert(
        "Validation error!",
        "Please fill out all the mandatory fields!"
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      authContext.login(data.token);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  }

  const handleOnPress = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={require("../utils/logo.png")} style={styles.image} />
        <Text style={styles.textHeader}>Sign in to your account</Text>
        <Input
          placeholder="Email"
          inputContainerStyle={styles.inputContainer}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          inputContainerStyle={styles.inputContainer}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title={"LOGIN"}
          buttonStyle={{
            backgroundColor: Colors.primaryColor,
            width: 90,
          }}
          onPress={handleLogin}
        />
        <View style={styles.containerText}>
          <Text style={styles.textBottomFirst}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleOnPress}>
            <Text style={styles.textBottomSecond}>Register here</Text>
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
    height: 300,
    width: 300,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primaryColor,
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
  inputContainer: {
    width: "90%",
  },
});

export default SignInScreen;
