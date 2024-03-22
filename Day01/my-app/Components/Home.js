import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Login from "./Login";
const Home = ({ navigation }) => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  const handleSignUp = async () => {
    try {
      // Validate form fields
      if (!name || !email || !password || !phoneNumber) {
        throw new Error("All fields are required");
      }

      if (password.length <= 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      // Make API call to sign up user
      const response = await axios.post(
        "https://rich-puce-abalone-gear.cyclic.app/user/signup",
        {
          name,
          email,
          password,
          phoneNumber,
        }
      );
      // Check if sign-up was successful
      if (response.status === 201) {
        Alert.alert("Success", "User signed up successfully");
        // Clear form fields after successful sign-up
        setname("");
        setEmail("");
        setPassword("");
        setphoneNumber("");
        navigateToLogin();
      } else {
        throw new Error(response.data.message || "Already Registerd");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // Function to navigate to login page
  const navigateToLogin = () => {
    navigation.navigate("login"); // Assuming 'Login' is the name of your login screen component
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          borderColor: "grey",
          borderWidth: 1,
          padding: 10,
          marginTop: 25,
        }}
      >
        <Text style={styles.heading}>SIGN UP</Text>
        <TextInput
          style={styles.input}
          placeholder=" Name"
          value={name}
          onChangeText={setname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder=" Phone Number"
          value={phoneNumber}
          onChangeText={setphoneNumber}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.subheading}>
            If You are already registed please
          </Text>

          <TouchableOpacity
            style={styles.logintext}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 10,

    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  subheading: {
    marginTop: 10,
    fontWeight: "bold",
  },
  login: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});

export default Home;
