import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const navigation = useNavigation();

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
        />
        <Input
          placeholder="Password"
          inputContainerStyle={styles.inputContainer}
        />
        <Button
          title={"LOGIN"}
          buttonStyle={{
            backgroundColor: Colors.primaryColor,
            width: 90,
          }}
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
