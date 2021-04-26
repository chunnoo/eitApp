import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import { Alert } from "react-native";

import config from "../../config";
import PostRequest from "../../postRequest";

const { width, height } = Dimensions.get("window");

const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background: #fff;
  padding: 0 25px;
  flex: 1;
  justify-content: center;
`;

const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

const FormInput = styled.TextInput`
  padding: 5px;
  align-self: stretch;
  height: 50px;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 20px;
`;

const FormButton = styled.Button`
  margin-top: 20px;
`;

const StyledText = styled.Text`
  margin: 25px;
  color: #000;
`;
  
export default CreatePost = ({ navigation }) => {
  const { challengeId, challengeName } = navigation.state.params;
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    PostRequest(
      "api/createpost",
      {
        challengeid: challengeId,
        content: content,
        imagepath: null
      }
    )
      .then(res => res.json())
      .then(row => {
        Alert.alert(
          "Posted",
          "Your post was successfully posted",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Profile")
            }
          ]
        );
      })
      .catch(e => console.error(e))
  };

  return (
    <Container>
      <Form>
        <FormInput
          placeholder="content"
          onChangeText={text => setContent(text)} />
        <StyledText>
          {"Her skal det komme mulighet for å legg inn bilde"}
        </StyledText>
        <FormButton
          onPress={handleSubmit}
          title="Post" />
      </Form>
    </Container>
  );
};
