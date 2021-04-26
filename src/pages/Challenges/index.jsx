import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { List } from 'react-native-paper';

import config from "../../config";
import PostRequest from "../../postRequest";

const Container = styled.ScrollView`
  background: #fff;
  padding-top: 5px;
`;

const Item = styled(List.Item)`
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 25px;
  margin-left: 25px;
  background: #e7f0dd;
  border-radius: 5px;
`;

export default Challenges = ({ navigation }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    PostRequest("api/getallchallenges")
      .then(res => { console.dir(res); return res.json() })
      .then(rows => setContent(rows))
      .catch(e => console.error(e))
  }, []);

  return (
    <Container>
      {
        content.map((item, idx) => {
          return (
            <Item
              key={idx}
              onPress={() => {
                navigation.navigate("Challenge", {
                  challengeId: item.id,
                  active: false
                })
              }}
              title={item.name}
              description={item.description}
            />
          );
        })
      }
    </Container>
  );
};
