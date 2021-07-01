import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };

    this.onSingUp = this.onSingUp.bind(this);
  }

  onSingUp() {
    const { email, password, firstName, lastName } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            firstName,
            lastName,
            email,
          });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="First Name"
          onChangeText={(firstName) => this.setState({ firstName })}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={(lastName) => this.setState({ lastName })}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Button onPress={() => this.onSingUp()} title="Sign Up" />
      </View>
    );
  }
}
