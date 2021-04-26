import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import config from "../../config";
import PostRequest from "../../postRequest";

const Container = styled.ScrollView`
  padding: 0 25px;
`;

const StyledCard = styled(Card)`
  background: #e7f0dd;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0;
`;
  
export default Feed = ({ navigation }) => {
  const [content, setContent] = useState([]);

  const fetchContent = () => {
    PostRequest("api/getpostsbyfollowing")
      .then(res => res.json())
      .then(rows => setContent(rows))
      .catch(e => console.error(e))
  };

  useEffect(() => {
    navigation.addListener(
      "didFocus",
      payload => fetchContent()
    );
    fetchContent();
  }, []);

  return (
    <Container>
      {
        content.map((item, idx) => {
          return (
            <StyledCard
              key={idx}
              onPress={() => navigation.navigate("Post", {
                postId: item.postid,
              })}>
              <StyledCard.Content>
                <Paragraph style={{color: "#666"}}>{item.username}</Paragraph>
                <Title>{item.challengename}</Title>
                <Paragraph style={{marginBottom: 10}}>{item.content}</Paragraph>
              </StyledCard.Content>
              <StyledCard.Cover source={{ uri: "http://" + config.address + "/" + item.imagepath }} />
            </StyledCard>
          );
        })
      }
    </Container>
  );
};
