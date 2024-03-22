import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

const Login = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Validate form fields
      if (!phoneNumber || !password) {
        throw new Error('Both phone number and password are required');
      }

      // Make API call to log in user
      const response = await axios.post(
        'https://rich-puce-abalone-gear.cyclic.app/user/login',
        {
          phoneNumber,
          password,
        },
      );

      // Check if login was successful
      if (response.data.success) {
        Alert.alert('Success', 'User logged in successfully');
        // Clear form fields after successful login
        setPhoneNumber('');
        setPassword('');
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.containers}>
      <View style={{borderColor: 'grey', borderWidth: 1, padding: 20}}>
        <Text style={styles.heading}>SIGN IN</Text>
        <TextInput
          style={styles.inputes}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.inputes}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.buttonss} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={{marginLeft: 10}}>
          <Text style={styles.subheading}>If You are not registed please</Text>

          <TouchableOpacity
            style={styles.logintext}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.login}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    padding: 10,
    marginTop: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  inputes: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonss: {
    width: '100%',
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subheading: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  login: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Login;
