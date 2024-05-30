import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ModalComponent from "./src/components/ModalComponent";
import { Colors } from "./src/utils/colors";
import AuthContextProvider from "./src/context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 80,
    backgroundColor: Colors.tertiaryColor,
    borderRadius: 10,
  },
};

const TabNavigator = ({
  moods,
  handleDeleteMood,
  handleOpenModal,
  modalVisible,
  handleCloseModal,
  handleAddMood,
}) => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen
      name="Home"
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Entypo
              name="home"
              size={30}
              color={focused ? Colors.primaryColor : Colors.darkBlue}
            />
            <Text style={{ fontSize: 12, color: Colors.primaryColor }}>
              HOME
            </Text>
          </View>
        ),
      }}
    >
      {(props) => (
        <HomeScreen {...props} moods={moods} onDeleteMood={handleDeleteMood} />
      )}
    </Tab.Screen>
    <Tab.Screen
      name="AddStatus"
      component={View}
      options={{
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              top: -10,
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.primaryColor,
            }}
          >
            <FontAwesome5 name="plus" size={30} color={Colors.tertiaryColor} />
          </View>
        ),
        tabBarButton: (props) => (
          <TouchableOpacity {...props} onPress={handleOpenModal} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <FontAwesome
              name="user"
              size={30}
              color={focused ? Colors.primaryColor : Colors.darkBlue}
            />
            <Text style={{ fontSize: 12, color: Colors.primaryColor }}>
              PROFILE
            </Text>
          </View>
        ),
      }}
    >
      {() => <ProfileScreen moods={moods} />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default function App() {
  const [user, setUser] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [moods, setMoods] = useState([]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleAddMood = (moodData) => {
    setMoods([...moods, moodData]);
    setModalVisible(false);
  };

  const handleDeleteMood = (index) => {
    const updatedMoods = [...moods];
    updatedMoods.splice(index, 1);
    setMoods(updatedMoods);
  };

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Main" options={{ headerShown: false }}>
                {(props) => (
                  <TabNavigator
                    {...props}
                    moods={moods}
                    handleDeleteMood={handleDeleteMood}
                    handleOpenModal={handleOpenModal}
                    modalVisible={modalVisible}
                    handleCloseModal={handleCloseModal}
                    handleAddMood={handleAddMood}
                  />
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
        <ModalComponent
          visible={modalVisible}
          onClose={handleCloseModal}
          onFinish={handleAddMood}
        />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
