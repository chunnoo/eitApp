import React, { useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import PostRequest from "../../postRequest";

import config from "../../config";

const { width, height } = Dimensions.get("window");

const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background: #e7f0dd;
  padding: 0 25px;
  flex: 1;
  justify-content: center;
`;

const Form = styled.View`
  align-self: stretch;
  margin-top: 25px;
`;

const FormInput = styled.TextInput`
  background: #fff;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
`;

const FormButton = styled.Button`
  margin-top: 20px;
`;

const StyledText = styled.Text`
  color: #000;
`;

const Logo = styled.Image`
  align-self: center;
  width: ${0.5*width}px;
  height: ${0.5*width}px;
`;

export default SignIn = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = () => {
    PostRequest('api/login', {
      username: username,
      password: password
    })
      .then(res => res.json())
      .then(res => {
        if (res.valid) {
          console.log("signed in");
          navigation.navigate("App");
        } else if (username !== '' && password !== '') {
          console.log("hmm");
        }
      })
      .catch(e => console.error(e));
  };

  //auto login
  PostRequest('api/login', {
    username: "mathiaschunnoo",
    password: "password"
  })
    .then(res => res.json())
    .then(res => {
      if (res.valid) {
        console.log("signed in");
        navigation.navigate("App");
      } else if (username !== '' && password !== '') {
        console.log("hmm");
      }
    })
    .catch(e => console.error(e));
  
  return (
    <Container>
      <Logo source={{ uri: "http://" + config.address + "/img/logo.png" }} />
      <Form>
        <FormInput
          placeholder="username"
          onSubmitEditing={handleSubmit}
          onChangeText={text => setUsername(text)} />
        <FormInput
          secureTextEntry={true}
          placeholder="password" 
          onSubmitEditing={handleSubmit}
          onChangeText={text => setPassword(text)} />
        <FormButton
          onPress={handleSubmit}
          title="Logg inn" />
      </Form>
    </Container>
  );
};
