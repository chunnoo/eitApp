import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

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
  
export default Post = ({ navigation }) => {
  const { postId } = navigation.state.params;
  const [content, setContent] = useState({});

  useEffect(() => {
    PostRequest("api/getpost", {postid: postId})
      .then(res => res.json())
      .then(row => setContent(row))
      .catch(e => console.error(e))
  }, []);

  useEffect(() => {
    navigation.setParams({title: content.challengename});
  }, [content]);

  return (
    <Container>
      <Paragraph style={{color: "#666"}}>{content.username + " har fullført utfordringen:"}</Paragraph>
      <Title style={{marginBottom: 25}}>{content.challengename}</Title>
      <Paragraph>{content.content}</Paragraph>
      <Image source={{ uri: "http://" + config.address + "/" + content.imagepath }} />
    </Container>
  );
};
