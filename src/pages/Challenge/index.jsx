import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import { Alert } from "react-native";

import config from "../../config";
import PostRequest from "../../postRequest";

const { width, height } = Dimensions.get("window");

const Container = styled.View`
  background: #fff;
  padding: 0 25px;
  flex: 1;
  justify-content: flex-start;
  padding-top: 25px;
`;

const Image = styled.Image`
  margin-top: 25px;
  align-self: center;
  width: ${width}px;
  height: ${width}px;
`;

export default Challenge = ({ navigation }) => {
  const { challengeId, active } = navigation.state.params;
  const [content, setContent] = useState({});

  useEffect(() => {
    PostRequest("api/getchallenge", {challengeid: challengeId})
      .then(res => res.json())
      .then(row => setContent(row))
      .catch(e => console.error(e))
  }, []);

  useEffect(() => {
    navigation.setParams({title: content.name});
  }, [content]);

  const startChallenge = () => {
    PostRequest("api/activatechallenge", {challengeid: challengeId})
      .then(res => res.json())
      .then(row => {
        Alert.alert(
          "Utfordring startet",
          "Du kan finne utfordringen under din profil. Der kan du avslutte den når den er fullført.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Challenges")
            }
          ]
        );
      })
      .catch(e => console.error(e))
  };

  const endChallenge = () => {
    navigation.navigate("CreatePost", {challengeId: challengeId, challengeName: content.name});
  };

  return (
    <Container>
          <Title>{content.name}</Title>
          <Paragraph>{content.description}</Paragraph>
          <Paragraph>{"Gir " + content.points + " poeng"}</Paragraph>
          <Paragraph>{content.info}</Paragraph>
        {
          content.imagepath
          ? <Image source={{ uri: "http://" + config.address + "/" + content.imagepath }} />
          : <Paragraph></Paragraph>
        }
      {
        active
        ? <Button
            onPress={endChallenge}>
            {"Avslutt utfordring"}
          </Button>
        : <Button
            onPress={startChallenge}>
            {"Start utfordring"}
          </Button>
      }
    </Container>
  );
};
