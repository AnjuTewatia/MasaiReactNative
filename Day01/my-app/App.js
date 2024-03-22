import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Home from "./Components/Home";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Components/Login";

const MyStack = createNativeStackNavigator();

const MyStackNavigation = () => {
  return (
    <MyStack.Navigator screenOptions={{ headerShown: false }}>
      <MyStack.Screen name="Home" component={Home} />
      <MyStack.Screen name="login" component={Login} />
    </MyStack.Navigator>
  );
};
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        {/* <Text>HEllo</Text> */}
        <MyStackNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});

export default App;
