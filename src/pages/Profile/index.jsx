import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Avatar, Button, Card, List, Title, Paragraph, Alert } from 'react-native-paper';

import config from "../../config";
import PostRequest from "../../postRequest";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background: #fff;
`;

const ScrollContainer = styled.FlatList`
  padding: 0 25px;
  background: #fff;
`;

const InfoText = styled.Text`
  padding-top: 10px;
  align-self: center;
  font-size: 16px;
  color: #000;
`;

const Item = styled(List.Item)`
  margin-top: 5px;
  margin-bottom: 5px;
  background: #e7f0dd;
  border-radius: 5px;
`;

const StyledCard = styled(Card)`
  background: #e7f0dd;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0;
`;
  
export default Profile = ({ navigation }) => {
  const { userId = null } = navigation.state.params;
  const [user, setUser] = useState({});
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchContent = () => {
    PostRequest("api/getuser", {userid: userId})
      .then(res => res.json())
      .then(row => setUser(row))
      .catch(e => console.error(e));

    PostRequest("api/getactivechallenges", {userid: userId})
      .then(res => res.json())
      .then(rows => setActiveChallenges(rows.map(row => ({...row, itemtype: "challenge"}))))
      .catch(e => console.error(e));

    PostRequest("api/getpostsbyuser", {userid: userId})
      .then(res => res.json())
      .then(rows => setPosts(rows.map(row => ({...row, itemtype: "post"}))))
      .catch(e => console.error(e));
  };

  useEffect(() => {
    navigation.addListener(
      "didFocus",
      payload => fetchContent()
    );
    fetchContent();
  }, []);

  useEffect(() => {
    navigation.setParams({title: user.username});
  }, [user]);

  const renderItem = (item) => {
    if (item.item.itemtype === "challenge") {
      return (
        <Item
          onPress={() => {
            navigation.navigate("ProfileChallenge", {
              challengeId: item.item.id,
              active: true
            })
          }}
          title={item.item.name}
          description={item.item.description} />
      );
    } else if (item.item.itemtype === "post") {
      return (
        <StyledCard
          onPress={() => navigation.navigate("ProfilePost", {
            postId: item.item.id,
          })}>
          <StyledCard.Content>
            <Title>{item.item.challengename}</Title>
            <Paragraph>{item.item.content}</Paragraph>
            <Paragraph>{item.item.username}</Paragraph>
          </StyledCard.Content>
          {
            item.item.imagepath
            ? <StyledCard.Cover source={{ uri: "http://" + config.address + "/" + item.item.imagepath }} />
            : null
          }
        </StyledCard>
      );
    } else if (item.item.itemtype === "text") {
      return (<InfoText>{item.item.text}</InfoText>);
    }
  };

  return (
    <Container>
      <ScrollContainer 
        data={
          [{itemtype: "text", id: 0, text: "Aktive utfordringer"}]
            .concat(activeChallenges)
            .concat([{itemtype: "text", id: 1, text: "Fullførte utfordringer"}])
            .concat(posts)
        }
        renderItem={renderItem}
        keyExtractor={item => item.itemtype + item.id} />
    </Container>
  );
};
